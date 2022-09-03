import { useState, useRef } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import{createUser, sendEmail} from '../../lib/helper'
import classes from './auth-form.module.css';
import Link from 'next/link';


function AuthForm() {

  var [user, setUser] = useState({email: '', password: '', username: '', image: 'afda'})
  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter();

  function switchAuthModeHandler() {
    setIsLogin((prevState) => !prevState);
  }
  function handelUserInfo(e){
    setUser({...user, [e.target.name] : e.target.value})
  }

  function handleOnChange(changeEvent) {
    const reader = new FileReader();
        // reader.onload = function(onLoadEvent) {
        //     setImageSrc(onLoadEvent.target.result);
        //     setUploadData(undefined);
        //   }
          reader.readAsDataURL(changeEvent.target.files[0]);
  }
  async function submitHandler(event) {

    event.preventDefault();
        // Added validation

        if (isLogin) {
          const result = await signIn('credentials', {
            redirect: false,
            email: user.email,
            password: user.password,
          });
          ///////////////

          if (!result.error) {
            // set some auth state
            router.replace('/posts/dashboard');
            await sendEmail(user.email);
          }
          else{
            if(result.error === 'Invalid Password')
              {
                await sendEmail(user.email);
              }
            alert(result.error)
          }
        } else {
          try {
                const form = event.currentTarget;
                const fileInput = Array.from(form.elements).find(({ name }) => name === 'file');
                const formData = new FormData();

                for ( const file of fileInput.files ) {
                    formData.append('file', file);
                }

                formData.append('upload_preset', 'Blog-Images');
                const data = await fetch('https://api.cloudinary.com/v1_1/dbxfuumf1/image/upload', {
                method: 'POST',
                body: formData
                }).then(r => r.json());
                setUser({...user, image: data.secure_url });
          } catch (error) {
            alert(error);
          }
          alert('Saved!')
        }
  }
  async function Submit(){
            const result = await createUser(user.email, user.password, user.username, user.image);
            alert(result.message);
  }

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required name = 'email' value = {user.email}  onChange = {handelUserInfo} />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input type='password' id='password' name = 'password' value = {user.password}  required onChange = {handelUserInfo}/>
        </div>
         {isLogin ? '' : <div className={classes.control}>
          <label >User Name</label>
          <input type='text' id='username' required name = 'username' value = {user.username}  onChange = {handelUserInfo} />
        </div>}
        {isLogin ? '': <div className={classes.control}>
          <label >Profile Pic</label>
          <input type='file' name='file' required  onChange={handleOnChange}/>
        </div>}
        <div className={classes.actions}>
          <button>{isLogin ? 'Login' : 'Save'}</button>
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
          {isLogin ? <Link href = '/change-password'><label>Reset Password!</label></Link>: ''}
        </div>
      </form>
      {isLogin ? '' :<button className={classes.toggle} onClick={Submit}>All OK Submit</button>}
    </section>
  );
}

export default AuthForm;