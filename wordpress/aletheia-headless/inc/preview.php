<?php
defined( 'ABSPATH' ) || exit;

function aletheia_preview_url( WP_Post $post, array $extra = [], int $ttl = 3600 ): string {
	$t = aletheia_preview_token( $post->ID, $ttl );
	return add_query_arg( array_merge( [
		'id'    => $post->ID,
		'path'  => rawurlencode( aletheia_frontend_path( $post ) ),
		'exp'   => $t['exp'],
		'token' => $t['token'],
	], $extra ), aletheia_frontend_url() . '/api/preview' );
}

/** Link "Anteprima" standard di WP -> Preview Mode di Next con token a scadenza. */
add_filter( 'preview_post_link', fn( $link, $post ) => aletheia_preview_url( $post ), 10, 2 );

/**
 * Pannello live accanto al form dell'editor (Gutenberg o classico): iframe Next + postMessage a ogni modifica.
 * Si aggancia ad ACF perché legge i valori dei campi dal form.
 */
add_action( 'acf/input/admin_enqueue_scripts', function () {
	$post = get_post();
	if ( ! $post || ! in_array( $post->post_type, aletheia_all_types(), true ) ) {
		return;
	}
	wp_enqueue_script( 'aletheia-live-preview', ALETHEIA_URL . 'assets/live-preview.js', [ 'acf-input', 'wp-api-fetch' ], ALETHEIA_VERSION, true );
	wp_enqueue_style( 'aletheia-live-preview', ALETHEIA_URL . 'assets/live-preview.css', [], ALETHEIA_VERSION );
	wp_localize_script( 'aletheia-live-preview', 'ALETHEIA_PREVIEW', [
		'frontendUrl' => aletheia_frontend_url(),
		'postId'      => $post->ID,
		'postType'    => $post->post_type,
		'isOptions'   => (int) $post->ID === aletheia_options_page_id(),
		// /api/preview imposta il cookie di Preview Mode e fa redirect a path con ?live=1 (vedi README).
		'iframeSrc'   => aletheia_preview_url( $post, [ 'live' => 1 ], 4 * HOUR_IN_SECONDS ),
	] );
} );
