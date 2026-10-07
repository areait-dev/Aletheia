<?php
defined( 'ABSPATH' ) || exit;

/**
 * ACF FREE: i field group vivono in acf-json/ (generati da wordpress/build-acf-json.mjs e poi sincronizzabili
 * da ACF -> Field Groups -> "Sync available"). Le modifiche fatte in WP vengono riscritte nella stessa cartella.
 */
add_filter( 'acf/settings/load_json', fn( $paths ) => array_merge( $paths, [ ALETHEIA_DIR . 'acf-json' ] ) );
// Salva nel plugin SOLO i gruppi Alètheia (ACF >= 6.3); gli altri gruppi del sito restano dove li mette ACF.
add_filter( 'acf/json/save_paths', function ( $paths, $post ) {
	return ( isset( $post['key'] ) && strpos( $post['key'], 'group_al_' ) === 0 ) ? [ ALETHEIA_DIR . 'acf-json' ] : $paths;
}, 10, 2 );

/**
 * Editor classico per i contenuti gestiti dal frontend: in Gutenberg i gruppi ACF finirebbero nel cassetto chiuso
 * "Meta Boxes" in fondo alla pagina, e il corpo a blocchi non serve (il frontend non lo disegna). Con l'editor
 * classico i campi stanno subito sotto il titolo (position: acf_after_title) e l'HTML del corpo è pulito.
 */
add_filter( 'use_block_editor_for_post_type', fn( $use, $post_type ) => in_array( $post_type, aletheia_all_types(), true ) ? false : $use, 10, 2 );

/** Crea la pagina "opzioni-globali" se manca (contatti, menu, footer, chatbot, SEO). */
function aletheia_ensure_options_page(): void {
	if ( get_page_by_path( 'opzioni-globali' ) ) {
		return;
	}
	wp_insert_post( [
		'post_type'   => 'page',
		'post_status' => 'publish',
		'post_title'  => 'Opzioni Globali',
		'post_name'   => 'opzioni-globali',
	] );
}
register_activation_hook( ALETHEIA_DIR . 'aletheia-headless.php', 'aletheia_ensure_options_page' );
add_action( 'admin_init', 'aletheia_ensure_options_page' );

/**
 * Le regole "pagina == ID" dipendono dall'ID, diverso a ogni installazione: le impostiamo a runtime.
 *  - group_al_opt          -> solo la pagina opzioni-globali
 *  - group_al_pagina_home  -> solo la pagina con slug "home"
 *  - gruppi di pagina/SEO  -> tutte le pagine TRANNE opzioni-globali (e, per pagina_*, tranne nulla altro)
 */
add_filter( 'acf/load_field_group', function ( $g ) {
	if ( ! is_array( $g ) || empty( $g['key'] ) ) {
		return $g;
	}
	// Nella schermata di modifica del gruppo si lascia la location statica: altrimenti il salvataggio
	// scriverebbe nel JSON gli ID di pagina di questa installazione.
	if ( is_admin() && function_exists( 'acf_is_screen' ) && acf_is_screen( 'acf-field-group' ) ) {
		return $g;
	}
	$opt  = aletheia_options_page_id();
	$home = aletheia_page_id_by_slug( 'home' );

	if ( $g['key'] === 'group_al_opt' ) {
		$g['location'] = $opt ? [ [ [ 'param' => 'page', 'operator' => '==', 'value' => (string) $opt ] ] ] : [];
	} elseif ( $g['key'] === 'group_al_pagina_home' ) {
		$g['location'] = $home ? [ [ [ 'param' => 'page', 'operator' => '==', 'value' => (string) $home ] ] ] : [];
	} elseif ( in_array( $g['key'], [ 'group_al_pagina_hero', 'group_al_pagina_sezioni', 'group_al_seo' ], true ) && $opt ) {
		foreach ( $g['location'] as &$rules ) {
			foreach ( $rules as $r ) {
				if ( $r['param'] === 'post_type' && $r['value'] === 'page' ) {
					$rules[] = [ 'param' => 'page', 'operator' => '!=', 'value' => (string) $opt ];
					break;
				}
			}
		}
		unset( $rules );
	}
	return $g;
} );
