<?php
/**
 * Page template for Premium / Coming Soon.
 */
get_header();
?>
<main class="container" style="padding:3rem 0; text-align:center;">
    <h1 style="color:var(--accent); margin-bottom:1rem;">Premium Membership – Coming Soon</h1>
    <p style="font-size:1.2rem; color:var(--text-primary);">We are working on an ad‑free premium experience. Stay tuned for updates!</p>
    <img src="<?php echo esc_url( get_template_directory_uri() . '/assets/premium_placeholder.png' ); ?>" alt="Premium placeholder" style="max-width:400px; width:100%; margin:2rem auto;" />
</main>
<?php get_footer(); ?>
