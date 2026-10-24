<?php
/**
 * Taxonomy archive for game_category – shows games within a category.
 */
get_header();
?>
<main class="container" style="padding:2rem 0;">
    <?php
    $term = get_queried_object();
    if ( $term && ! is_wp_error( $term ) ) {
        echo '<h1 class="page-title" style="color: var(--accent); margin-bottom:1rem;">' . esc_html( $term->name ) . '</h1>';
        if ( $term->description ) {
            echo '<p class="term-description" style="margin-bottom:2rem;">' . esc_html( $term->description ) . '</p>';
        }
    }
    ?>
    <?php if ( have_posts() ) : ?>
        <div class="games-grid" style="display:grid; grid-template-columns:repeat(auto-fill, minmax(250px, 1fr)); gap:1.5rem;">
            <?php while ( have_posts() ) : the_post(); ?>
                <article class="game-card">
                    <a href="<?php the_permalink(); ?>">
                        <?php if ( has_post_thumbnail() ) : ?>
                            <?php the_post_thumbnail( 'medium', array('style'=>"width:100%;height:auto;")); ?>
                        <?php else : ?>
                            <div style="background:#333; height:150px; display:flex; align-items:center; justify-content:center; color:#fff;">No Image</div>
                        <?php endif; ?>
                        <div class="info"><h3><?php the_title(); ?></h3><p><?php echo wp_trim_words( get_the_excerpt(), 12 ); ?></p></div>
                    </a>
                </article>
            <?php endwhile; ?>
        </div>
        <?php
            the_posts_pagination( array(
                'mid_size' => 2,
                'prev_text' => '&laquo; Prev',
                'next_text' => 'Next &raquo;',
            ) );
        ?>
    <?php else : ?>
        <p>No games found in this category.</p>
    <?php endif; ?>
</main>
<?php get_footer(); ?>
