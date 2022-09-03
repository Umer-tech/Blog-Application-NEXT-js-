import Link from 'next/link';
import Logo from './logo';
import {useSession, signOut} from 'next-auth/react';
import classes from './main-navigationbar.module.css';
function MainNavigation(){
    const{data: session, status} = useSession()
    const handelLogout = () => {
        
        signOut();
    }
    return(
            <header className = {classes.header} >
                <Link href= "/"><a><Logo/></a></Link>
                <nav>
                    <ul>
                        {session && (
                        <li><Link href="/posts/dashboard">Dashboard</Link></li>
                        )}
                        {session && (
                        <li><Link href="/posts">My Posts</Link></li>
                        )}
                        {session && (
                        <li><Link href="/posts/add-blog">Add Blog</Link></li>
                        )}
                        {!session && (
                        <li><Link href="/auth">Sign In/Sign Up</Link></li>
                        )}
                        {session && (
                            <li><button onClick={handelLogout}>Logout</button></li>
                        )}


                    </ul>
                </nav>
            </header>

    )
}

export default MainNavigation;