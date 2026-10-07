<?php
defined( 'ABSPATH' ) || exit;

/**
 * Pubblicazione istantanea: a ogni modifica WP chiama POST {frontend}/api/revalidate (ISR on-demand).
 * Header x-aletheia-secret = secret condiviso. Body: { paths: string[] } oppure { scope: "all" }.
 */
function aletheia_revalidate( array $body ): void {
	// Interruttore per le importazioni di massa (wp-config.php: define( 'ALETHEIA_DISABLE_REVALIDATE', true )):
	// evita una rigenerazione totale per ogni scheda/FAQ importata. A fine import: rimuovere la costante e
	// chiamare una volta POST /api/revalidate con { "scope": "all" }.
	if ( ! aletheia_secret() || ( defined( 'ALETHEIA_DISABLE_REVALIDATE' ) && ALETHEIA_DISABLE_REVALIDATE ) ) {
		return;
	}
	wp_remote_post( aletheia_frontend_url() . '/api/revalidate', [
		'timeout'  => 5,
		'blocking' => false, // non rallenta il salvataggio
		'headers'  => [ 'Content-Type' => 'application/json', 'x-aletheia-secret' => aletheia_secret() ],
		'body'     => wp_json_encode( $body ),
	] );
}

/** Pagine di elenco/aggregazione che mostrano i contenuti di un certo tipo. */
function aletheia_dependent_paths( string $post_type ): array {
	$map = [
		'corso'          => [ '/', '/all-courses', '/calendario-corsi', '/formazione/obbligatoria', '/formazione/professionale-specialistica', '/formazione/regionale', '/formazione/regionale-fse', '/formazione/ecm' ],
		'edizione_corso' => [ '/', '/calendario-corsi' ],
		'news'           => [ '/', '/news' ],
		'offerta_lavoro' => [ '/agenzia-per-il-lavoro', '/agenzia-per-il-lavoro/servizi-alla-persona' ],
		'aiuto_stato'    => [ '/aiuti-di-stato/2023', '/aiuti-di-stato/2024' ],
		'sede'           => [ '/contatti' ],
		'archivio'       => [ '/archivio' ],
		// FAQ, partner e schede compaiono in più pagine: si rigenera tutto.
	];
	return $map[ $post_type ] ?? [];
}

function aletheia_revalidate_post( WP_Post $post ): void {
	if ( wp_is_post_revision( $post ) || wp_is_post_autosave( $post ) || ! in_array( $post->post_type, aletheia_all_types(), true ) ) {
		return;
	}
	// Pagina opzioni (header, footer, SEO...) e tipi trasversali (FAQ, partner, schede) toccano ogni pagina.
	if ( (int) $post->ID === aletheia_options_page_id() || in_array( $post->post_type, [ 'faq', 'partner', 'scheda' ], true ) ) {
		aletheia_revalidate( [ 'scope' => 'all' ] );
		return;
	}
	$paths = aletheia_dependent_paths( $post->post_type );
	// Pagina del contenuto stesso; per le righe di Aiuti di Stato è la pagina dell'anno (meta `anno`).
	if ( in_array( $post->post_type, array_merge( aletheia_routable_types(), [ 'aiuto_stato' ] ), true ) ) {
		$paths[] = aletheia_frontend_path( $post );
	}
	// Voce di una famiglia: si rigenera anche la panoramica della famiglia.
	if ( $post->post_type === 'archivio' ) {
		$famiglia = get_post_meta( $post->ID, 'famiglia', true );
		if ( $famiglia ) {
			$paths[] = '/archivio/' . $famiglia;
		}
	}
	aletheia_revalidate( [ 'paths' => array_values( array_unique( $paths ) ) ] );
}

// Cambi di stato (pubblica, depubblica, cestina): interessa solo ciò che è, o era, pubblico.
add_action( 'transition_post_status', function ( $new, $old, $post ) {
	if ( $new === 'publish' || $old === 'publish' ) {
		aletheia_revalidate_post( $post );
	}
}, 10, 3 );

// Il salvataggio dei campi ACF avviene DOPO transition_post_status: per le modifiche ai soli campi di un
// contenuto già pubblicato ci si aggancia qui, a dati già scritti.
add_action( 'acf/save_post', function ( $post_id ) {
	$post = is_numeric( $post_id ) ? get_post( (int) $post_id ) : null;
	if ( $post && $post->post_status === 'publish' ) {
		aletheia_revalidate_post( $post );
	}
}, 20 );
