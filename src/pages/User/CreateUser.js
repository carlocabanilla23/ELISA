import { Amplify, API } from "aws-amplify";
import "../../assets/styles/CreateUser.css";
import React from "react";
import awsExport from '../../aws-exports';
import { useNavigate } from 'react-router-dom';

Amplify.configure(awsExport);

function CreateUser() {
    const [firstName,setFirstName] = React.useState('');
    const [lastName,setLastName] = React.useState('');
    const [role,setRole] = React.useState('Role');
    const [schoolID,setSchoolID] = React.useState('');
    const [email,setEmail] = React.useState('');
    const [phone,setPhone] = React.useState('');

    /*
        These useState is for checking the uniqueness of the input information
        Error represents error type, and useEffect will display corresponding error message based on the error type
    */
    const [users, setUsers] = React.useState([]);
    const [error, setError] = React.useState('');
    const [errorMessage, setErrorMessage] = React.useState('');

    const navigate = useNavigate();

    //Convert the error to errorMessage and display them to the users
    React.useEffect(() => {
        if(error === '1'){
            setErrorMessage('Email and schoolID are already exist');
        }else if(error === '2'){
            setErrorMessage('Email is already exist');
        }else if(error === '3'){
            setErrorMessage('schoolID is already exist');
        }else if(error === '4'){
            setErrorMessage('Please choose a role');
        }
    }, [error])

    React.useEffect(() => {
        API.get("userapi", "/email").then(res => {
            setUsers([...users,...res]);
        })
        setError('');
        setErrorMessage('');
    }, []);

    const AddUser = (e) => {
        e.preventDefault();
        console.log(users);
        for(var i = 0; i < users.length; i++){
            if(users[i].email === email && users[i].schoolID === schoolID){
                throw new Error(setError('1'));
            }else if (users[i].email === email){
                throw new Error(setError('2'));
            }else if(users[i].schoolID === schoolID){
                throw new Error(setError('3'));
            }
        }
        if(role === 'Role'){
            throw new Error(setError('4'));
        }

        // Add new user to the database
        API.post("userapi","/email/", {
            body : {
            firstname : firstName,
            lastname : lastName,
            role : role,
            schoolID : schoolID,
            email : email,
            phone : phone,
            status : "inactive",
            }
        });

        API.post("notificationapi","/sid/", {
            body : {
               sid : schoolID,
               newitem : false,
               newmember : false,
               outofstock : false,
               reservationrequest : false,
               email : email,
               emailnotification : false
            }
        });

        API.post("useraccounts","/email/",{
            body:{
                email:email,
                password:''
            }
        });

        let id = crypto.randomUUID();
        e.preventDefault();
        API.post("emailsystem","/email/send", {
            body : {
            email : email,
            message: "Click here to reset your password \n \n https://dev.djno0p84ctg6u.amplifyapp.com/SetNewPassword/"+email
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

    const cancelEdit = () => {
        navigate('/Users');
    }

    const ShowAlert = () => {
        var alert = document.getElementById("alert");
        alert.style.display = "block";
        setTimeout( () =>{
             navigate("/Users");
        },1500);
    }

    return (
        <>
            <div className="alert alert-success" id="alert" role="alert">
                The user has been created successfully!
            </div>

            {/* Previous Page Navigation Bar */}
            <div className="UserHeader">
                    <div className="content">
                        <div>
                            <button onClick={cancelEdit} className="PageHeaderBtn"><i className="PageHeaderBtn fa fa-arrow-left ms-2" aria-hidden="true"></i></button>
                            <label>Create User</label>
                        </div>
                    </div>
            </div>
            <div className="CreateUserForm">
                <form onSubmit={AddUser}>
                    {/* First Name */}
                    <div className = "mb-3 row">
                        <label  for = "inputFirstName"
                                className = "col-sm-2 col-form-label">
                                First Name
                        </label>
                        <div className = "col-sm-10">
                        <input  type = "text"
                                className = "form-control"
                                value = {firstName}
                                onChange = {(e) => {setFirstName(e.target.value)}}
                                id="inputFirstName"
                                required={true} />
                        </div>
                    </div>
                    {/* Last Name */}
                    <div className="mb-3 row">
                        <label  for="inputLastName"
                                className="col-sm-2 col-form-label">
                                Last Name
                        </label>
                        <div className="col-sm-10">
                        <input  type="text"
                                className="form-control"
                                value = {lastName}
                                onChange = {(e) => {setLastName(e.target.value)}}
                                id="inputLastName"
                                required={true} />
                        </div>
                    </div>
                    {/* Role */}
                    <div className="mb-3 row">
                        <label  for="inputRole"
                                className="col-sm-2 col-form-label">
                                Role
                        </label>
                        <div className="col-sm-10">
                            <div className="dropdown">
                                <button
                                    className="btn btn-light dropdown-toggle"
                                    type="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false">
                                    {role}
                                </button>
                                <ul className="dropdown-menu">
                                    <li>
                                        <button type="button" className="dropdown-item" onClick={(e) => setRole("Student")}>
                                            Student
                                        </button>
                                    </li>
                                    <li>
                                        <button type="button" className="dropdown-item" onClick={(e) => setRole("TA")}>
                                            TA
                                        </button>
                                    </li>
                                    <li>
                                        <button type="button" className="dropdown-item" onClick={(e) => setRole("Professor")}>
                                            Professor
                                        </button>
                                    </li>
                                </ul>
                                </div>
                            </div>
                    </div>
                    {/* School ID */}
                    <div className="mb-3 row">
                        <label for = "inputSchoolID" className = "col-sm-2 col-form-label">School ID</label>
                        <div className = "col-sm-10">
                            <input type = "text"
                            className = "form-control"
                            value = {schoolID}
                            onChange = {(e) => {
                                setSchoolID(e.target.value);
                                setErrorMessage('');
                                setError('');
                                e.target.validity.patternMismatch || e.target.value === '' ? e.target.setCustomValidity('schoolID must be 9 digits and unique') : e.target.setCustomValidity('')
                            }}
                            id="schoolID"
                            required={true}
                            pattern='^([0-9]{9})$'
                            onInvalid={e => e.target.setCustomValidity('schoolID must be 9 digits and unique')} />
                        </div>
                    </div>
                    {/* Email */}
                    <div className="mb-3 row">
                        <label for = "inputEmail" className = "col-sm-2 col-form-label">Email</label>
                        <div className = "col-sm-10">
                            <input type = "text"
                            className = "form-control"
                            value = {email}
                            onChange = {(e) => {
                                setEmail(e.target.value.toLowerCase());
                                setErrorMessage('');
                                setError('');
                                e.target.validity.patternMismatch || e.target.value === '' ? e.target.setCustomValidity('Email must end with @spu.edu and unique') : e.target.setCustomValidity('')
                            }}
                            id = "inputEmail"
                            required={true}
                            pattern='^([a-z0-9]{1,})@spu\.edu$'
                            onInvalid={(event) => {event.target.setCustomValidity('Email must end with @spu.edu and unique')}} />
                        </div>
                    </div>
                    {/* Phone */}
                    <div className = "mb-3 row">
                        <label for= "inputPhone" className = "col-sm-2 col-form-label">Phone</label>
                        <div className = "col-sm-10">
                            <input type = "text"
                            className = "form-control"
                            value = {phone}
                            onChange = {(e) => {
                                setPhone(e.target.value);
                                setErrorMessage('');
                                setError('');
                                e.target.validity.patternMismatch || e.target.value === '' ? e.target.setCustomValidity('Phone number must have 10 digits: #########') : e.target.setCustomValidity('')
                            }}
                            id = "inputPhone"
                            required={true}
                            pattern='^([0-9]{10})$'
                            onInvalid={(event) => {event.target.setCustomValidity('Phone number must have 10 digits: #########')}} />
                        </div>
                    </div>
                    {/* Submit Button */}
                    <div className="form-buttons">
                        <button type="button" onClick={cancelEdit} className="btn btn-primary">Cancel</button>
                        <button type="submit" className="btn btn-primary">Create</button>
                        <span className="errorMessage">{errorMessage}</span>
                    </div>
                </form>
            </div>
        </>
    );
}

export default CreateUser;