<?php
defined( 'ABSPATH' ) || exit;

function aletheia_frontend_url(): string {
	return rtrim( defined( 'ALETHEIA_FRONTEND_URL' ) ? ALETHEIA_FRONTEND_URL : 'http://localhost:3000', '/' );
}

function aletheia_secret(): string {
	return defined( 'ALETHEIA_SHARED_SECRET' ) ? ALETHEIA_SHARED_SECRET : '';
}

/** Contenuti con una pagina propria sul frontend (alimentano /routes e getStaticPaths). */
function aletheia_routable_types(): array {
	return [ 'page', 'corso', 'news', 'offerta_lavoro', 'archivio' ];
}

/** Tutti i tipi che il frontend consuma: revalidazione e anteprima live valgono per tutti. */
function aletheia_all_types(): array {
	return [ 'page', 'corso', 'edizione_corso', 'news', 'offerta_lavoro', 'aiuto_stato', 'faq', 'partner', 'sede', 'scheda', 'archivio' ];
}

/** ID della pagina WP "opzioni-globali" (contatti, menu, footer, chatbot, SEO). Come in PromoSan: pagina normale, non Options Page. */
function aletheia_options_page_id(): int {
	static $id = null;
	if ( $id === null ) {
		$p  = get_page_by_path( 'opzioni-globali' );
		$id = $p ? (int) $p->ID : 0;
	}
	return $id;
}

function aletheia_page_id_by_slug( string $slug ): int {
	$p = get_page_by_path( $slug );
	return $p ? (int) $p->ID : 0;
}

function aletheia_preview_token_for( int $post_id, int $exp ): string {
	return hash_hmac( 'sha256', $post_id . '|' . $exp, aletheia_secret() );
}

/**
 * Token di anteprima a scadenza (HMAC-SHA256 di "post_id|exp"). Il secret condiviso resta server-side:
 * al browser arriva solo il token, che Next verifica con lo stesso secret in /api/preview.
 */
function aletheia_preview_token( int $post_id, int $ttl = 3600 ): array {
	$exp = time() + $ttl;
	return [ 'exp' => $exp, 'token' => aletheia_preview_token_for( $post_id, $exp ) ];
}

function aletheia_verify_preview( int $post_id, int $exp, string $token ): bool {
	return aletheia_secret() && $exp > time() && hash_equals( aletheia_preview_token_for( $post_id, $exp ), $token );
}

/**
 * Percorso frontend che mostra un contenuto. Le rotte Next sono fisse: questo è l'UNICO punto da
 * aggiornare se cambia una rotta. I tipi senza pagina propria puntano alla pagina che li elenca.
 */
function aletheia_frontend_path( WP_Post $post ): string {
	switch ( $post->post_type ) {
		// Le bozze non hanno ancora uno slug: si usa l'ID, che il frontend accetta solo in Preview Mode.
		case 'corso':
			return '/all-courses/' . ( $post->post_name ?: $post->ID );
		case 'news':
			return '/news/' . ( $post->post_name ?: $post->ID );
		case 'offerta_lavoro':
			return '/agenzia-per-il-lavoro/offerte/' . ( $post->post_name ?: $post->ID );
		case 'edizione_corso':
			return '/calendario-corsi';
		case 'aiuto_stato':
			$anno = get_post_meta( $post->ID, 'anno', true );
			return $anno ? '/aiuti-di-stato/' . $anno : '/';
		case 'archivio':
			// Voce singola: /archivio/<slug>; di una famiglia: /archivio/<famiglia>/<slug> (campo ACF `famiglia`).
			$famiglia = get_post_meta( $post->ID, 'famiglia', true );
			return '/archivio/' . ( $famiglia ? $famiglia . '/' : '' ) . ( $post->post_name ?: $post->ID );
		case 'sede':
			return '/contatti';
		case 'scheda':
			return '/';
		case 'page':
			if ( (int) $post->ID === aletheia_options_page_id() ) {
				return '/';
			}
			$uri = get_page_uri( $post );
			return $uri === 'home' ? '/' : '/' . $uri;
	}
	return '/';
}
