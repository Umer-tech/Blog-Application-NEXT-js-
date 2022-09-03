import { Schema, models, model } from "mongoose";

const blogSchema = new Schema({
    title: String,
    image : String,
    excerpt: String,
    date: String,
    slug: String,
    content: String
});



const Blogs = models.blog ||model('blog', blogSchema)

export default Blogs;