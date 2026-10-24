<?php
/**
 * Header template for Gaming Portal theme.
 */
?>
<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo( 'charset' ); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <?php wp_head(); ?>
    <style>
        /* Minimal inline style for the fixed top navigation */
        .site-header { background: var(--bg-primary); padding: 1rem 0; }
        .site-header .container { display: flex; align-items: center; justify-content: space-between; }
        .site-header .logo { font-size: 1.5rem; font-weight: bold; color: var(--accent); }
        .site-nav ul { list-style:none; margin:0; padding:0; display:flex; gap:1rem; }
        .site-nav a { color: var(--text-primary); }
        .site-nav a:hover { color: var(--accent); }
        .search-form { display:flex; }
        .search-form input[type="search"] { padding:0.4rem; border:none; border-radius:4px 0 0 4px; }
        .search-form button { padding:0.4rem 0.8rem; border:none; background:var(--accent); color:#fff; border-radius:0 4px 4px 0; }
    </style>
</head>
<body <?php body_class(); ?>>
<header class="site-header">
    <div class="container">
        <div class="logo"><a href="<?php echo esc_url( home_url( '/' ) ); ?>"><?php bloginfo( 'name' ); ?></a></div>
        <nav class="site-nav">
            <?php
            wp_nav_menu( array(
                'theme_location' => 'primary',
                'container'      => false,
                'fallback_cb'    => false,
                'items_wrap'     => '<ul>%3$s</ul>',
            ) );
            ?>
        </nav>
        <form role="search" method="get" class="search-form" action="<?php echo esc_url( home_url( '/' ) ); ?>">
            <input type="search" name="s" placeholder="Search games…" value="<?php echo get_search_query(); ?>" />
            <button type="submit">Search</button>
        </form>
    </div>
</header>
<?php
// Optional ad slot after header (banner)
if ( function_exists( 'ad_inserter' ) ) {
    echo do_shortcode('[adinserter block="1"]'); // placeholder block ID 1
}
?>
