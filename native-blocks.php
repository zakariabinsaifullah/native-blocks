<?php
/**
 * Plugin Name: Native Blocks
 * Description: Custom native blocks for Gutenberg editor.
 * Author: Zakaria Binsaifullah 
 * Author URI: https://devzakaria.com
 * Version: 1.0.1
 * Text Domain: native-blocks
 * Domain Path: /languages
 * License: GPLv2 or later
 * License URI: http://www.gnu.org/licenses/gpl-2.0.html
 *
 * @package NativeBlocks
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit; // Exit if accessed directly.
}

if ( ! class_exists( 'NativeBlocks' ) ) {
    
    class NativeBlocks {
        
        /**
         * Single instance of the class
         *
         * @var NativeBlocks
         */
        private static $instance = null;
        
        /**
         * Plugin version
         *
         * @var string
         */
        public $version = '1.0.0';
        
        /**
         * Plugin path
         *
         * @var string
         */
        public $plugin_path;
        
        /**
         * Plugin URL
         *
         * @var string
         */
        public $plugin_url;
        
        /**
         * Get single instance of the class
         *
         * @return NativeBlocks
         */
        public static function get_instance() {
            if ( null === self::$instance ) {
                self::$instance = new self();
            }
            return self::$instance;
        }
        
        /**
         * Constructor
         */
        private function __construct() {
            $this->plugin_path = plugin_dir_path( __FILE__ );
            $this->plugin_url  = plugin_dir_url( __FILE__ );
            
            $this->init();
        }
        
        /**
         * Initialize the plugin
         */
        public function init() {
            add_action( 'init', array( $this, 'register_blocks' ) );
        }
        
        /**
         * Register all blocks from build/blocks/* folders
         */
        public function register_blocks() {
            $blocks_dir = $this->plugin_path . 'build/blocks/';
            
            // Check if build/blocks directory exists
            if ( ! is_dir( $blocks_dir ) ) {
                return;
            }
            
            // Get all folders in build/blocks directory
            $block_folders = array_filter( glob( $blocks_dir . '*' ), 'is_dir' );
            
            foreach ( $block_folders as $block_folder ) {
                $block_name = basename( $block_folder );
                $block_json_path = $block_folder . '/block.json';
                
                // Check if block.json exists
                if ( file_exists( $block_json_path ) ) {
                    register_block_type( $block_folder );
                }
            }
        }
        
    }
}

// Initialize the plugin
NativeBlocks::get_instance();
