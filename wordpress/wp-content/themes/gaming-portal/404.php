<?php
/**
 * 404 Template – friendly not‑found page.
 */
get_header();
?>
<main class="container" style="padding:3rem 0; text-align:center;">
    <h1 style="font-size:3rem; color:var(--accent);">404 – Page Not Found</h1>
    <p style="margin:1.5rem 0; font-size:1.2rem; color:var(--text-primary);">Sorry, the page you are looking for does not exist.</p>
    <a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="btn">Return Home</a>
    <div style="margin-top:2rem;">
        <?php get_search_form(); ?>
    </div>
</main>
<?php get_footer(); ?>
