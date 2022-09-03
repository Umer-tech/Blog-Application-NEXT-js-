const BASE_URL = "http://localhost:3000/"
export const getBlogs = async () => {
    return fetch(`${Base_URL}api/blog`)
    .then((response) => { 
        return response.json().then((data) => {
            return data;
        }).catch((err) => {
            console.log(err);
        }) 
    });


}

// single Blog
export const getBlogbyId = async (blogId) => {
    const response = await fetch(`${BASE_URL}api/blog/${blogId}`);
    const result = await response.json();
    return {
        results: {
            data: result
        }
    }
        

}

// posting a new blog
export async function addBlog(formData){
    try{
        const Options = {
            method : 'POST',
            headers : { 'Content-Type': "application/json"},
            body: JSON.stringify(formData)
        }
        
        const response = await fetch(`${BASE_URL}api/blog`, Options)
        const json = await response.json()

        return json;
    }catch(error){
        return error;
    }
}


// Update a new blog
export async function updateBlog(blogId, formData){
    const Options = {
        method : 'PUT',
        headers : { 'Content-Type': "application/json"},
        body: JSON.stringify(formData)
    }

    const response = await fetch(`${BASE_URL}api/blog/${blogId}`, Options)
    const json = await response.json()
    return json;
}
// Delete a new blog
export async function deleteBlog(blogId){
    const Options = {
        method : 'DELETE',
        headers : { 'Content-Type': "application/json"},
    }

    const response = await fetch(`${BASE_URL}api/blog/${blogId}`, Options)
    const json = await response.json()
    return json;
}

//Sending the API request to create user account 
export async function createUser(email, password, username, imageSrc) {
    const response = await fetch('/api/auth/signup', {
      method: 'POST',
      body: JSON.stringify({ email, password, username, imageSrc }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  
    const data = await response.json();
  
    if (!response.ok) {
      throw new Error(data.message || 'Something went wrong!');
    }
  
    return data;
  }

  //Get Singel User
export const getUserbyId = async (email) => {
    const response = await fetch(`${BASE_URL}api/user/${email}`);
    const result = await response.json();
    return {
        results: {
            data: result
        }
    }

}
      
export async function sendEmail(formData){
    try{
        const Options = {
            method : 'POST',
            headers : { 'Content-Type': "application/json"},
            body: JSON.stringify(formData)
        }
        
        const response = await fetch(`${BASE_URL}api/contact`, Options)
        return 'Email Send';
    }catch(error){
        return error;
    }
}
export async function changePasswordHandler(passwordData) {
    const response = await fetch('/api/user/change-password', {
      method: 'PATCH',
      body: JSON.stringify(passwordData),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();
    return data;
  }