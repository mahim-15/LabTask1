<?php
/**
 * Single game template – displays the game player, details, and related games.
 */
get_header();
?>
<main class="container" style="padding:2rem 0;">
    <?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
        <article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
            <h1 class="game-title" style="color: var(--accent); margin-bottom:1rem;"><?php the_title(); ?></h1>
            <?php
                $categories = get_the_terms( get_the_ID(), 'game_category' );
                if ( $categories && ! is_wp_error( $categories ) ) {
                    echo '<p class="game-cats" style="margin-bottom:0.5rem;">Category: ';
                    $cat_links = array();
                    foreach ( $categories as $cat ) {
                        $cat_links[] = '<a href="' . esc_url( get_term_link( $cat ) ) . '" style="color: var(--text-muted);">' . esc_html( $cat->name ) . '</a>';
                    }
                    echo implode( ', ', $cat_links );
                    echo '</p>';
                }
                $embed_url = get_post_meta( get_the_ID(), '_gaming_game_embed_url', true );
            ?>
            <div class="game-player" style="margin:1rem 0; text-align:center;">
                <?php if ( $embed_url ) : ?>
                    <iframe src="<?php echo esc_url( $embed_url ); ?>"
                            width="100%"
                            height="500"
                            style="border:none; max-width:800px;"
                            sandbox="allow-scripts allow-same-origin"
                            allowfullscreen>
                    </iframe>
                <?php else : ?>
                    <p style="color: var(--text-muted);">Game embed URL not provided.</p>
                <?php endif; ?>
            </div>
            <section class="game-description" style="margin-top:1.5rem;">
                <h2 style="color: var(--text-primary);">Description</h2>
                <div><?php the_content(); ?></div>
            </section>
            <?php
                $instructions = get_post_meta( get_the_ID(), '_gaming_game_instructions', true );
                if ( $instructions ) :
            ?>
            <section class="game-instructions" style="margin-top:1rem;">
                <h3 style="color: var(--text-primary);">How to Play</h3>
                <p><?php echo esc_html( $instructions ); ?></p>
            </section>
            <?php endif; ?>
            <?php
                $attribution = get_post_meta( get_the_ID(), '_gaming_game_attribution', true );
                if ( $attribution ) :
            ?>
            <section class="game-attribution" style="margin-top:1rem; font-size:0.9rem; color: var(--text-muted);">
                <p>Provided by: <?php echo esc_html( $attribution ); ?></p>
            </section>
            <?php endif; ?>
            <!-- Advertisement placeholder below player -->
            <div class="ad-slot" style="margin:2rem 0; text-align:center;">
                <?php if ( function_exists( 'ad_inserter' ) ) { echo do_shortcode('[adinserter block="5"]'); } else { echo '<!-- Ad placeholder -->'; } ?>
            </div>
            <!-- Related games (same category) -->
            <?php
                if ( $categories && ! is_wp_error( $categories ) ) {
                    $cat_ids = wp_list_pluck( $categories, 'term_id' );
                    $related_args = array(
                        'post_type'      => 'game',
                        'posts_per_page' => 4,
                        'post__not_in'   => array( get_the_ID() ),
                        'tax_query'      => array(
                            array(
                                'taxonomy' => 'game_category',
                                'field'    => 'term_id',
                                'terms'    => $cat_ids,
                            ),
                        ),
                    );
                    $related = new WP_Query( $related_args );
                    if ( $related->have_posts() ) :
            ?>
            <section class="related-games" style="margin-top:2rem;">
                <h2 style="color: var(--text-primary);">Related Games</h2>
                <div class="games-grid" style="display:grid; grid-template-columns:repeat(auto-fill, minmax(200px,1fr)); gap:1rem;">
                <?php while ( $related->have_posts() ) : $related->the_post(); ?>
                    <article class="game-card">
                        <a href="<?php the_permalink(); ?>">
                            <?php if ( has_post_thumbnail() ) : ?>
                                <?php the_post_thumbnail( 'medium', array( 'style' => 'width:100%; height:auto;' ) ); ?>
                            <?php else : ?>
                                <div style="background:#333; height:120px; display:flex; align-items:center; justify-content:center; color:#fff;">No Image</div>
                            <?php endif; ?>
                            <div class="info"><h3><?php the_title(); ?></h3></div>
                        </a>
                    </article>
                <?php endwhile; wp_reset_postdata(); ?>
                </div>
            </section>
            <?php
                    endif; // related
                }
            ?>
        </article>
    <?php endwhile; else : ?>
        <p>No game found.</p>
    <?php endif; ?>
</main>
<?php get_footer(); ?>
