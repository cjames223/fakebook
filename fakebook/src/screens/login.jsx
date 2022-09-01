import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import '../App.css';
import Reg_Log_Navbar from '../components/reg-log-navbar'
import Register from '../screens/register'

import React, { useState } from 'react';
import { Form, Field } from 'react-final-form';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { Dialog } from 'primereact/dialog';
import { classNames } from 'primereact/utils';
import { Link } from 'react-router-dom'

function Login () {
    const [showMessage, setShowMessage] = useState(false);
    const [formData, setFormData] = useState({});

    const validate = (data) => {
        let errors = {};

        if (!data.email) {
            errors.email = 'Email is required.';
        }
        else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)) {
            errors.email = 'Invalid email address. E.g. example@email.com';
        }

        if (!data.password) {
            errors.password = 'Password is required.';
        }

        return errors;
    };

    const onSubmit = (data, form) => {
        setFormData(data);
        setShowMessage(true);

        form.restart();
    };

    const isFormFieldValid = (meta) => !!(meta.touched && meta.error);
    const getFormErrorMessage = (meta) => {
        return isFormFieldValid(meta) && <small className="p-error">{meta.error}</small>;
    };

    const dialogFooter = <div className="flex justify-content-center"><Button label="OK" className="p-button-text" autoFocus onClick={() => setShowMessage(false) } /></div>;

    

    return (
        <div className='login-container'>
            <div>
                <h1>fakebook</h1>
                <h2>Connect with friends and the world around you with Fakebook.</h2>
            </div>

            <div className="login-form">
                <div className="flex justify-content-center">
                    <div className="login-card">
                        <Form onSubmit={onSubmit} initialValues={{ email: '', password: '' }} validate={validate} render={({ handleSubmit }) => (
                            <form onSubmit={handleSubmit} className="p-fluid">
                                <Field name="email" render={({ input, meta }) => (
                                    <div className="field">
                                        <span className="p-float-label p-input-icon-right">
                                            <i className="pi pi-envelope" />
                                            <InputText id="email" {...input} className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                                            <label htmlFor="email" className={classNames({ 'p-error': isFormFieldValid(meta) })}>Email*</label>
                                        </span>
                                        {getFormErrorMessage(meta)}
                                    </div>
                                )} />
                                <Field name="password" render={({ input, meta }) => (
                                    <div className="field">
                                        <span className="p-float-label">
                                            <Password id="password" {...input} toggleMask className={classNames({ 'p-invalid': isFormFieldValid(meta) })} feedback={false} />
                                            <label htmlFor="password" className={classNames({ 'p-error': isFormFieldValid(meta) })}>Password*</label>
                                        </span>
                                        {getFormErrorMessage(meta)}
                                    </div>
                                )} />

                                <Button type="submit" label="Log In" />
                                <hr className='login-break' />

                            </form>
                        )} />
                    </div>
                </div>

            <Register />
           
           <div className='create-account'>
               <Button type="submit" label="Create An Account" className="p-button-success create-account-button" onClick={<Register opacity={1}/>}/>
           </div>

           </div>
        </div>
    );
}

export default Login