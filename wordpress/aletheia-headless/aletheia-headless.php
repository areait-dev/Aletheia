<?php
/**
 * Plugin Name: Aletheia Headless
 * Description: Backend headless per il frontend Next.js di Alètheia Srl (ACF gratuito): CPT, field group in acf-json, REST, revalidazione e anteprima live.
 * Version: 0.1.0
 * Requires PHP: 7.4
 * Text Domain: aletheia
 *
 * Configurazione (wp-config.php):
 *   define( 'ALETHEIA_FRONTEND_URL', 'https://www.aletheiasrl.it' );   // niente slash finale
 *   define( 'ALETHEIA_SHARED_SECRET', '<stringa lunga casuale>' );     // identica a WP_SHARED_SECRET in Next (.env.local)
 */

defined( 'ABSPATH' ) || exit;

define( 'ALETHEIA_DIR', plugin_dir_path( __FILE__ ) );
define( 'ALETHEIA_URL', plugin_dir_url( __FILE__ ) );
define( 'ALETHEIA_VERSION', '0.1.0' );

require_once ALETHEIA_DIR . 'inc/helpers.php';
require_once ALETHEIA_DIR . 'inc/post-types.php';
require_once ALETHEIA_DIR . 'inc/acf-json.php';
require_once ALETHEIA_DIR . 'inc/rest.php';
require_once ALETHEIA_DIR . 'inc/revalidate.php';
require_once ALETHEIA_DIR . 'inc/preview.php';

// Il plugin usa ACF gratuito (campi semplici: niente repeater, blocchi o Options Page).
add_action( 'admin_notices', function () {
	if ( ! function_exists( 'acf_get_field' ) ) {
		echo '<div class="notice notice-error"><p><strong>Aletheia Headless</strong> richiede il plugin Advanced Custom Fields (versione gratuita va bene).</p></div>';
	}
} );
