import classes from './post-header.module.css';
import { Image } from 'cloudinary-react';
function PostHeader(props){
    const {title, image} = props;
    return(
        <header className= {classes.header}>
            <h1>{title}</h1>
            <Image cloudName = 'dbxfuumf1' publicId= {image} alt = "Blog Image" width = "400" height = "200"/>
        </header>
    )
}
export default PostHeader;