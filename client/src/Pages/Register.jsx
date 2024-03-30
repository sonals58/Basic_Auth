import { useState } from "react"
import {useNavigate} from "react-router-dom";
import { useAuth } from "../Store/Auth";

export const Register = () => {

    const [user, setUser]= useState({
        username:"",
        email:"",
        phone:"",
        password:"",
    });
    

   const handleInput =(e) =>{
        console.log(e);
        let name=e.target.name;
        let value=e.target.value;

        setUser({
            ...user,
            [name]:value,
        })
   };

   const navigate = useNavigate();
   const { storetokenInLS}=  useAuth() ; 

   const handleSubmit = async(e)=>{
    e.preventDefault();
    alert(user);
    console.log(user);
    try{
        const response = await fetch(`http://localhost:5555/api/Auth-router/register`, {
        method:"POST",
        headers:{
            'Content-Type':'application/json',
        },
        body:JSON.stringify(user)
    });
    if(response.ok){
        const res_data =await response.json();
        console.log("response from server",res_data);
        //stored token in local storage
        storetokenInLS(res_data.token);
        setUser({username:"",
        email:"",
        phone:"",
        password:"",});
        navigate("/login");
    }
    console.log(response);
    }
    catch(error){
        console.log("register", error);
    }
    
   };

  return <>
    <section>
        <main>
            <div className="section-registration">
                <div className="container grid grid-two-cols">
                    <div className="registration-image">
                        <img src="/images/img1.jpg" alt="" width="500" height="500"/>
                    </div>
                    <div className="registeration-form">
                        <h1 className="main-heading mb-3">registration form</h1>
                        <br/>
                        <form onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="username">username</label>
                                <input 
                                type="text" 
                                name="username"
                                placeholder="Enter your username"
                                id="username"
                                required
                                autoComplete="off"
                                value={user.username}
                                onChange={handleInput}
                                />
                            </div>
                            <div>
                                <label htmlFor="email">email</label>
                                <input 
                                type="email" 
                                name="email"
                                placeholder="Enter your email"
                                id="email" 
                                required
                                autoComplete="off"
                                value={user.email}
                                onChange={handleInput}
                                />
                            </div>
                            <div>
                                <label htmlFor="phone">phone</label>
                                <input 
                                type="number" 
                                name="phone"
                                placeholder="Enter your phone"
                                id="phone" 
                                required
                                autoComplete="off"
                                value={user.phone}
                                onChange={handleInput}
                                />
                            </div>
                            <div>
                                <label htmlFor="password">password</label>
                                <input 
                                type="password" 
                                name="password"
                                placeholder="Enter your password"
                                id="password" 
                                required
                                autoComplete="off"
                                value={user.password}
                                onChange={handleInput}
                                />
                            </div>
                            <br/>
                            <button type="submit" className="btn btn-submit">Register Now</button>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    </section>
  </>
}

