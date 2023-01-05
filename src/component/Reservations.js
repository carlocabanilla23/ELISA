import React, { useEffect, useState } from 'react';
import { API } from 'aws-amplify';
import "./styles/Users.css";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import ReservationList from './ReservationList';
import Pagination from "./Pagination";
import CreateTestReservation from './test/CreateTestReservation';
import iReservations from "./icons/reservation.png";

function Reservations () {
    // CreateTestReservation(50);
    const [reservations, setReservations] = useState([]);
    const [unfilteredReservations, setUnfilteredReservations] = useState([]);
    const [currentPage,setCurrentPage] = useState(1);
    const [reservationsPerPage] = useState(15);


    useEffect( () => {
        API.get("reservationapi","/reservations").then( res => {
            console.log(res);
            setReservations([...reservations,...res]);
            setUnfilteredReservations([...reservations,...res]);
        })

    },[]);

    const navigate = useNavigate();

    const AddUser = e => {
        e.preventDefault();
        navigate('/CreateUser');
    }

    const updateList = (reservationno) => {
        API.del("reservationapi","/reservations/object/"+reservationno);
        const updatedList = reservations.filter(reservation => reservation.reservationno !== reservationno);
        setReservations(updatedList);
        setUnfilteredReservations(updatedList);
    }

    const searchUser = (e) => {
        // if (e.length > 0) {
        //     const searcedhUser = unfilteredUsers.filter((reservation) => reservation.email.toLowerCase().includes(e) || 
        //                                                     reservation.firstname.toLowerCase().includes(e) || 
        //                                                     user.lastname.toLowerCase().includes(e) || 
        //                                                     user.schoolID.includes(e));
        //     setUsers(searcedhUser);
        // }else{
        //     setUsers(unfilteredUsers);
        // }
       
    }

    const makeReservation = () => {
        navigate('/CreateReservation', { 
            state: {
                reservationCount : reservations.length
        }});

       
    }
    
    
    const idxLastReservation = currentPage * reservationsPerPage;
    const idxFirstReservation = idxLastReservation - reservationsPerPage;
    const currentList = reservations.slice(idxFirstReservation,idxLastReservation);

    const paginate = (pageNumber) => {
        if (pageNumber !== 0 && pageNumber !==  Math.ceil(reservations.length / reservationsPerPage) + 1 ) {

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
                    <img src={iReservations} className="headicon" alt="inventory icon" />
                    <i className="fa" aria-hidden="true"> Reservations</i>
                </div>

                <div className="col-sm-5 searchbar">
                    <input type="email" className="form-control" onChange={ (e)=> { searchUser(e.target.value)} } id="exampleFormControlInput1" placeholder="Search Reservation"/>
                </div>

                <div className="col text-end adduser">
                    <button type="submit" className="btn" id="AddUser" onClick={makeReservation}>Make a Reservation</button>
                </div>

                <div className="col auto dropdown">
                
                </div>
            </div>
        </div>

        <div className="UserPane">
                <ReservationList reservations={currentList} updateList={updateList}/>
                <Pagination
                    PerPage={reservationsPerPage} 
                    total={reservations.length} 
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

export default Reservations;