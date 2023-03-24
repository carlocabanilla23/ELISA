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
    const [reservationsPerPage] = useState(10);


    useEffect( () => {
        API.get("reservation","/reservation").then( res => {
            // console.log(res);
            let sorted = [];
            let openList = [];
            let assignedList = []
            let returnList = []
            for(let i = 0; i < res.length; i++){
                if(res[i].status == "Open"){
                    openList.push(res[i]);
                }else if(res[i].status == "Assigned"){
                    assignedList.push(res[i]);
                }else{
                    returnList.push(res[i]);
                }
            }
            // list.sort((a,b) => {
            //     var tA = Number.parseInt(a.requestdate);
            //     var tB = Number.parseInt(b.requestdate);
            //     if(isNaN(tA) && isNaN(tB)){
            //         return a.reservationno.localeCompare(b.requestdate);
            //     }else if(isNaN(tA)){
            //         return -1;
            //     }else if(isNaN(tB)){
            //         return 1;
            //     }else{
            //         return Math.sign(tA - tB);
            //     }
            // });
            openList.sort((a,b) => {
                if(a.requestdate.split('-').at(2) != b.requestdate.split('-').at(2)){
                    return b.requestdate.split('-').at(2) - a.requestdate.split('-').at(2);
                }else{
                    if(a.requestdate.split('-').at(1) != b.requestdate.split('-').at(1)){
                        return b.requestdate.split('-').at(1) - a.requestdate.split('-').at(1);
                    }else{
                        return b.requestdate.split('-').at(0) - a.requestdate.split('-').at(0);
                    }
                }
            });
            
            sorted.push.apply(sorted, sortedDate(openList));
            sorted.push.apply(sorted, sortedDate(assignedList));
            sorted.push.apply(sorted, sortedDate(returnList));
            setReservations([...reservations,...sorted]);
            setUnfilteredReservations([...reservations,...sorted]);
        })
    },[]);

    const sortedDate = (list) => {
        list.sort((a,b) => {
            if(a.requestdate.split('-').at(2) != b.requestdate.split('-').at(2)){
                return b.requestdate.split('-').at(2) - a.requestdate.split('-').at(2);
            }else{
                if(a.requestdate.split('-').at(1) != b.requestdate.split('-').at(1)){
                    return b.requestdate.split('-').at(1) - a.requestdate.split('-').at(1);
                }else{
                    return b.requestdate.split('-').at(0) - a.requestdate.split('-').at(0);
                }
            }
        });
        return list;
    }

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
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,1,0" />
            <div className="content">
                <div>
                    <span class="material-symbols-outlined">receipt_long</span>
                    <span>Reservations</span>
                
                <div className="searchBar">
                    <input type="email" className="form-control" onChange={ (e)=> { searchUser(e.target.value)} } id="exampleFormControlInput1" placeholder="Search Reservation"/>
                </div>

                <div className="reserve">
                    <button type="submit" className="btn" id="AddUser" onClick={makeReservation}>Make a Reservation</button>
                </div>
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