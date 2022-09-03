import Hero from "../../components/home-page/hero";
import {useState, useEffect} from 'react';
import {getSession} from 'next-auth/react'
function Dashboard()
{
  const [uemail, setuEmail] = useState('');

  useEffect(() => {
    getSession().then((session) => {
      if (!session) {
        window.location.href = '/auth';
      } 
    });
  }, []);

  
    async function Session() {
        const session =await getSession();
        if(session != null){
        async function gettingSession () {
             const email= await getSession().then(res =>  email =res.user.email);
             return  setuEmail({uemail : email })
        }
        gettingSession();
            }
        else {}

        }
        if(uemail === '')
        {
          Session();
          return(
            <h1 align ="center">Loading...</h1>
          )
        }
        else{

    return(
        <>
          <Hero email = {uemail.uemail}/>
        </>
        )
        }
}
export default Dashboard;