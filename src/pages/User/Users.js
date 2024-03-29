import React, { useEffect, useState } from 'react';
import { API } from 'aws-amplify';
import "../../assets/styles/Users.css";
import { useNavigate, useParams } from "react-router-dom";
import UserList from "../../component/List/UserList";
import Pagination from "../../component/secondMainComponents/Pagination";
import OffCanvasCardUser from '../../component/card/OffCanvasCardUser';
import { csv } from '../../Services/Export/csv';
import { pdf } from '../../Services/Export/pdf';

function Users () {
    const {param} = useParams();
    // Init();
    const [users, setUsers] = useState([]);
    const [unfilteredUsers, setUnfilteredUsers] = useState([]);
    const [currentPage,setCurrentPage] = useState(1);
    const [usersPerPage] = useState(15);

    const [schoolID,setSchoolID] = useState(true);
    const [firstname,setFirstName] = useState(true);
    const [lastname,setLastName] = useState(true);
    const [role,setRole] = useState(true);
    const [email,setEmail] = useState(true);
    const [phone,setPhone] = useState(true);
    const [status,setStatus] = useState(true);

    // Offcanvas
    const [offCanvasUser, setOffCanvasUser] = useState('');
    // const [activityHistory, setActivityHistory] = useState([]);
    const [actionName, setActionName] = useState('');
    const [refreshvalue, setRefreshValue] = useState('');

    const [deleteEmail, setDeleteEmail] = useState('');

    const setConfirmForm = document.getElementById("deleteConfirmForm");

    useEffect( () => {
        API.get("userapi","/email").then( res => {
            res.sort((a,b) => {
                var tA = Number.parseInt(a.schoolID);
                var tB = Number.parseInt(b.schoolID);
                if(isNaN(tA) && isNaN(tB)){
                    return a.roomno.localeCompare(b.schoolID);
                }else if(isNaN(tA)){
                    return -1;
                }else if(isNaN(tB)){
                    return 1;
                }else{
                    return Math.sign(tA - tB);
                }
            });
            if (param !== undefined) {
                const updatedList = res.filter(user => user.email === param);
                setUsers([...users,...updatedList]);
                setUnfilteredUsers([...users,...updatedList]);
            }else {
                setUsers([...users,...res]);
                setUnfilteredUsers([...users,...res]);
            }
        })
        console.log(param);
    },[]);

    const navigate = useNavigate();

    const AddUser = e => {
        e.preventDefault();
        navigate('/CreateUser');
    }

    const updateList = () => {
        API.del("userapi","/email/object/"+deleteEmail);
        const updatedList = users.filter(user => user.email !== deleteEmail);
        const curPage = currentPage;
        if(updatedList.length % usersPerPage === 0 && curPage > 1){
            paginate(curPage - 1);
        }
        setUsers(updatedList);
        setUnfilteredUsers(updatedList);

        setDeleteEmail('');
        setConfirmForm.style.display = "none";
    }

    const cancelDelete = (e) => {
        setDeleteEmail('');
        setConfirmForm.style.display = "none";
    }

    const deleteConfirm = (email) => {
        setDeleteEmail(email);
        setConfirmForm.style.display = "block";
    }

    // View User Information in OffCanvas
    const ViewInformation = (user) => {
        setOffCanvasUser(user);
        setActionName("User Information");
        document.getElementById("user-info").style.display = "block";
        document.getElementById("changeRole").style.display = "none";
        document.getElementById("changeStatus").style.display = "none";
    }

    // Change user Role in OffCanvas
    const changeRole = (user) => {
        setRefreshValue(Math.random());
        setOffCanvasUser(user);
        setActionName("Change Role");
        document.getElementById("user-info").style.display = "none";
        document.getElementById("changeRole").style.display = "block";
        document.getElementById("changeStatus").style.display = "none";
    }

    // Change user Status in OffCanvas
    const changeStatus = (user) => {
        setRefreshValue(Math.random());
        setOffCanvasUser(user);
        setActionName("Change Status");
        document.getElementById("user-info").style.display = "none";
        document.getElementById("changeRole").style.display = "none";
        document.getElementById("changeStatus").style.display = "block";
    }

    const searchUser = (e) => {
        if (e.length > 0) {
            const searcedhUser = unfilteredUsers.filter((user) => user.email.toLowerCase().includes(e) ||
                                                            user.firstname.toLowerCase().includes(e) ||
                                                            user.lastname.toLowerCase().includes(e) ||
                                                            user.schoolID.includes(e));
                                                            // user.status.includes(e));
            if(searcedhUser.length < unfilteredUsers.length){
                paginate(1);
            }
            setUsers(searcedhUser);
        }else{
            setUsers(unfilteredUsers);
        }
    }

    // code to generate the CSV file and download it to the local machine
    const CSV = () => {
        csv(users, "Users", []);
    }

    const PDF = () => {     // Exporting to pdf
        pdf(users, "Users", []);
    }

    const idxLastUser = currentPage * usersPerPage;
    const idxFirstUser = idxLastUser - usersPerPage;
    const currentList = users.slice(idxFirstUser,idxLastUser);

    const paginate = (pageNumber) => {
        if (pageNumber !== 0 && pageNumber !==  Math.ceil(users.length / usersPerPage) + 1 ) {

           var obj = document.getElementById(currentPage);
            obj.style.backgroundColor = "#F0F0EB";
            obj.style.color = "#3E2B2E";

            setCurrentPage(pageNumber);

            obj = document.getElementById(pageNumber);
            obj.style.backgroundColor = "#3E2B2E";
            obj.style.color = "#ffffff";
        }
    };

    const reset = (title) => {
        title === 'schoolID' ? setSchoolID(!schoolID) : setSchoolID(true);
        title === 'firstname' ? setFirstName(!firstname) : setFirstName(true);
        title === 'lastname' ? setLastName(!lastname) : setLastName(true);
        title === 'role' ? setRole(!role) : setRole(true);
        title === 'email' ? setEmail(!email) : setEmail(true);
        title === 'phone' ? setPhone(!phone) : setPhone(true);
        title === 'status' ? setStatus(!status) : setStatus(true);
    }

    const ResortedList = (title, filtered) => {
        let curList = users;
        curList.sort((a,b) => {
            var tA = Number.parseInt(a.title);
            var tB = Number.parseInt(b.title);
            if(isNaN(tA) && isNaN(tB)){
                if(title === 'schoolID'){
                    return a.schoolID.localeCompare(b.schoolID);
                }else if(title === 'firstname'){
                    return a.firstname.localeCompare(b.firstname);
                }else if(title === 'lastname'){
                    return a.lastname.localeCompare(b.lastname);
                }else if(title === 'role'){
                    return a.role.localeCompare(b.role);
                }else if(title === 'email'){
                    return a.email.localeCompare(b.email);
                }else if(title === 'phone'){
                    return a.phone.localeCompare(b.phone);
                }else{
                    return a.status.localeCompare(b.status);
                }
            }else if(isNaN(tA)){
                return -1;
            }else if(isNaN(tB)){
                return 1;
            }else{
                return Math.sign(tA - tB);
            }
        });
        if(filtered){
            setUsers([...curList]);
            setUnfilteredUsers([...curList]);
        }else{
            curList = curList.reverse();
            setUsers([...curList]);
            setUnfilteredUsers([...curList]);
        }
    }

    return (
    <div className="Users">
        <div className="UserHeader">
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,1,0" />
            <div className="content">
                <div>
                    <span className="material-symbols-outlined">group</span>
                    <span>Users</span>

                <div className="searchBar">
                    <input type="email" className="form-control" onChange={ (e)=> { searchUser(e.target.value)} } id="exampleFormControlInput1" placeholder="Search User"/>
                </div>

                <div className="AddUser">
                    <button type="submit" className="btn" id="AddUser" onClick={AddUser}>Add User</button>
                </div>

                <div className="col-auto-dropdown">
                    <div className="dropdown">
                        <button className="btn btn-secondary dropdown-toggle"
                            type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Export
                        </button>
                        <ul className="exports dropdown-menu">
                        <li><button className="dropdown-item" onClick={CSV} >CSV</button></li>
                        <li><button className="dropdown-item" onClick={PDF} >PDF</button></li>
                        </ul>
                    </div>
                </div>
            </div>
            </div>
        </div>

        <div className="UserPane">
            <div className="deleteConfirmationForm" id="deleteConfirmForm" style={{"display": "none"}}>
                <div className="FormHeader">
                    Do you want to delete {deleteEmail}?
                </div>
                <div className="confirmDeleteBtn">
                    <button className="btn btn-secondary" type="button" onClick={cancelDelete}>Cancel</button>
                    <button className="btn btn-secondary" id="confirmBtn" type="submit" onClick={updateList}>Confirm</button>
                </div>
            </div>
            <div className="UserRowTitle">
                <div className="container-fluid">
                    <div className="row">
                            <div className="col" onClick={e => {ResortedList('schoolID',schoolID);reset('schoolID')}} style={{'cursor': 'pointer'}}> School ID </div>
                            <div className="col" onClick={e => {ResortedList('firstname',firstname);reset('firstname')}} style={{'cursor': 'pointer'}}> First Name </div>
                            <div className="col" onClick={e => {ResortedList('lastname',lastname);reset('lastname')}} style={{'cursor': 'pointer'}}> LastName </div>
                            <div className="col" onClick={e => {ResortedList('role',role);reset('role')}} style={{'cursor': 'pointer'}}> Role </div>
                            <div className="col" onClick={e => {ResortedList('email',email);reset('email')}} style={{'cursor': 'pointer'}}> Email </div>
                            <div className="col" onClick={e => {ResortedList('phone',phone);reset('phone')}} style={{'cursor': 'pointer'}}> Phone </div>
                            <div className="col" onClick={e => {ResortedList('status',status);reset('status')}} style={{'cursor': 'pointer'}}> Status </div>
                            <div className="col"> Actions</div>
                    </div>
                </div>
            </div>
                <UserList
                    users={currentList}
                    updateList={updateList}
                    ViewInformation={ViewInformation}
                    // ViewHistory={ViewHistory}
                    changeRole={changeRole}
                    changeStatus={changeStatus}
                    ResortedList={ResortedList}
                    deleteConfirm={deleteConfirm} />
                <Pagination
                    PerPage={usersPerPage}
                    total={users.length}
                    paginate={paginate}
                    currentPageLocation = {currentPage}
                    />
        </div>

        {/* OffCanvas */}
        <OffCanvasCardUser user={offCanvasUser} actionName={actionName} refreshvalue={refreshvalue}/>
    </div>
    )
}

export default Users;