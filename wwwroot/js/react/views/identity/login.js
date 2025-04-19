import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

import Lnk from '../../shared/buttons/lnk';
import Login from '../../models/login';

import {
    Api_Identity_Login
} from '../../links';

export default function LoginContent(props) {
    let navigate = useNavigate();
    let location = useLocation();

    let [login, setLogin] = useState(new Login());

    const loginOnClick = () => {
        axios
        .post(Api_Identity_Login(), login)
        .then(function (response) {
            var returnUrl = new URLSearchParams(location.search).get('ReturnUrl') ?? '/';
            //navigate(returnUrl); // todo update nav bar after logging in
            window.location.href = returnUrl;
        });
    }

    const updateEmail = (event) => {
        const l = {...login};
        l.email = event.target.value;
        setLogin(l);
    }

    const updatePassword = (event) => {
        const l = {...login};
        l.password = event.target.value;
        setLogin(l);
    }

    return  <div>
                <div className='l-login'>
                    <span className='title'>Log in</span>
                    <div className='email'>
                        <label>Email</label>
                        <input onChange={(event)=>(updateEmail(event))} type='text' autoComplete="email" aria-required="true" placeholder="Email"/>
                    </div>
                    <div className='password'>
                        <label>Password</label>
                        <input onChange={(event)=>(updatePassword(event))} type='password' autoComplete="password" aria-required="true" placeholder="Password"/>
                    </div>
                    <div className='login'>
                        <Lnk onClick={loginOnClick} text='Log in' isBtn={true}/>
                    </div>
                    <div className='lnks'>
                        <a href='/Identity/Account/ForgotPassword' className='l-lnk'>Forgot your password?</a>
                        <a href='/Identity/Account/Register' className='l-lnk'>Register as a new user</a>
                        <a href='/Identity/Account/ResendEmailConfirmation' className='l-lnk'>Resend email confirmation</a>
                    </div>
                </div>
            </div>;
}