<?php
/**
 * Index template – fallback for all archives/pages.
 */
get_header();
?>
<main class="container" style="padding:2rem 0;">
    <?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
        <article id="post-<?php the_ID(); ?>" <?php post_class(); ?> style="margin-bottom:2rem;">
            <h2><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2>
            <div class="entry-content">
                <?php the_excerpt(); ?>
            </div>
        </article>
    <?php endwhile; else : ?>
        <p>No content found.</p>
    <?php endif; ?>
</main>
<?php get_footer(); ?>
