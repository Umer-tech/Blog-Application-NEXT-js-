import PostItem from './post-item';
import classes from './post-grid.module.css';
import { useRouter } from 'next/router';
import {useState} from 'react';
import {getSession} from 'next-auth/react';


function PostsGrid(props){
   
    const [uemail, setuEmail] = useState('');
    async function Session() {
        const session =await getSession();
        if(session != null){
        async function gettingSession () {
             const email= await getSession().then(res =>  email =res.user.email);
             return  setuEmail({uemail : email })
        }
        gettingSession();
            }
        }
        if(uemail === '')
        {
        Session();
        }   
        const posts = props.posts; 
    const query = useRouter();
    const email = uemail.uemail;
    var filteredBlogs = posts.filter((post) => post.uemail === email)
    if(query.pathname == '/')
    {
     filteredBlogs = posts.filter((post) => post.feature === 'yes')
    }
        return( 
        <>
        <ul className = {classes.grid}>
            {filteredBlogs.map((post)=> (
                <PostItem key={post._id} post={post} />
            ))}
        </ul>
        </>
    )
}

export default PostsGrid;