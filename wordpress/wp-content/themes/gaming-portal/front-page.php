<?php
/**
 * Front page template for Gaming Portal.
 * Displays hero, popular, new, and category sections using the Games CPT.
 */
get_header();
?>

<main class="container">
    <!-- Hero Section (first featured game) -->
    <?php
    $hero_args = array(
        'post_type'      => 'game',
        'meta_key'       => '_gaming_game_featured',
        'meta_value'     => '1',
        'posts_per_page' => 1,
    );
    $hero_query = new WP_Query( $hero_args );
    if ( $hero_query->have_posts() ) :
        $hero_query->the_post();
        $embed_url = get_post_meta( get_the_ID(), '_gaming_game_embed_url', true );
    ?>
    <section class="hero" style="margin:2rem 0; text-align:center;">
        <h1><?php the_title(); ?></h1>
        <div class="hero-game" style="max-width:800px; margin:auto;">
            <iframe src="<?php echo esc_url( $embed_url ); ?>" width="100%" height="450" style="border:none;" sandbox="allow-scripts allow-same-origin" allowfullscreen></iframe>
        </div>
        <a href="<?php the_permalink(); ?>" class="btn" style="margin-top:1rem;">Play Now</a>
    </section>
    <?php wp_reset_postdata(); endif; ?>

    <!-- Advertisement placeholder (banner) -->
    <div class="ad-slot" style="margin:2rem 0; text-align:center;">
        <?php if ( function_exists( 'ad_inserter' ) ) { echo do_shortcode('[adinserter block="2"]'); } else { echo '<!-- Ad placeholder -->'; } ?>
    </div>

    <!-- Popular Games Section -->
    <section class="games-section">
        <h2>Popular Games</h2>
        <div class="games-grid" style="display:grid; grid-template-columns:repeat(auto-fill, minmax(250px, 1fr)); gap:1.5rem;">
        <?php
        $popular_args = array(
            'post_type'      => 'game',
            'meta_key'       => '_gaming_game_featured',
            'meta_value'     => '1',
            'posts_per_page' => 8,
        );
        $popular_query = new WP_Query( $popular_args );
        if ( $popular_query->have_posts() ) :
            while ( $popular_query->have_posts() ) : $popular_query->the_post();
                $thumb = get_the_post_thumbnail_url( get_the_ID(), 'medium' );
        ?>
            <article class="game-card">
                <a href="<?php the_permalink(); ?>">
                    <?php if ( $thumb ) : ?>
                        <img src="<?php echo esc_url( $thumb ); ?>" alt="<?php the_title_attribute(); ?> thumbnail" loading="lazy" />
                    <?php else : ?>
                        <div style="background:#333; height:150px; display:flex; align-items:center; justify-content:center; color:#fff;">No Image</div>
                    <?php endif; ?>
                    <div class="info">
                        <h3><?php the_title(); ?></h3>
                        <p><?php echo wp_trim_words( get_the_excerpt(), 12 ); ?></p>
                    </div>
                </a>
            </article>
        <?php
            endwhile;
            wp_reset_postdata();
        else :
            echo '<p>No popular games yet.</p>'; 
        endif;
        ?>
        </div>
    </section>

    <!-- New Games Section -->
    <section class="games-section" style="margin-top:2rem;">
        <h2>New Games</h2>
        <div class="games-grid" style="display:grid; grid-template-columns:repeat(auto-fill, minmax(250px, 1fr)); gap:1.5rem;">
        <?php
        $new_args = array(
            'post_type'      => 'game',
            'posts_per_page' => 8,
            'orderby'        => 'date',
            'order'          => 'DESC',
        );
        $new_query = new WP_Query( $new_args );
        if ( $new_query->have_posts() ) :
            while ( $new_query->have_posts() ) : $new_query->the_post();
                $thumb = get_the_post_thumbnail_url( get_the_ID(), 'medium' );
        ?>
            <article class="game-card">
                <a href="<?php the_permalink(); ?>">
                    <?php if ( $thumb ) : ?>
                        <img src="<?php echo esc_url( $thumb ); ?>" alt="<?php the_title_attribute(); ?> thumbnail" loading="lazy" />
                    <?php else : ?>
                        <div style="background:#333; height:150px; display:flex; align-items:center; justify-content:center; color:#fff;">No Image</div>
                    <?php endif; ?>
                    <div class="info">
                        <h3><?php the_title(); ?></h3>
                        <p><?php echo wp_trim_words( get_the_excerpt(), 12 ); ?></p>
                    </div>
                </a>
            </article>
        <?php
            endwhile;
            wp_reset_postdata();
        else :
            echo '<p>No new games yet.</p>'; 
        endif;
        ?>
        </div>
    </section>

    <!-- Browse by Category Section -->
    <section class="category-section" style="margin-top:2rem;">
        <h2>Browse by Category</h2>
        <ul style="list-style:none; display:flex; flex-wrap:wrap; gap:1rem;">
        <?php
        $categories = get_terms( array(
            'taxonomy' => 'game_category',
            'hide_empty' => true,
        ) );
        foreach ( $categories as $cat ) :
        ?>
            <li><a class="btn" href="<?php echo esc_url( get_term_link( $cat ) ); ?>"><?php echo esc_html( $cat->name ); ?></a></li>
        <?php endforeach; ?>
        </ul>
    </section>

    <!-- Additional Recommended Games (fallback) -->
    <section class="games-section" style="margin-top:2rem;">
        <h2>Recommended Games</h2>
        <?php
        // Simple fallback: random games
        $rec_args = array(
            'post_type'      => 'game',
            'posts_per_page' => 4,
            'orderby'        => 'rand',
        );
        $rec_query = new WP_Query( $rec_args );
        if ( $rec_query->have_posts() ) :
        ?>
            <div class="games-grid" style="display:grid; grid-template-columns:repeat(auto-fill, minmax(250px, 1fr)); gap:1.5rem;">
            <?php while ( $rec_query->have_posts() ) : $rec_query->the_post();
                $thumb = get_the_post_thumbnail_url( get_the_ID(), 'medium' );
            ?>
                <article class="game-card">
                    <a href="<?php the_permalink(); ?>">
                        <?php if ( $thumb ) : ?>
                            <img src="<?php echo esc_url( $thumb ); ?>" alt="<?php the_title_attribute(); ?>" loading="lazy" />
                        <?php else : ?>
                            <div style="background:#333; height:150px; display:flex; align-items:center; justify-content:center; color:#fff;">No Image</div>
                        <?php endif; ?>
                        <div class="info"><h3><?php the_title(); ?></h3></div>
                    </a>
                </article>
            <?php endwhile; ?>
            </div>
        <?php
            wp_reset_postdata();
        else :
            echo '<p>No recommendations at the moment.</p>';
        endif;
        ?>
    </section>

    <!-- Footer ad slot -->
    <div class="ad-slot" style="margin:2rem 0; text-align:center;">
        <?php if ( function_exists( 'ad_inserter' ) ) { echo do_shortcode('[adinserter block="3"]'); } else { echo '<!-- Footer ad placeholder -->'; } ?>
    </div>
</main>

<?php get_footer(); ?>
