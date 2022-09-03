import { useRef } from 'react';
import classes from './change-password.module.css';
import { useState, useEffect} from 'react';
import {changePasswordHandler, sendEmail} from '../../lib/helper';
import { useRouter } from 'next/router';

function ChangePassword() {
  const router = useRouter();
  const[formData, setFormData] = useState({email: '', oldPassword: '', newPassword: ''});
  const emailRef = useRef();
  const oldPasswordRef = useRef();
  const newPasswordRef = useRef();

  function submitHandler(event) {
    event.preventDefault();

    const enteredEmail = emailRef.current.value;
    const enteredOldPassword = oldPasswordRef.current.value;
    const enteredNewPassword = newPasswordRef.current.value;
    setFormData({email: enteredEmail, oldPassword: enteredOldPassword, newPassword: enteredNewPassword})
    }
    
    useEffect(() => {
    async function getResult(){
    if(formData.email != '')
        {
            const msg = await changePasswordHandler(formData).then((res) => msg = res.message);
            alert(msg)
            const response = await sendEmail(formData.email)
            alert(response)
            if(msg === 'Password updated!')
            {
                router.push('/auth')
            }
            }
          
            
          }
        getResult();
      }, [formData])


 

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label>Email</label>
        <input id='email' ref={emailRef} />
      </div>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' ref={newPasswordRef} />
      </div>
      <div className={classes.control}>
        <label htmlFor='old-password'>Old Password</label>
        <input type='password' id='old-password' ref={oldPasswordRef} />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ChangePassword;