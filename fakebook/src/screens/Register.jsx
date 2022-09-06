import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import '../App.css';

import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom'
import { Form, Field } from 'react-final-form';
import { useDispatch } from 'react-redux';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { Password } from 'primereact/password';
import { Dialog } from 'primereact/dialog';
import { Divider } from 'primereact/divider';
import { classNames } from 'primereact/utils';
import { signup } from '../actions/auth'

function Register () {
    const [showMessage, setShowMessage] = useState(false);
    const [formData, setFormData] = useState({});

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const validate = (data) => {
        let errors = {};

        if (!data.first_name) {
            errors.first_name = 'First name is required.';
        }

        if(!data.last_name) {
            errors.last_name = 'Last name is required'
        }

        if (!data.email) {
            errors.email = 'Email is required.';
        }
        else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)) {
            errors.email = 'Invalid email address. E.g. example@email.com';
        }

        if (!data.password) {
            errors.password = 'Password is required.';
        }

        if (data.confirm_password !== data.password) {
            errors.confirm_password = 'Passwords do not match.'
        }

        return errors;
    };

    const onSubmit = (data, form) => {
        setFormData(data);
        dispatch(signup(formData, navigate))    
        setShowMessage(true);

        form.restart();
    };

    const isFormFieldValid = (meta) => !!(meta.touched && meta.error);
    const getFormErrorMessage = (meta) => {
        return isFormFieldValid(meta) && <small className="p-error">{meta.error}</small>;
    };

    const dialogFooter = <div className="flex justify-content-center"><Button label="OK" className="p-button-text" autoFocus onClick={() => setShowMessage(false) } /></div>;
    const passwordHeader = <h6>Pick a password</h6>;
    const passwordFooter = (
        <React.Fragment>
            <Divider />
            <p className="mt-2">Suggestions</p>
            <ul className="pl-2 ml-2 mt-0" style={{ lineHeight: '1.5' }}>
                <li>At least one lowercase</li>
                <li>At least one uppercase</li>
                <li>At least one numeric</li>
                <li>Minimum 8 characters</li>
            </ul>
        </React.Fragment>
    );

    const regRef = useRef()

    const createAccount = () => {
        regRef.current.style.opacity = 1;
        regRef.current.style.pointerEvents = 'auto';
    }

    const closeCreateAccount = () => {
        regRef.current.style.opacity = 0;
        regRef.current.style.pointerEvents = 'none';
    }

    return (
        <div>
            <div ref={regRef} className='register-modal-container'>
                <div className="register-modal">
                    <Dialog visible={showMessage} onHide={() => setShowMessage(false)} position="top" footer={dialogFooter} showHeader={false} breakpoints={{ '960px': '80vw' }} style={{ width: '30vw' }}>
                        <div className="flex align-items-center flex-column pt-6 px-3">
                            <i className="pi pi-check-circle" style={{ fontSize: '5rem', color: 'var(--green-500)' }}></i>
                            <h5>Registration Successful!</h5>
                        </div>
                    </Dialog>

                    <div className="justify-content-center">
                        <div>
                            <Button icon='pi pi-times' className='close p-button-rounded p-button-danger' aria-label='Cancel' onClick={closeCreateAccount}/>
                            <h5 className="text-center">Register</h5>
                            <Form onSubmit={onSubmit} initialValues={{ first_name: '', last_name: '', email: '', password: '', confirm_password: '', date: null, accept: false }} validate={validate} render={({ handleSubmit }) => (
                                <form onSubmit={handleSubmit} className="p-fluid">
                                    <Field name="first_name" render={({ input, meta }) => (
                                        <div className="field">
                                            <span className="p-float-label">
                                                <InputText id="first_name" {...input} autoFocus className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                                                <label htmlFor="first_name" className={classNames({ 'p-error': isFormFieldValid(meta) })}>First Name*</label>
                                            </span>
                                            {getFormErrorMessage(meta)}
                                        </div>
                                    )} />
                                    <Field name="last_name" render={({ input, meta }) => (
                                        <div className="field">
                                            <span className="p-float-label">
                                                <InputText id="last_name" {...input} autoFocus className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                                                <label htmlFor="last_name" className={classNames({ 'p-error': isFormFieldValid(meta) })}>Last Name*</label>
                                            </span>
                                            {getFormErrorMessage(meta)}
                                        </div>
                                    )} />
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
                                                <Password id="password" {...input} toggleMask className={classNames({ 'p-invalid': isFormFieldValid(meta) })} header={passwordHeader} footer={passwordFooter} />
                                                <label htmlFor="password" className={classNames({ 'p-error': isFormFieldValid(meta) })}>Password*</label>
                                            </span>
                                            {getFormErrorMessage(meta)}
                                        </div>
                                    )} />
                                    <Field name="confirm_password" render={({ input, meta }) => (
                                        <div className="field">
                                            <span className="p-float-label">
                                                <Password id="confirm_password" {...input} toggleMask className={classNames({ 'p-invalid': isFormFieldValid(meta) })}   />
                                                <label htmlFor="confirm_password" className={classNames({ 'p-error': isFormFieldValid(meta) })}>Confirm Password*</label>
                                            </span>
                                            {getFormErrorMessage(meta)}
                                        </div>
                                    )} />
                                    <Field name="date" render={({ input }) => (
                                        <div className="field">
                                            <span className="p-float-label">
                                                <Calendar id="date" {...input} dateFormat="dd/mm/yy" mask="99/99/9999" showIcon />
                                                <label htmlFor="date">Birthday</label>
                                            </span>
                                        </div>
                                    )} />    

                                    <Button type="submit" label="Create Account" className="mt-2" />
                                </form>
                            )} />
                        </div>
                    </div>
                </div>
            </div>

            <div className='create-account'>
               <Button type="submit" label="Create An Account" className="p-button-success create-account-button" onClick={createAccount} />
           </div>

        </div>
    );
}

export default Register