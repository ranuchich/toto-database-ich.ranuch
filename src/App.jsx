import { useState } from 'react'
import logo from '/logo.png'
import './App.css'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { useAuth } from './Auth/authContext';


function App() {
  const [email, setEmail] = useState('');
  const [isErrorEmail, setIsErrorEmail] = useState(false);
  const [password, setPassword] = useState('');
  const [isErrorPassword, setIsErrorPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  let navigate = useNavigate();

  const { user, login, logout } = useAuth();  

  // If user already logged in, redirect to dashboard
  if (user) {
    return <Navigate to="/dashboard" replace/>;
  }

  const handleEmail = (e) => {
        setEmail(e.target.value);
        if(e.target.value == ''){
            setIsErrorEmail(true);
        } else {
            setIsErrorEmail(false);
        }
    }
    
    const handlePassword = (e) => {
        setPassword(e.target.value);
        if(e.target.value == ''){
            setIsErrorPassword(true);
        } else {
            setIsErrorPassword(false);
        }
    }

    const handleLogin = () => {
        if(email && password){
            setIsLoading(true);
            const datas = {
                "email": email,
                "password": password,
            };
            axios.post('https://api-todolist.e-khmer.com/api/login', datas).then((res) => {
                if(res?.data?.success){
                    login({ user: res?.data?.user, token: res?.data?.token });
                    navigate('/dashboard');
                }
                setIsLoading(false)
            }).catch((err) => {
                console.log("Error", err);
                setIsLoading(false);
            });
        }   
    }

  return (
    <>
      <div class="container mt-3">
        <center>  
          <img src={logo} className='logo' />
        </center>
  <h2>LOGIN</h2>
  <form action="/action_page.php">
    <div class="mb-3 mt-3">
     <label for="email"><span className='text-danger'>*</span> Email:</label>
      <input onChange={handleEmail}
        value={email}
        type="email" 
        className="form-control" 
        id="email" 
        placeholder="Ex: banana@example.com" 
        name="email"/>
      {isErrorEmail &&
        <p className='text-danger small'>
            This email is required
        </p>
      }
    </div>
    <div className="mb-3">
      <label For="pwd"><span className='text-danger'>*</span> Password:</label>
      <input onChange={handlePassword}
        value={password}
        type="password" 
        className="form-control" 
        id="pwd" 
        placeholder="password" 
        name="pswd"/>
    {isErrorPassword &&
        <p className='text-danger small'>
            This password is required
        </p>
    }
  </div>

    <div class="d-grid">
    <button 
      disabled={isLoading} 
      onClick={()=> handleLogin()} 
      type="button" 
      class="btn btn-primary btn-block">
        {isLoading &&  <i class="fa fa-refresh fa-spin"></i>} Login
    </button>
  </div>
  </form>
  <p>You don't have any account! please <Link to ='/register'>Register</Link></p>
    </div>
     </>
  )
}

export default App