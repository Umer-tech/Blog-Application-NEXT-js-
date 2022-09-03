import classes from './featured-posts.module.css';
import PostsGrid from '../../components/posts/posts-grid';
function FeaturedPosts({loading, posts}){
   
    return(
        <section className ={classes.latest}>
            <h2>Featured Blogs</h2>
            <PostsGrid loading = {loading} posts = {posts} />
        </section>
    )
}

export default FeaturedPosts;