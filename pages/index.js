import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import Router, { withRouter } from 'next/router'
import FeaturedPosts from '../components/home-page/featured-posts';
import Head from 'next/head';

    
    // import '../assets/styles.scss';

    const HomePage = (props) => {
        const [isLoading, setLoading] = useState(false); //State for the loading indicator
        const startLoading = () => setLoading(true);
        const stopLoading = () => setLoading(false);
    
    		/*
    			Posts fetching happens after page navigation, 
    			so we need to switch Loading state on Router events.
    		*/
        useEffect(() => { //After the component is mounted set router event handlers
            Router.events.on('routeChangeStart', startLoading); 
            Router.events.on('routeChangeComplete', stopLoading);
    
            return () => {
                Router.events.off('routeChangeStart', startLoading);
                Router.events.off('routeChangeComplete', stopLoading);
            }
        }, [])
    
    		//When new page selected in paggination, we take current path and query parrams.
    		// Then add or modify page parram and then navigate to the new route.
        const pagginationHandler = (page) => {
            const currentPath = props.router.pathname;
            const currentQuery = props.router.query;
            currentQuery.page = page.selected + 1;
    
            props.router.push({
                pathname: currentPath,
                query: currentQuery,
            });
    
        };
        	//Conditional rendering of the posts list or loading indicator
            let content = null;
            if (isLoading)
                content = <div>Loading...</div>;
            else {
                        //Generating posts list
                content = (
                   <FeaturedPosts posts = {props.posts}/>
                );
            }
            return (
                <>
                <Head>
                <title>The Blog Appication</title>
                </Head>
                <div className="container">
                    <div className="posts">
                        {content}
                    </div>
        
                    <ReactPaginate style = "float : left"
                        previousLabel={'previous'}
                        nextLabel={'next'}
                        breakLabel={'...'}
                        breakClassName={'break-me'}
                        activeClassName={'active'}
                        containerClassName={'pagination'}
                        subContainerClassName={'pages pagination'}
                        itemClass="page-item"
                        inkClass="page-link"
        
                        initialPage={props.currentPage - 1}
                        pageCount={props.pageCount + 1}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={5}
                        onPageChange={pagginationHandler}
                    />
                </div>
                </>

            );
        };
        HomePage.getInitialProps = async ({ query }) => {
            const page = query.page || 1; //if page empty we request the first page
            const posts = await axios.get(`http://localhost:3000/api/blog?page=${page}`);
            return {
                totalCount: posts.data.totalCount,
                pageCount:Math.floor(posts.data.totalCount/10),
                currentPage: page,
                perPage: 10,
                posts: posts.data.data,
            };
        }
        
        
        export default withRouter(HomePage);