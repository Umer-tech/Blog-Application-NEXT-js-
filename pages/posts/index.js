import AllPosts from '../../components/posts/all-posts';
import {useState, useEffect} from 'react';
import {getSession} from 'next-auth/react'
import Head from 'next/head';
export async function getServerSideProps(){
    const response = await fetch('http://localhost:3000/api/blog/all-blogs',{
        method:"GET",
      });
    const result = await response.json();
    return {
        props: {
            data: result
        }
        
    }
}

function AllPostsPage(props){
    const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getSession().then((session) => {
      if (!session) {
        window.location.href = '/auth';
      } else {
        setIsLoading(false);
      }
    });
  }, []);

  if (isLoading) {
    return <p align = "center">Loading...</p>;
  }
    return(
        <>
        <Head>
          <title>My Posts</title>
        </Head>
        <AllPosts posts = {props.data}/>
        </>
    )
}

export default AllPostsPage;