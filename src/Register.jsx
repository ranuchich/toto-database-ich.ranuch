import { Link, useNavigate } from 'react-router-dom';
import logo from '/logo.png'
import axios from 'axios';
import { useState } from 'react';

function RegisterPage () {
    const [name, setName] = useState('');
    const [isErrorName, setIsErrorName] = useState(false);
    const [email, setEmail] = useState('');
    const [isErrorEmail, setIsErrorEmail] = useState(false);
    const [password, setPassword] = useState('');
    const [isErrorPassword, setIsErrorPassword] = useState(false);
    const [isErrorEmailDup, setIsErrorEmailDup] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [age, setAge] = useState('');
    let navigate = useNavigate();

    const handleRegister = () => {
        if(name && email && password){
            setIsLoading(true);
            const datas = {
                "email": email,
                "password": password,
                "name": name,
            };
            axios.post('https://api-todolist.e-khmer.com/api/register', datas).then((res) => {
                if(res?.data?.success){
                    navigate('/');
                } else {
                    setIsErrorEmailDup(true);
                }
                setIsLoading(false);
            }).catch((err) => {
                console.log("Error", err);
                setIsLoading(false);
            });
        }   
    }

    const handleName = (e) => {
        setName(e.target.value);
        setIsErrorName(e.target.value.length < 3);
    }

    const handleEmail = (e) => {
        setEmail(e.target.value);
        setIsErrorEmail(e.target.value.length === 0);
    }

    const handlePassword = (e) => {
        setPassword(e.target.value);
        setIsErrorPassword(e.target.value.length === 0);
    }

    const handleAge = (e) => {
        if(e.target.value && e.target.value.length > 2) return;
        setAge(e.target.value);   
    }

    return (
         <>
            <div className="container mt-3">
            <center>
                <img src={logo} className='logo' alt="logo"/>
            </center>
            <h2>Register</h2>
            <form action="#">
                <div className="mb-3 mt-3">
                <label htmlFor="name"><span className='text-danger'>*</span>Name:</label>
                <input onChange={handleName}
                    value={name}
                    type="text" 
                    className="form-control" 
                    id="name" 
                    placeholder="Ex: Jonh" 
                    name="name"/>
            {isErrorName &&
                <p className='text-danger small'>
                  This name is required
                </p>
            }
        </div>  
        <div className="mb-3 mt-3">
            <label htmlFor="email"><span className='text-danger'>*</span> Email:</label>
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
            {isErrorEmailDup &&
                <p className='text-danger small'>
                    This email is already taken
                </p>
            }
        </div>
        <div className="mb-3">
            <label htmlFor="password"><span className='text-danger'>*</span> Password:</label>
            <input onChange={handlePassword}
                value={password}
                type="password" 
                className="form-control" 
                id="password" 
                placeholder="password" 
                name="password"/>
            {isErrorPassword &&
                <p className='text-danger small'>
                    This password is required
                </p>
            }
        </div>
        <div className="mb-3 mt-3">
            <label htmlFor="age"><span className='text-danger'>*</span> Age:</label>
            <input onChange={handleAge}
                value={age}
                type="text" 
                className="form-control" 
                id="age" 
                placeholder="Ex: 30" 
                name="age"/>
        </div>
        <div className="d-grid">
            <button 
                disabled={isLoading}
                type="button" 
                className="btn btn-primary" 
                onClick={handleRegister}
            >    
                {isLoading && <i className="fa-solid fa-spinner fa-spin"></i>}
                Register
            </button>
        </div>
        </form>
        <p className='mt-4'>If you have any account! Please <Link to='/'>Login</Link></p>
    </div>
    </>
    )
}

export default RegisterPage;