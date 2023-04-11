import React, { useEffect, useState } from 'react';
import { API } from 'aws-amplify';
import "../../assets/styles/Users.css";
import { useNavigate } from "react-router-dom";
import ReservationList from '../../component/List/ReservationList';
import Pagination from "../../component/Pagination";

function Reservations () {
    // CreateTestReservation(50);
    const [reservations, setReservations] = useState([]);
    // const [unfilteredReservations, setUnfilteredReservations] = useState([]);
    const [currentPage,setCurrentPage] = useState(1);
    const [reservationsPerPage] = useState(10);

    const loggedUser = decodeURIComponent(escape(window.atob(localStorage.getItem('email'))));
    const access = localStorage.getItem('access');


    useEffect( () => {
        if (access === "Student") {
            API.get("reservation","/reservation/"+ loggedUser).then( res => {

                let sorted = [];
                let openList = [];
                let assignedList = []
                let returnList = []
                for(let i = 0; i < res.length; i++){
                    if(res[i].status === "Open"){
                        openList.push(res[i]);
                    }else if(res[i].status === "Assigned"){
                        assignedList.push(res[i]);
                    }else{
                        returnList.push(res[i]);
                    }
                }
                openList.sort((a,b) => {
                    if(a.requestdate.split('-').at(2) !== b.requestdate.split('-').at(2)){
                        return b.requestdate.split('-').at(2) - a.requestdate.split('-').at(2);
                    }else{
                        if(a.requestdate.split('-').at(1) !== b.requestdate.split('-').at(1)){
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
                // setUnfilteredReservations([...reservations,...sorted]);
            })

        } else {
            API.get("reservation","/reservation").then( res => {
                let sorted = [];
                let openList = [];
                let assignedList = []
                let returnList = []
                for(let i = 0; i < res.length; i++){
                    if(res[i].status === "Open"){
                        openList.push(res[i]);
                    }else if(res[i].status === "Assigned"){
                        assignedList.push(res[i]);
                    }else{
                        returnList.push(res[i]);
                    }
                }
                openList.sort((a,b) => {
                    if(a.requestdate.split('-').at(2) !== b.requestdate.split('-').at(2)){
                        return b.requestdate.split('-').at(2) - a.requestdate.split('-').at(2);
                    }else{
                        if(a.requestdate.split('-').at(1) !== b.requestdate.split('-').at(1)){
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
                // setUnfilteredReservations([...reservations,...sorted]);
            })
        }   
    },[]);

    const sortedDate = (list) => {
        list.sort((a,b) => {
            if(a.requestdate.split('-').at(2) !== b.requestdate.split('-').at(2)){
                return b.requestdate.split('-').at(2) - a.requestdate.split('-').at(2);
            }else{
                if(a.requestdate.split('-').at(1) !== b.requestdate.split('-').at(1)){
                    return b.requestdate.split('-').at(1) - a.requestdate.split('-').at(1);
                }else{
                    return b.requestdate.split('-').at(0) - a.requestdate.split('-').at(0);
                }
            }
        });
        return list;
    }

    const navigate = useNavigate();

    const updateList = (reservationno) => {
        API.del("reservation","/reservations/object/"+reservationno);
        const updatedList = reservations.filter(reservation => reservation.reservationno !== reservationno);
        setReservations(updatedList);
        // setUnfilteredReservations(updatedList);
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

    const ResortedList = (title, filtered) => {
        let curList = reservations;
        if(title === 'returndate'){
            curList.sort((a,b) => {
                if(a.returndate.split('-').at(0) !== b.returndate.split('-').at(0)){
                    return b.returndate.split('-').at(0) - a.returndate.split('-').at(0);
                }else{
                    if(a.returndate.split('-').at(1) !== b.returndate.split('-').at(1)){
                        return b.returndate.split('-').at(1) - a.returndate.split('-').at(1);
                    }else{
                        return b.returndate.split('-').at(2) - a.returndate.split('-').at(2);
                    }
                }
            })
        }else if(title === 'requestdate'){
            curList.sort((a,b) => {
                if(a.requestdate.split('-').at(2) !== b.requestdate.split('-').at(2)){
                    return b.requestdate.split('-').at(2) - a.requestdate.split('-').at(2);
                }else{
                    if(a.requestdate.split('-').at(1) !== b.requestdate.split('-').at(1)){
                        return b.requestdate.split('-').at(1) - a.requestdate.split('-').at(1);
                    }else{
                        return b.requestdate.split('-').at(0) - a.requestdate.split('-').at(0);
                    }
                }
            })
        }else {
            curList.sort((a,b) => {
                var tA = Number.parseInt(a.title);
                var tB = Number.parseInt(b.title);
                if(isNaN(tA) && isNaN(tB)){
                    if(title === 'reservationno'){
                        if(a.reservationno.length > b.reservationno.length){
                            return 1;
                        }else if(a.reservationno.length < b.reservationno.length){
                            return -1;
                        }else{
                            return a.reservationno.localeCompare(b.reservationno);
                        }
                    }else if(title === 'summary'){
                        if(a.summary.length > b.summary.length){
                            return 1;
                        }else if(a.summary.length < b.summary.length){
                            return -1;
                        }else{
                            return a.summary.localeCompare(b.summary);
                        }
                    }else if(title === 'status'){
                        if(a.status.length > b.status.length){
                            return 1;
                        }else if(a.status.length < b.status.length){
                            return -1;
                        }else{
                            return a.status.localeCompare(b.status);
                        }
                    }else if(title === 'requestby'){
                        if(a.requestby.length > b.requestby.length){
                            return 1;
                        }else if(a.requestby.length < b.requestby.length){
                            return -1;
                        }else{
                            return a.requestby.localeCompare(b.requestby);
                        }
                    }else if(title === 'approvedby'){
                        if(a.approvedby.length > b.approvedby.length){
                            return 1;
                        }else if(a.approvedby.length < b.approvedby.length){
                            return -1;
                        }else{
                            return a.approvedby.localeCompare(b.approvedby);
                        }
                    }
                }else if(isNaN(tA)){
                    return -1;
                }else if(isNaN(tB)){
                    return 1;
                }else{
                    return Math.sign(tA - tB);
                }
            });
        }
        if(filtered){
            setReservations([...curList]);
        }else{
            curList = curList.reverse();
            setReservations([...curList]);
        }
    }

    return (
    <div className="Users">
        
        
        <div className="UserHeader">
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,1,0" />
            <div className="content">
                <div>
                    <span className="material-symbols-outlined">receipt_long</span>
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
                <ReservationList reservations={currentList} updateList={updateList} ResortedList={ResortedList}/>
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