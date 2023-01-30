import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login(props) {
    
    const navigate = useNavigate();

    const handleSubmit = async event => {
        event.preventDefault();

        let username = event.target.username.value;
        let password = event.target.password.value;
        let stringToEncode = `${username}:${password}`

        let myHeaders = new Headers();
        myHeaders.append('Authorization', `Basic ${btoa(stringToEncode)}`)
        myHeaders.append('content-Type', 'application/json')

        let response = await fetch("https://responsible-knowledgeable-restaurant.glitch.me/auth/token", {
            method: "Post",
            headers: myHeaders
        })

        if (response.ok){
            let data = await response.json();

            let token = data.token;
            let expiration = data.token_expiration;

            localStorage.setItem('token', token);
            localStorage.setItem('tokeExp', expiration);

            props.flashMessage('You have successfully logged in', 'success');
            props.logUserIn();
            navigate('/');
        } else {
            props.flashMessage('Your username and/or password are incorrect', 'danger')
        }


    }
  
    return (
    <>
            <h3 className="text-center">Login</h3>
            <form action="" onSubmit={handleSubmit}>
                <div className="form-group">
                    <input type="text" className="form-control my-3" placeholder='Enter Username' name='username' />
                    <input type="password" className="form-control my-3" placeholder='Enter Password' name='password' />

                    <input type="submit" value="Log In" className="btn btn-success w-100" />
                </div>
            </form>
        </>
  )
}
