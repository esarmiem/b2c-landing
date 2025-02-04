<?php
/*
Plugin Name: b2c-landing-pluging
Description: Un plugin que muestra el formulario de cotizacion.
Version: 1.0
Author: Julian Rivera
*/

// Evita el acceso directo al archivo
defined('ABSPATH') or die('No script kiddies please!');

// Incluye el shortcode
function react_form_shortcode() {
    return '<div id="react-form"></div>';
}
add_shortcode('react_form', 'react_form_shortcode');

// Carga los scripts y estilos necesarios
function react_form_enqueue_scripts() {
    wp_enqueue_script(
        'b2c-landing',
        plugins_url('dist/assets/embedQuotePage-2dfaf1bd.js', __FILE__),
        array('wp-element'),
        time(), // Cambia esto a una versión fija en producción
        true
    );

    // Si Vite genera un archivo CSS, cárgalo también
        wp_enqueue_style(
            'react-form-plugin-style',
            plugins_url('dist/assets/index-eb99a460.css', __FILE__), // Ajusta la ruta según la salida de Vite
            array(),
            time()
        );
}
add_action('wp_enqueue_scripts', 'react_form_enqueue_scripts');