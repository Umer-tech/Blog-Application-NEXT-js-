import PostHeader from './post-header';
import classes from './post-content.module.css';
import {getBlogbyId} from "../../../lib/helper";
import {useRouter} from 'next/router';
import { useEffect, useState } from 'react';
import {useSession, getSession} from 'next-auth/react';
import UpdateBlog from '../../../pages/posts/update-blog';
import { deleteBlog } from '../../../lib/helper';
import Link from 'next/link';

function PostContent({data}){

    
    const{data: session, status} = useSession();
    const[myData, setMyData] = useState({date: '', excerpt: '', image: '', slug: '', title:'',content:'',_id:'', uemail: ''});
    const [isShown, setIsShown] = useState(false);
    const router = useRouter()
    const urlsplit = router.asPath.split('/')
    const blogSlug = urlsplit.pop();
    
function handleDelete(id) {
        deleteBlog(id);
        alert("Record deleted successfully");
        }
    const handelUpdate = () => { 
       setIsShown(true)
    }
    useEffect(()=> {
        const blog = async () => {
            const res = getBlogbyId(blogSlug)
            const result = await res;
            const data =result.results.data
            setMyData(data);
        }
        blog()
    },[])
   

     const imagepath = myData.image;
         return(
             <article className = {classes.content} >
                 <PostHeader title= {myData.title} image = {imagepath} />
                 {myData.content}
                 <br/><br/>
                 {session && session.user.email === myData.uemail &&(
                 <Link href = '/'><button id = "btn1" onClick={() =>handleDelete(myData._id)}>Delete Blog</button></Link>
                 )}
                 {session && session.user.email === myData.uemail && (
                 <button id = "btn2" onClick={() => handelUpdate()}>Update Blog</button>
                 )}
                 {isShown && < UpdateBlog id = {myData._id}/>}
             </article>


         )
}
export default PostContent;