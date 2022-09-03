import Link from 'next/link';
import { Image } from 'cloudinary-react';
import classes from './post-item.module.css';
function PostItem(props){
    const {_id,title, image, excerpt, date} = props.post;
    const imagepath = image;
    const linkpath = `./posts/${_id}`;
    return(
        <li className = {classes.post}>
            <Link href = {linkpath}>
                <a>
                    <div className = {classes.image}>
                        <Image cloudName = 'dbxfuumf1' publicId= {imagepath} alt = "Title" width = "400" height = "200"/>
                    </div>
                    <div className = {classes.content}>
                        <h3>{title}</h3>
                        <p>{date}</p>
                        <p>{excerpt}</p>
                    </div>
                </a>
            </Link>
        </li>
    )
}  

export default PostItem;