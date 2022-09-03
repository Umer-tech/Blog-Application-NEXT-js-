import connectMongo from '../../../database/conn'
import {getBlogs, postBlog, putBlog, deleteBlog, validateSession} from '../../../database/controller';
export default async function handler(req, res) {
    //Checking weather user is authorized

    connectMongo()

    const { method} = req

    switch(method){
        case 'GET' :
            // res.status(200).json({ method, name: 'GET Request' });
            await getBlogs(req, res);
            break;
        case 'POST':
            validateSession(req, res)
            // res.status(200).json({ method, name: 'POST Request' });
            await postBlog(req, res)
            break;
        case 'PUT':
            validateSession(req, res)
            // res.status(200).json({ method, name: 'PUT Request' });
            await putBlog(req, res)
            break;
        case 'DELETE':
            validateSession(req, res)
            // res.status(200).json({ method, name: 'DELETE Request' });
            await deleteBlog(req, res);
            break;
        default : 
            res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
            res.status(405).end(`Method ${method} Not Allowd`)
            break;
    }
  }
  