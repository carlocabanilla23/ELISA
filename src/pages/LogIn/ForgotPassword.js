import {API, Amplify} from 'aws-amplify';
import awsExport from '../../aws-exports';
import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import '../../assets/styles/ForgotPassword.css'

Amplify.configure(awsExport)

function ForgotPassword(){
    const [email,setEmail] = useState('');

    const navigate = useNavigate();

    const cancelForgotPassword = e => {
        navigate('/');
    }

    const resetPassword = (e) => {
        let id = crypto.randomUUID();
        e.preventDefault();
        API.post("emailsystem","/email/send", {
            body : {
            email : email,
            message: "Click here to reset your password \n \n https://dev.djno0p84ctg6u.amplifyapp.com/ResetPassword/"+email
            }
        });

        API.post("emailsystem","/email", {
            body : {
            id : id,
            email : email
            }
        });
        ShowAlert();
    }

    const ShowAlert = () => {
        var alert = document.getElementById("alert");
        alert.style.display = "block";
        setTimeout(() => {
            navigate('/');
        }, 1500);
    }

    return(
        <div className="Body">
            <div className="alert alert-success" id="alert" role="alert">
                Reset password link has been sent to your email
            </div>
            <div className="ForgotPassword-Form">
                <div className="FormHeader">
                    <h1>Forgot Your Password?</h1>
                </div>
                <form onSubmit={resetPassword}>
                    <div className="row">
                        <p className="col">Please enter your account's email address and click "Submit" button. You will receive an email that contain a link to reset your password</p>
                    </div>
                    {/* Email */}
                    <div className="row">
                        <div className="col">
                            <label for = "inputEmail" className = "col-form-label"><strong>Email</strong></label>
                            <div className = "col-sm-9">
                                <input type = "text"
                                className = "email email-inputBox"
                                value = {email}
                                onChange = {(e) => {
                                    setEmail(e.target.value);
                                    e.target.validity.patternMismatch || e.target.value === '' ? e.target.setCustomValidity('Email must end with @spu.edu and unique') : e.target.setCustomValidity('')
                                }}
                                id = "inputEmail"
                                required={true}
                                pattern='^([a-zA-Z0-9]{1,})@spu\.edu$'
                                />
                    </div>   
                        </div>
                    </div>
                    <br />
                    <div className="form-buttons">
                        <button type="button" onClick={cancelForgotPassword} className="btn btn-primary">Cancel</button>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ForgotPassword;