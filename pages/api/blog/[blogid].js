import connectMongo from '../../../database/conn'
import { getBlogById, putBlog, deleteBlog, validateSession } from '../../../database/controller';
export default async function handler(req, res) {
            connectMongo()

        // type of request
        const { method } = req

        switch (method){
            case "GET":  
                await getBlogById(req, res)
                break;
            case 'PUT':
                //Checking weather user is authorized
                validateSession(req, res)
                await putBlog(req, res)
                break;
            case 'DELETE':
                //Checking weather user is authorized
                validateSession(req, res)
                await deleteBlog(req, res)
                break;
            default : 
                res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
                res.status(405).end(`Method ${method} Not Allowd`)
                break;
        }
}