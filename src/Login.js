import React,{useState,useContext,useEffect} from 'react'
import { useNavigate } from "react-router-dom";
import Axios from 'axios';
import Navbar from './Navbar';
import { LoginContext } from './Context';
// let login_status=''

function Login() {
    let navigate = useNavigate();
    let [username,set_username]=useState('')
    let [password,set_password]=useState('')
    let [all_users,set_all_users]=useState('')
    const {loggedin,set_logged_in}=useContext(LoginContext)

    useEffect(()=>{Axios.get('http://localhost:3005/get_user_info')
    .then((response)=>{
        set_all_users(response.data)
    })},[])

    const handleLogin=()=>{
        // set_logged_in('data entry')
        all_users.map((user)=>{
            if(username==user.username && password==user.password){
                set_logged_in({user_type:user.user_type,username:user.username})
                navigate('/')
            }
        })
    }
    return (
        <div className='login_container'>
            <div className='login'>
                <div className='username'>
                    <label>Username :</label>
                    <input type='text' onChange={(e)=>{set_username(e.target.value)}}/>
                </div>
                <div className='password'>
                    <label>Password :</label>
                    <input type='password' onChange={(e)=>{set_password(e.target.value)}}/>
                </div>
                <div className='login_button'>
                    <button onClick={handleLogin}>Login</button>
                </div>
            </div>
        </div>
    )
}

export default Login;