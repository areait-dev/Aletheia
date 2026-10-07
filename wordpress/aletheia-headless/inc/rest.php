<?php
defined( 'ABSPATH' ) || exit;

/**
 * Elenchi e singoli record per tipo: si usano gli endpoint STANDARD /wp/v2/<tipo> (con "acf" nel body, grazie a
 * show_in_rest sui field group). Qui ci sono solo i pezzi che /wp/v2 non sa fare:
 *  - /page      : risolve un percorso gerarchico (formazione/obbligatoria) + bozze con token
 *  - /routes    : elenco percorsi per getStaticPaths e sitemap
 *  - /options   : contenuti globali (pagina opzioni-globali)
 *  - /preview-fields : anteprima live, formatta i valori NON salvati come farebbe il salvataggio
 */
function aletheia_post_payload( WP_Post $post ): array {
	return [
		'id'       => $post->ID,
		'type'     => $post->post_type,
		'slug'     => $post->post_name,
		'path'     => aletheia_frontend_path( $post ),
		'title'    => get_the_title( $post ),
		'status'   => $post->post_status,
		'date'     => get_post_time( 'c', true, $post ),
		'modified' => get_post_modified_time( 'c', true, $post ),
		'excerpt'  => get_the_excerpt( $post ),
		'content'  => apply_filters( 'the_content', $post->post_content ),
		'image'    => get_the_post_thumbnail_url( $post, 'large' ) ?: null,
		'terms'    => aletheia_post_terms( $post ),
		'acf'      => function_exists( 'get_fields' ) ? ( get_fields( $post->ID ) ?: new stdClass() ) : new stdClass(),
	];
}

function aletheia_post_terms( WP_Post $post ): array {
	$out = [];
	foreach ( get_object_taxonomies( $post->post_type ) as $tax ) {
		$terms = wp_get_post_terms( $post->ID, $tax );
		if ( ! is_wp_error( $terms ) && $terms ) {
			$out[ $tax ] = array_map( fn( $t ) => [ 'id' => $t->term_id, 'slug' => $t->slug, 'name' => $t->name ], $terms );
		}
	}
	return $out;
}

add_action( 'rest_api_init', function () {
	$ns = 'aletheia/v1';

	// /page?path=formazione/obbligatoria            (type=page di default)
	// /page?type=corso&path=rls
	// /page?preview_id=12&exp=…&token=…            bozza leggibile solo con token valido
	register_rest_route( $ns, '/page', [
		'methods'             => 'GET',
		'permission_callback' => '__return_true',
		'callback'            => function ( WP_REST_Request $r ) {
			$post = null;
			if ( $r['preview_id'] ) {
				// Token mancante, scaduto o di un altro post: errore esplicito, non un ripiego sul contenuto pubblico.
				if ( ! aletheia_verify_preview( (int) $r['preview_id'], (int) $r['exp'], (string) $r['token'] ) ) {
					return new WP_Error( 'forbidden', 'Token di anteprima non valido o scaduto', [ 'status' => 403 ] );
				}
				$post = get_post( (int) $r['preview_id'] );
			} else {
				$type = $r['type'] ? sanitize_key( $r['type'] ) : 'page';
				if ( ! in_array( $type, aletheia_routable_types(), true ) ) {
					return new WP_Error( 'bad_type', 'Tipo non valido', [ 'status' => 400 ] );
				}
				$path = trim( (string) $r['path'], '/' );
				$post = get_page_by_path( $path === '' ? 'home' : $path, OBJECT, $type );
				if ( $post && ( $post->post_status !== 'publish' || (int) $post->ID === aletheia_options_page_id() ) ) {
					$post = null;
				}
			}
			return $post ? aletheia_post_payload( $post ) : new WP_Error( 'not_found', 'Contenuto non trovato', [ 'status' => 404 ] );
		},
	] );

	register_rest_route( $ns, '/routes', [
		'methods'             => 'GET',
		'permission_callback' => '__return_true',
		'callback'            => function () {
			$posts = get_posts( [ 'post_type' => aletheia_routable_types(), 'post_status' => 'publish', 'numberposts' => -1, 'exclude' => [ aletheia_options_page_id() ] ] );
			return array_map( fn( $p ) => [ 'id' => $p->ID, 'type' => $p->post_type, 'slug' => $p->post_name, 'path' => aletheia_frontend_path( $p ), 'modified' => get_post_modified_time( 'c', true, $p ) ], $posts );
		},
	] );

	register_rest_route( $ns, '/options', [
		'methods'             => 'GET',
		'permission_callback' => '__return_true',
		'callback'            => function () {
			$id = aletheia_options_page_id();
			return $id && function_exists( 'get_fields' ) ? ( get_fields( $id ) ?: new stdClass() ) : new stdClass();
		},
	] );

	// Anteprima live: riceve { fields: { nome: { key, value } }, title, content } dal form dell'editor
	// e restituisce i valori formattati come /wp/v2 (immagini -> oggetto con url, link -> {title,url,target}...).
	register_rest_route( $ns, '/preview-fields', [
		'methods'             => 'POST',
		'permission_callback' => fn() => current_user_can( 'edit_posts' ),
		'callback'            => function ( WP_REST_Request $r ) {
			$acf = [];
			foreach ( (array) $r->get_param( 'fields' ) as $name => $f ) {
				if ( ! is_array( $f ) || empty( $f['key'] ) || ! function_exists( 'acf_get_field' ) ) {
					continue;
				}
				$field = acf_get_field( sanitize_text_field( $f['key'] ) );
				if ( $field ) {
					$acf[ sanitize_key( $name ) ] = acf_format_value( $f['value'] ?? null, 0, $field );
				}
			}
			return [
				'acf'     => $acf,
				'title'   => sanitize_text_field( (string) $r->get_param( 'title' ) ),
				'content' => apply_filters( 'the_content', wp_kses_post( (string) $r->get_param( 'content' ) ) ),
			];
		},
	] );
} );
