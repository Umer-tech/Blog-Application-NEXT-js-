
/** Controller */
import Blogs from '../models/blog-schema'
import { connectToDatabase } from '../lib/db'
import {getSession} from 'next-auth/react';

// get : http://localhost:3000/api/blog
export async function getBlogs(req, res){
    try {
        const { page } = req.query;
        const pages = page - 1
        const blogs = await Blogs.find().limit(10).skip(pages*10)
        const totalCount = await Blogs.count();
        if(!blogs) return res.status(404).json( { error: "Data not Found"})
        return res.status(200).json({data: blogs, totalCount})
    } catch (error) {
        res.status(404).json( { error : "Error While Fetching Data"})
    }
}
export async function getAllBlogs(req, res){
    try {
        const blogs = await Blogs.find()
        if(!blogs) return res.status(404).json( { error: "Data not Found"})
        return res.status(200).json({data: blogs})
    } catch (error) {
        res.status(404).json( { error : "Error While Fetching Data"})
    }
}
// get : http://localhost:3000/api/blog/1
export async function getBlogById(req, res){
    try {
        const blog = await Blogs.findById({_id: req.query.blogid});
            return res.status(200).json(blog)
        
    } catch (error) {
        res.status(404).json({ error:'Not Found'})
    }
   
}

// post : http://localhost:3000/api/blog
export async function postBlog(req, res){
    try {
        const formData = req.body;
        if(!formData) return res.status(404).json( { error: "Form Data Not Provided...!"});
        Blogs.create( formData, function(err, data){
            return res.status(200).json(data)
        })
    } catch (error) {
        return res.status(404).json({ error })
    }
}

// put : http://localhost:3000/api/blog/1
export async function putBlog(req, res){
    try {

            const blog = await Blogs.findOne({_id: req.query.blogid});
            blog.title = req.body.title;
            blog.image = req.body.image;
            blog.excerpt = req.body.excerpt;
            blog.date = req.body.date;
            blog.slug = req.body.slug;
            blog.content = req.body.content
            blog.uemail = req.body.uemail
            blog.feature = req.body.feature
            await blog.save();
            return res.status(200).json(blog)

        
    } catch (error) {
        res.status(404).json({ error: "Error While Updating the Data...!"})
    }
}

// delete : http://localhost:3000/api/blog/1
export async function deleteBlog(req, res){
    try {
            const blog = await Blogs.findOneAndDelete({_id:  req.query.blogid})
            return res.status(200).json(blog)
        }

    catch (error) {
        res.status(404).json({ error: "Error While Deleting the User...!"})
    }
}

//Autheticate User Login
export async function getUser(req, res){
    try {
        const blog = await Blogs.find({name: 'john', password: { $gte: 18 }});
            return res.status(200).json(blog)
        
    } catch (error) {
        res.status(404).json({ error:'62ecc6ddf1a09375ef5584b8'})
    }
   
}
// get : http://localhost:3000/api/user/1
export async function getUserById(req, res){
    try {
        const client = await connectToDatabase();

        const db = client.db();

        const user = await db.collection('users').findOne({ email: req.query.user });
        return res.status(200).json(user)

        
    } catch (error) {
        res.status(404).json({ error:'Not Found'})
    }
   
}

//post:  http://localhost:3000/api/contact
export async function sendEmailOnLogin(req, res){
    const email = req.body;
    const sgMail = require('@sendgrid/mail')
    sgMail.setApiKey('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')
    const msg = {
      to: email, // Change to your recipient
      from: 'umerabdulmajeed1@gmail.com', // Change to your verified sender
      subject: 'Blog Application Alert',
      template_id:'d-74aa8ad20e9442e09e61f63995f526f3',
    }
    await sgMail
      .send(msg)
      .then(() => {
        return  res.status(200).json({'msg': 'Email Send'})
        })
      .catch((error) => {
        return  res.status(404).json({ error })
      })

}

//Checking User's authorization to Send Request
export async function validateSession(req, res)
{
    const session = await getSession({req: req});

    if(!session){
        return res.status(401).json({message: 'Not Authentified'});
    }
}