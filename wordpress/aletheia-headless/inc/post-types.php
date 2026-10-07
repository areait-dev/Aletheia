<?php
defined( 'ABSPATH' ) || exit;

/**
 * CPT e tassonomie. Mappano le sorgenti dati oggi statiche nel frontend:
 *  corso           <- data/coursesRaw.js, data/courseFamilies.js, data/content/*, coursesDetails/EDITORIAL_CONTENT
 *  edizione_corso  <- data/calendario.ts
 *  news            <- lib/newsData.js
 *  offerta_lavoro  <- data/offerte.js
 *  aiuto_stato     <- data/content/aiuti-di-stato/*.js (una riga = un post, raggruppate per anno/ente dal frontend)
 *  archivio        <- public/pdf/archivio/*.json (bandi archiviati: titolo, testi, documenti PDF)
 *  faq, partner, sede, scheda <- FAQ sparse, loghi, sedi di contatti.js, liste di card (GOL, servizi, avvisi, vantaggi…)
 */
add_action( 'init', function () {
	$common = [
		'public'       => true,
		'show_in_rest' => true,
		'show_in_graphql' => true,
		'has_archive'  => false,
		'rewrite'      => false,
	];

	register_post_type( 'corso', array_merge( $common, [
		'labels'    => [ 'name' => 'Corsi', 'singular_name' => 'Corso', 'add_new_item' => 'Aggiungi corso' ],
		'menu_icon' => 'dashicons-welcome-learn-more',
		'supports'  => [ 'title', 'editor', 'thumbnail', 'excerpt', 'revisions', 'custom-fields' ],
		'graphql_single_name' => 'corso', 'graphql_plural_name' => 'corsi',
	] ) );

	register_post_type( 'edizione_corso', array_merge( $common, [
		'labels'    => [ 'name' => 'Calendario corsi', 'singular_name' => 'Edizione', 'add_new_item' => 'Aggiungi edizione' ],
		'menu_icon' => 'dashicons-calendar-alt',
		'supports'  => [ 'title', 'revisions' ],
		'publicly_queryable' => false,
		'graphql_single_name' => 'edizioneCorso', 'graphql_plural_name' => 'edizioniCorso',
	] ) );

	register_post_type( 'news', array_merge( $common, [
		'labels'    => [ 'name' => 'News', 'singular_name' => 'News', 'add_new_item' => 'Aggiungi news' ],
		'menu_icon' => 'dashicons-megaphone',
		'supports'  => [ 'title', 'editor', 'thumbnail', 'excerpt', 'revisions', 'custom-fields' ],
		'graphql_single_name' => 'newsItem', 'graphql_plural_name' => 'newsItems',
	] ) );

	register_post_type( 'offerta_lavoro', array_merge( $common, [
		'labels'    => [ 'name' => 'Offerte di lavoro', 'singular_name' => 'Offerta', 'add_new_item' => 'Aggiungi offerta' ],
		'menu_icon' => 'dashicons-businessperson',
		'supports'  => [ 'title', 'editor', 'thumbnail', 'revisions', 'custom-fields' ],
		'graphql_single_name' => 'offertaLavoro', 'graphql_plural_name' => 'offerteLavoro',
	] ) );

	register_post_type( 'aiuto_stato', array_merge( $common, [
		'labels'    => [ 'name' => 'Aiuti di Stato', 'singular_name' => 'Riga aiuto', 'add_new_item' => 'Aggiungi riga' ],
		'menu_icon' => 'dashicons-media-spreadsheet',
		'supports'  => [ 'title', 'revisions' ],
		'publicly_queryable' => false,
		'graphql_single_name' => 'aiutoStato', 'graphql_plural_name' => 'aiutiStato',
	] ) );

	foreach ( [
		'faq'     => [ 'FAQ', 'FAQ', 'dashicons-editor-help', [ 'title', 'editor', 'page-attributes' ], 'faq', 'faqs' ],
		'partner' => [ 'Partner e loghi', 'Partner', 'dashicons-groups', [ 'title', 'page-attributes' ], 'partner', 'partners' ],
		'sede'    => [ 'Sedi', 'Sede', 'dashicons-location', [ 'title', 'page-attributes' ], 'sede', 'sedi' ],
		'scheda'  => [ 'Schede contenuto', 'Scheda', 'dashicons-index-card', [ 'title', 'editor', 'thumbnail', 'page-attributes' ], 'scheda', 'schede' ],
		'archivio' => [ 'Archivio bandi', 'Voce archivio', 'dashicons-archive', [ 'title', 'page-attributes', 'revisions' ], 'voceArchivio', 'vociArchivio' ],
	] as $slug => [ $plural, $singular, $icon, $supports, $gq_single, $gq_plural ] ) {
		register_post_type( $slug, array_merge( $common, [
			'labels'    => [ 'name' => $plural, 'singular_name' => $singular ],
			'menu_icon' => $icon,
			'supports'  => $supports,
			'publicly_queryable' => false,
			'graphql_single_name' => $gq_single, 'graphql_plural_name' => $gq_plural,
		] ) );
	}

	// Categoria di catalogo (Sicurezza sul Lavoro, ECM, Regionale...) = coursesRaw.categoryKey.
	register_taxonomy( 'categoria_corso', [ 'corso', 'edizione_corso' ], [
		'labels' => [ 'name' => 'Categorie corso', 'singular_name' => 'Categoria corso' ],
		'hierarchical' => true, 'show_in_rest' => true, 'show_admin_column' => true,
		'show_in_graphql' => true, 'graphql_single_name' => 'categoriaCorso', 'graphql_plural_name' => 'categorieCorso',
	] );

	// Una lista di schede = un termine (es. "gol-misure", "servizi-imprese", "avvisi-regionali", "perche-noi").
	register_taxonomy( 'lista_schede', [ 'scheda' ], [
		'labels' => [ 'name' => 'Liste di schede', 'singular_name' => 'Lista' ],
		'hierarchical' => false, 'show_in_rest' => true, 'show_admin_column' => true,
		'show_in_graphql' => true, 'graphql_single_name' => 'listaSchede', 'graphql_plural_name' => 'listeSchede',
	] );

	// Famiglia = raggruppamento automatico di courseFamilies.js (Antincendio, RLS...): le varianti
	// livello/aggiornamento diventano più corsi nella stessa famiglia.
	register_taxonomy( 'famiglia_corso', [ 'corso' ], [
		'labels' => [ 'name' => 'Famiglie corso', 'singular_name' => 'Famiglia corso' ],
		'hierarchical' => false, 'show_in_rest' => true, 'show_admin_column' => true,
		'show_in_graphql' => true, 'graphql_single_name' => 'famigliaCorso', 'graphql_plural_name' => 'famiglieCorso',
	] );

	register_taxonomy( 'tag_news', [ 'news' ], [
		'labels' => [ 'name' => 'Tag news', 'singular_name' => 'Tag news' ],
		'hierarchical' => false, 'show_in_rest' => true,
		'show_in_graphql' => true, 'graphql_single_name' => 'tagNews', 'graphql_plural_name' => 'tagNews',
	] );
} );

// I metadati strutturati stanno nei gruppi ACF (acf-json/, generati da wordpress/build-acf-json.mjs).
