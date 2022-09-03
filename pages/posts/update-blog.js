import {updateBlog, getBlogbyId} from './../../lib/helper';
import {useState, useEffect} from 'react';
import {getSession} from 'next-auth/react';
import Link from 'next/link';
function UpdateBlog(props){
  const [isLoading, setIsLoading] = useState(true);
  const [blog, setBlogDetails] = useState({title:'', image:'', excerpt:'', date:'',slug:'', content:'', uemail: '', feature: ''});


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
  async function Session() {
  const session =await getSession();
  if(session.user != null){
  async function gettingSession () {
       const email= await getSession().then(res =>  email =res.user.email);
       return  setBlogDetails({...blog, uemail : email })
  }
  gettingSession();
      }
  }
  if(blog.uemail === '')
  {
  Session();
  }

  function changeBlogDetails(e){
      
      setBlogDetails({...blog, [e.target.name]: e.target.value});
  }
  function handleOnChange(changeEvent) {
      const reader = new FileReader();
      // reader.onload = function(onLoadEvent) {
      //     setImageSrc(onLoadEvent.target.result);
      //     setUploadData(undefined);
      //   }
        reader.readAsDataURL(changeEvent.target.files[0]);


  }
  
  async function handleOnSubmit(event) {
      event.preventDefault();
      
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
     
      setBlogDetails({...blog, image: data.secure_url });
      alert("Saved")
  }
  function Submit() {
      updateBlog(props.id, blog)
      console.log(blog.image)
      return alert('Blog Updated!!!')
  }
  return(
      <div style = {{marginLeft: "30px"}} align = "center">
          <h1>Create a new Blog</h1>

          <form  onSubmit={handleOnSubmit}>
              <label><b>Title:</b></label> <br/>
                  <input style={{width: "70%", height: "30px"}} type="text" name="title" value={blog.title}
                  onChange={changeBlogDetails}/>
              <br/><br/>
              
              <label><b>Image:</b></label>
                  <input type="file" name="file" onChange={handleOnChange}/>
              <br/><br/>
              <label><b>excerpt:</b> </label><br/>
                  <input style={{width: "70%", height: "30px"}} type="text" name="excerpt" value={blog.excerpt}
                  onChange={changeBlogDetails}/>
              <br/>
              <label><b>Date:</b></label><br/> 
                  <input style={{width: "70%", height: "30px"}} type="text" name="date" value={blog.date}
                  onChange={changeBlogDetails}/>
              <br/><br/>
              <label><b>Feature Blog:</b></label>
                  <input type="radio" name="feature" value= "yes" 
                  onChange={changeBlogDetails}/> Yes
                  <input type="radio" name="feature" value= "no" 
                  onChange={changeBlogDetails}/> No <br/>
              <br/>
              <label><b>Content:</b> </label><br/>
                  <textarea style={{width: "70%", height: "200px"}} type="text" name="content" value={blog.content}
                  onChange={changeBlogDetails}/>
              <br/>
          <button>Save</button>
          </form>
          <button onClick = {Submit}>All Ok Submit</button>
      </div>
      
  )
}

export default UpdateBlog;