import loginImg from '../assets/images/bg-login.png';
import classes from './Login.module.css';
import { postData } from '../utilities/HttpMethods';
import { useState } from 'react';
import Loader from '../UI/Loader';

function Login(props) {
    const [loginError, setError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const validateUser = async (event) => {
        try {
            event.preventDefault();
            setIsLoading(true);
            const userData = {
                username: event.target.username.value,
                password: event.target.password.value,
            };
            await postData('https://foodbukka.herokuapp.com/api/v1/auth/login', userData);
            setError(false);
            setIsLoading(false);
            props.onLogin();
        } 
        catch (error) {
            setIsLoading(false);
            setError(true);
        }
    }
    if (isLoading) {
        return (
          <Loader />
        );
    }
    

    return (
        <div className="container">
          <section className={classes['login-wrap']}>
            <img src={loginImg} alt = "Login"/>
            <form name="loginForm" className={classes['login-form']} onSubmit={validateUser}>
                <h1>Sign In</h1>
                <div className="mb-3">
                    <label className="form-label">User Name</label>
                    <input id="username" type="text" name="username" className="form-control" required/>
                </div>
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input id="password" type="password" name="password" className="form-control" required/>
                </div>
                <input type="submit" value="Login" className={classes['submit-btn']} />
                { loginError ? <div className={classes['login-error']}>Please provide a valid username and password</div> : null }
            </form>  
          </section>
        </div>
    )
}
export default Login;
