<?php
/**
 * Theme functions for Gaming Portal.
 * Handles custom post type "Games" and related taxonomy.
 */

// --- Enqueue Styles -------------------------------------------------------
function gaming_portal_enqueue_assets() {
    wp_enqueue_style( 'gaming-portal-style', get_stylesheet_uri() );
}
add_action( 'wp_enqueue_scripts', 'gaming_portal_enqueue_assets' );

// --- Register Custom Post Type: Game --------------------------------------
function gaming_portal_register_game_cpt() {
    $labels = array(
        'name'               => __( 'Games', 'gaming-portal' ),
        'singular_name'      => __( 'Game', 'gaming-portal' ),
        'add_new'            => __( 'Add New Game', 'gaming-portal' ),
        'add_new_item'       => __( 'Add New Game', 'gaming-portal' ),
        'edit_item'          => __( 'Edit Game', 'gaming-portal' ),
        'new_item'           => __( 'New Game', 'gaming-portal' ),
        'view_item'          => __( 'View Game', 'gaming-portal' ),
        'search_items'       => __( 'Search Games', 'gaming-portal' ),
        'not_found'          => __( 'No games found', 'gaming-portal' ),
        'not_found_in_trash' => __( 'No games found in Trash', 'gaming-portal' ),
        'menu_name'          => __( 'Games', 'gaming-portal' ),
    );

    $args = array(
        'labels'             => $labels,
        'public'             => true,
        'show_in_menu'       => true,
        'has_archive'        => true,
        'rewrite'            => array( 'slug' => 'games' ),
        'supports'           => array( 'title', 'editor', 'thumbnail', 'excerpt', 'author' ),
        'taxonomies'         => array( 'game_category' ),
        'show_in_rest'       => true,
    );
    register_post_type( 'game', $args );
}
add_action( 'init', 'gaming_portal_register_game_cpt' );

// --- Register Taxonomy: Game Category ------------------------------------
function gaming_portal_register_game_taxonomy() {
    $labels = array(
        'name'              => __( 'Game Categories', 'gaming-portal' ),
        'singular_name'     => __( 'Game Category', 'gaming-portal' ),
        'search_items'      => __( 'Search Categories', 'gaming-portal' ),
        'all_items'         => __( 'All Categories', 'gaming-portal' ),
        'parent_item'       => __( 'Parent Category', 'gaming-portal' ),
        'parent_item_colon' => __( 'Parent Category:', 'gaming-portal' ),
        'edit_item'         => __( 'Edit Category', 'gaming-portal' ),
        'update_item'       => __( 'Update Category', 'gaming-portal' ),
        'add_new_item'      => __( 'Add New Category', 'gaming-portal' ),
        'menu_name'         => __( 'Categories', 'gaming-portal' ),
    );

    $args = array(
        'hierarchical'      => true,
        'labels'            => $labels,
        'show_ui'           => true,
        'show_admin_column' => true,
        'query_var'         => true,
        'rewrite'           => array( 'slug' => 'game-category' ),
        'show_in_rest'      => true,
    );
    register_taxonomy( 'game_category', array( 'game' ), $args );
}
add_action( 'init', 'gaming_portal_register_game_taxonomy' );

// --- Add Meta Boxes for Game Details ------------------------------------
function gaming_portal_add_game_meta_boxes() {
    add_meta_box(
        'gaming_portal_game_details',
        __( 'Game Details', 'gaming-portal' ),
        'gaming_portal_render_game_meta_box',
        'game',
        'normal',
        'high'
    );
}
add_action( 'add_meta_boxes', 'gaming_portal_add_game_meta_boxes' );

function gaming_portal_render_game_meta_box( $post ) {
    wp_nonce_field( 'gaming_portal_save_game_meta', 'gaming_portal_game_meta_nonce' );
    $embed_url   = get_post_meta( $post->ID, '_gaming_game_embed_url', true );
    $instructions = get_post_meta( $post->ID, '_gaming_game_instructions', true );
    $attribution = get_post_meta( $post->ID, '_gaming_game_attribution', true );
    $featured    = get_post_meta( $post->ID, '_gaming_game_featured', true );
    $order       = get_post_meta( $post->ID, '_gaming_game_order', true );
?>
    <p>
        <label for="gaming_game_embed_url"><strong>Embed URL</strong></label><br>
        <input type="url" id="gaming_game_embed_url" name="gaming_game_embed_url" value="<?php echo esc_attr( $embed_url ); ?>" style="width:100%;" placeholder="https://example.com/game.html" required />
        <small>Direct URL to an HTML5 game (must be HTTPS and allowed to be embedded).</small>
    </p>
    <p>
        <label for="gaming_game_instructions"><strong>Instructions (optional)</strong></label><br>
        <textarea id="gaming_game_instructions" name="gaming_game_instructions" rows="3" style="width:100%;"><?php echo esc_textarea( $instructions ); ?></textarea>
    </p>
    <p>
        <label for="gaming_game_attribution"><strong>Attribution / Provider (optional)</strong></label><br>
        <input type="text" id="gaming_game_attribution" name="gaming_game_attribution" value="<?php echo esc_attr( $attribution ); ?>" style="width:100%;" />
    </p>
    <p>
        <label for="gaming_game_featured"><strong>Featured Game?</strong></label>
        <input type="checkbox" id="gaming_game_featured" name="gaming_game_featured" value="1" <?php checked( $featured, '1' ); ?> />
    </p>
    <p>
        <label for="gaming_game_order"><strong>Display Order (numeric)</strong></label><br>
        <input type="number" id="gaming_game_order" name="gaming_game_order" value="<?php echo esc_attr( $order ); ?>" min="0" style="width:100%;" />
        <small>Higher numbers appear later. Use for custom ordering or popularity.</small>
    </p>
<?php
}

function gaming_portal_save_game_meta( $post_id ) {
    // Verify nonce.
    if ( ! isset( $_POST['gaming_portal_game_meta_nonce'] ) ||
         ! wp_verify_nonce( $_POST['gaming_portal_game_meta_nonce'], 'gaming_portal_save_game_meta' ) ) {
        return;
    }
    // Bail out if autosave or insufficient permissions.
    if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) { return; }
    if ( ! current_user_can( 'edit_post', $post_id ) ) { return; }

    // Sanitize and store fields.
    if ( isset( $_POST['gaming_game_embed_url'] ) ) {
        update_post_meta( $post_id, '_gaming_game_embed_url', esc_url_raw( $_POST['gaming_game_embed_url'] ) );
    }
    if ( isset( $_POST['gaming_game_instructions'] ) ) {
        update_post_meta( $post_id, '_gaming_game_instructions', sanitize_textarea_field( $_POST['gaming_game_instructions'] ) );
    }
    if ( isset( $_POST['gaming_game_attribution'] ) ) {
        update_post_meta( $post_id, '_gaming_game_attribution', sanitize_text_field( $_POST['gaming_game_attribution'] ) );
    }
    $featured = isset( $_POST['gaming_game_featured'] ) ? '1' : '';
    update_post_meta( $post_id, '_gaming_game_featured', $featured );
    if ( isset( $_POST['gaming_game_order'] ) ) {
        $order = intval( $_POST['gaming_game_order'] );
        update_post_meta( $post_id, '_gaming_game_order', $order );
    }
}
add_action( 'save_post_game', 'gaming_portal_save_game_meta' );

// --- Enable featured image support ----------------------------------------
add_theme_support( 'post-thumbnails' );
?>
<?php
// Register navigation menu location
function gaming_portal_register_menus() {
    register_nav_menus( array(
        'primary' => __( 'Primary Menu', 'gaming-portal' ),
    ) );
}
add_action( 'after_setup_theme', 'gaming_portal_register_menus' );
?>
// Open Graph meta for Games (single view)
function gaming_portal_add_og_meta() {
    if ( is_singular('game') ) {
        global $post;
        $title = get_the_title( $post );
        $description = wp_strip_all_tags( get_the_excerpt( $post ) );
        $url = get_permalink( $post );
        $image = get_the_post_thumbnail_url( $post, 'large' );
        if ( ! $image ) {
            $image = 'https://via.placeholder.com/1200x630.png?text=Game+Image';
        }
        echo '<meta property="og:title" content="' . esc_attr( $title ) . '" />' . "\n";
        echo '<meta property="og:description" content="' . esc_attr( $description ) . '" />' . "\n";
        echo '<meta property="og:url" content="' . esc_url( $url ) . '" />' . "\n";
        echo '<meta property="og:image" content="' . esc_url( $image ) . '" />' . "\n";
        echo '<meta property="og:type" content="website" />' . "\n";
    }
}
add_action('wp_head', 'gaming_portal_add_og_meta');
