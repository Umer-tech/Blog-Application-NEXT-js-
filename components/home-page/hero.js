import classes from './hero.module.css';
import Image from 'next/image';
import {getUserbyId} from '../../lib/helper';
import {useState, useEffect} from 'react';
function Hero(props){
    const[username, setUserName] = useState('');
    const[img, setImg] = useState('');
    const {email} = props
    useEffect(()=> {
        const user = async () => {
            const result = await getUserbyId(email)
            const data =await result.results.data
            if(data == null)
            {
                return
            }
            else{
                setImg(data.image)
                setUserName(data.username);
            }

        }
        user()
    },[])
    return (
        <section className = {classes.hero}>
            <div className={classes.image}>
                <img src = {img} alt = "Developer image" height= "300" width="300" />
            </div>
            <h1>Hi, Welcome {username}</h1>
            
        </section>
    )
}

export default Hero;