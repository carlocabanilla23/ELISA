import UserCard from "./UserCard";
import React, { useEffect, useState } from 'react';
import { API } from 'aws-amplify';
import "./styles/Users.css";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import UserList from "./UserList";
import CreateTestUser from "./test/CreateTestUser";
import Pagination from "./Pagination";

function Users () {
    // CreateTestUser(50);
    const [users, setUsers] = useState([]);
    const [unfilteredUsers, setUnfilteredUsers] = useState([]);
    const [currentPage,setCurrentPage] = useState(1);
    const [usersPerPage] = useState(8);

    const navigate = useNavigate();

    const AddUser = e => {
        e.preventDefault();
        navigate('/CreateUser');
    }

    useEffect( () => {
      API.get("userapi","/email").then( res => {
            setUsers([...users,...res]);
            setUnfilteredUsers([...users,...res]);
        })
        
    },[]);

    const updateList = (email) => {
        API.del("userapi","/email/object/"+email);
        const updatedList = users.filter(user => user.email !== email);
        setUsers(updatedList);
        setUnfilteredUsers(updatedList);
    }

    const searchUser = (e) => {
        if (e.length > 0) {
            const searcedhUser = unfilteredUsers.filter((user) => user.email.toLowerCase().includes(e) || 
                                                            user.firstname.toLowerCase().includes(e) || 
                                                            user.lastname.toLowerCase().includes(e) || 
                                                            user.schoolID.includes(e));
            setUsers(searcedhUser);
        }else{
            setUsers(unfilteredUsers);
        }
       
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

    return (
    <div className="Users">
        <Sidebar />
        <Header />
        <div className="UserHeader">

            <div className="row">
                <div className="col fs-4 ms-5 fw-bold"> 
                    <i className="fa fa-users" aria-hidden="true"> Users</i>
                </div>

                <div className="col-sm-5 searchbar">
                    <input type="email" className="form-control" onChange={ (e)=> { searchUser(e.target.value)} } id="exampleFormControlInput1" placeholder="Search User"/>
                </div>

                <div className="col text-end adduser">
                    <button type="submit" className="btn" id="AddUser" onClick={AddUser}>Add User</button>
                </div>

                <div className="col auto dropdown">
                    <div className="dropdown">
                        <button className="btn dropdown-toggle"
                            type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Export
                        </button>
                        <ul className="dropdown-menu">
                            <li><a className="dropdown-item" href="#">CSV</a></li>
                            <li><a className="dropdown-item" href="#">PDF</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

        <div className="UserPane">
            <div className="UserRowTitle">
                <div className="container">
                    <div className="row">
                            <div className="col"> School ID </div>
                            <div className="col"> First Name </div>
                            <div className="col"> LastName </div>
                            <div className="col"> Role </div>
                            <div className="col"> Email </div>
                            <div className="col"> Phone </div>
                            <div className="col"> Status </div>
                            <div className="col"> Actions</div>        
                    </div>
                </div>
            </div>
                <UserList users={currentList} updateList={updateList}/>
                <Pagination
                    usersPerPage={usersPerPage} 
                    totalUsers={users.length} 
                    paginate={paginate}
                    currentPageLocation = {currentPage}
                    /> 
        </div>
        {/* <div className="right-sidemenu">
            aa

        </div> */}
    </div>    
    
    )
}

export default Users;