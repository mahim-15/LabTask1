<?php
/**
 * Footer template for Gaming Portal theme.
 */
?>
<footer class="site-footer" style="background: var(--bg-primary); color: var(--text-muted); padding: 2rem 0; margin-top: 2rem;">
    <div class="container" style="display: flex; flex-wrap: wrap; justify-content: space-between; gap: 1rem;">
        <div class="footer-col">
            <h4 style="color: var(--text-primary); margin-bottom: 0.5rem;">About</h4>
            <p>Free HTML5 Gaming Portal – a curated collection of browser‑playable games.</p>
        </div>
        <div class="footer-col">
            <h4 style="color: var(--text-primary); margin-bottom: 0.5rem;">Contact</h4>
            <p>Email: <a href="mailto:info@example.com">info@example.com</a></p>
        </div>
        <div class="footer-col">
            <h4 style="color: var(--text-primary); margin-bottom: 0.5rem;">Legal</h4>
            <ul style="list-style:none; padding:0; margin:0;">
                <li><a href="<?php echo esc_url( home_url( '/privacy-policy' ) ); ?>">Privacy Policy</a></li>
                <li><a href="<?php echo esc_url( home_url( '/terms-of-service' ) ); ?>">Terms of Service</a></li>
            </ul>
        </div>
    </div>
    <div class="ad-slot" style="text-align:center; margin-top:1rem;">
        <?php if ( function_exists( 'ad_inserter' ) ) { echo do_shortcode('[adinserter block="4"]'); } else { echo '<!-- Footer ad placeholder -->'; } ?>
    </div>
    <div class="site-info" style="text-align:center; margin-top:1rem; font-size:0.9rem;">
        &copy; <?php echo date('Y'); ?> Gaming Portal. All rights reserved.
    </div>
</footer>
<?php wp_footer(); ?>
</body>
</html>
