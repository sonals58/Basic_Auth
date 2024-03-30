import { useState } from "react"
import {useNavigate} from "react-router-dom";
import { useAuth } from "../Store/Auth";


export const Login = () => {

  const [user, setUser]= useState({
    email:"",
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

  const { storetokenInLS}=  useAuth() ;
  const navigate = useNavigate();
  const handleSubmit = async(e)=>{
    e.preventDefault();
    
    console.log(user);
    try{
        const response = await fetch(`http://localhost:5555/api/Auth-router/login`, {
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
        alert("Login Succesful");
        setUser({
        email:"",
        password:"",});
        navigate("/");
    }else{
        alert("Invalid Credential");
        console.log("Invalid Credential");
    }
    console.log(response);
    }
    catch(error){
        console.log("login", error);
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
                        <h1 className="main-heading mb-3">Login form</h1>
                        <br/>
                        <form onSubmit={handleSubmit}>
                            
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
                            <button type="submit" className="btn btn-submit">Login</button>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    </section>

  </>
}

