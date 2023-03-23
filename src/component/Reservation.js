import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { API } from "aws-amplify";
import './styles/Reservation.css';
import ReservationItemList from "./ReservationItemList";
import Pagination from "./Pagination";
import ReservationAssignedItemList from "./ReservationAssignedItemList";
import SendNotification from "../Services/notification/Notification";

function Reservation () {
    const {param} = useParams();
    const navigate = useNavigate();
    const accountName = localStorage.getItem('name');

    // Reservation Data
    const [firstName,setFirstName] = useState("");
    const [lastName,setLastName] = useState("");
    const [schoolID,setSchoolID] = useState("");
    const [email,setEmail] = useState("");
    const [role,setRole] = useState("");
    const [summary,setSummary] = useState("");
    const [currentDate,setCurrentDate] = useState("");
    const [note,setNote] = useState("");
    const [returnDate,setReturnDate] = useState("");
    const [status,setStatus] = useState('');
    const [reservationno,setReservationNo] = useState('');
    const [approvedBy, setApprovedBy] = useState('');
    const [addApprovedBy, setAddApprovedBy] = useState('');

    const [reservationCart,setReservationCart] = useState([]);

    // Item List
    const [items, setItems] = useState([]);
    const [unfilteredItems, setUnfilteredItems] = useState([]);
    const [assignedItems,setAssignedItems] = useState([]);
    const [returnedItems,setReturnedItems] = useState([]);
    const [itemList,setItemList] = useState([]);
    const [itemListHeader,setItemListHeader] = useState("Assigned Items");

    // Pagination 
    const [currentPage,setCurrentPage] = useState(1);
    const [itemsPerPage,setItemsPerPage] = useState(10);

    useEffect( () => {
        console.log(param);
        API.get("reservationapi","/reservations/object/"+param).then( res => {
            setReservationNo(res.reservationno);
            setFirstName(res.firstname);
            setLastName(res.lastname);
            setSchoolID(res.schoolID);
            setEmail(res.email);
            setRole(res.role);
            setSummary(res.summary);
            setCurrentDate(res.requestdate);
            setNote(res.note);
            setReturnDate(res.returndate);
            setReservationCart(res.itemrequested);
            setAssignedItems(res.assigneditems);
            setStatus (res.status);
            setReturnedItems(res.returneditems);
            setApprovedBy(res.approvedby);

            if (res.assignedItems === undefined) {}
            else if (res.assigneditems.length === 0 && res.status === "Returned") {
                setItemListHeader("Returned Items");
                setItemList(res.returneditems);
            }else{
                setItemList(res.assigneditems);
            }
        })
    },[]);

    useEffect(() => {
        setTimeout(() => {},1000);
        API.get("inventory","/items").then( itemRes => {
            sortItems(itemRes);
        });
    },[reservationCart]);

    useEffect(() => {
        setApprovedBy(accountName);
        AssignItems(assignedItems);
    },[addApprovedBy])

    const sortItems = (items) => {
        const updatedList = items.filter(item => item.location !== "Room");
        var requestedItem;
        var matchRequested = [];
        for(var o = 0; o < reservationCart.length; o++){
            requestedItem = reservationCart[o];
            for(var i = 0; i < updatedList.length; i++){
                if(updatedList[i].type === requestedItem.type){
                    matchRequested.push(updatedList[i]);
                }
            }
        }
        setItems(matchRequested);
        setUnfilteredItems(matchRequested);
    } 
   
    const cancelViewReservation = () => {
        console.log("asdsada");
        navigate('/Reservations');
    }

    const AddItemToLocation = (items,firstName,lastName) => {
        items.map(item => {
            API.put("inventory","/items", {
                body : {
                    name : item.name,
                    type : item.type,
                    model : item.model,
                    status : item.status, 
                    serialno : item.serialno,
                    location : "NA",
                    roomno : "NA",
                    assignedto : firstName + " " + lastName ,
                    assignedate : currentDate,
                    returndate : returnDate,        
                }
            });
        });
    }

    const updateList = (item) => {
        const updatedList = items.filter(itemRes => itemRes.serialno !== item.serialno);
        setItems(updatedList);
        setUnfilteredItems(updatedList);
    } 

    // Pagination

    const idxLastItem = currentPage * itemsPerPage;
    const idxFirstItem = idxLastItem - itemsPerPage;
    const currentList = items.slice(idxFirstItem,idxLastItem);

    const paginate = (pageNumber) => {
        if (pageNumber !== 0 && pageNumber !==  Math.ceil(items.length / itemsPerPage) + 1 ) {

           var obj = document.getElementById(currentPage);
            obj.style.backgroundColor = "#F0F0EB";
            obj.style.color = "#3E2B2E";

            setCurrentPage(pageNumber);

            obj = document.getElementById(pageNumber);
            obj.style.backgroundColor = "#3E2B2E";
            obj.style.color = "#ffffff";
        }
    };

    // Add Item

    const addItem = (item) => {
        // console.log(item);
        console.log(item);
        setAssignedItems([...assignedItems,item]);
        setItemList([...itemList,item]);
        updateList(item);
    }

    const returnItems = (assignedItems) => {
        assignedItems.map( item => {
            API.post("inventory","/items", {
                body : {
                    name : item.name,
                    type : item.type,
                    model : item.model,
                    status : item.status, 
                    serialno : item.serialno,
                    location : "Unassgined",
                    roomno : "N/A",
                }
            });
        })

        API.post("reservationapi","/reservations/", {
            body : {
            firstname :firstName,
            lastname : lastName,
            role : role,
            schoolID : schoolID,
            email : email,
            reservationno : reservationno,
            summary : summary,
            status : "Returned",
            requestby : firstName + " " + lastName,
            approvedby : approvedBy,
            requestdate : currentDate,
            returndate : returnDate,
            itemrequested : reservationCart,
            assigneditems : [],
            returneditems : assignedItems
            }
        });

        // setReturnedItems(assignedItems);
        setStatus("Returned");
        // setItemList(returnedItems);
        setItemListHeader("Returned Items");
        // document.getElementById("assignBtn").disabled = true;
        // document.getElementById("assignBtn").disabled = true;
        setAssignedItems([]);
    }
   
    const AssignItems = (assignedItems) => {
        console.log(approvedBy);
        API.post("reservationapi","/reservations/", {
            body : {
            firstname :firstName,
            lastname : lastName,
            role : role,
            schoolID : schoolID,
            email : email,
            reservationno : reservationno,
            summary : summary,
            status : "Assigned",
            requestby : firstName + " " + lastName,
            approvedby : approvedBy,
            requestdate : currentDate,
            returndate : returnDate,
            itemrequested : reservationCart,
            assigneditems : assignedItems
            }
        });

        AddItemToLocation(assignedItems,firstName,lastName);
        CheckInventory(assignedItems)
        setStatus("Assigned");
        // document.getElementById("assignBtn").disabled = true;

    }

    const CheckInventory = (assignedItems) => {
        let items = new Set();
        
        assignedItems.forEach(item => {
            items.add(item.type)
        });
        console.log(items)
        items.forEach(item => {
            const searchItem = unfilteredItems.filter(item => item.serialno.type().includes(item))
            if (searchItem.length === 0) { 
                // console.log( item + " is out of stock !!!")
                SendNotification("OUT_OF_STOCK",item);              
            }
        });

    }

    const searchUser = (e) => {
        // console.log(e)
        if (e.length === 9) {
            const searchItem = unfilteredItems.filter(item => item.serialno.toLowerCase().includes(e))
                console.log(searchItem.length)
            if (searchItem.length === 1) { 
               addItem(searchItem[0])
               document.getElementById('SearchBarInput').value= " " ;
            }
        }
        else {
            if (e.length > 0) {
                const searcedhItems = unfilteredItems.filter((items) => items.serialno.toLowerCase().includes(e) || 
                                                                items.name.toLowerCase().includes(e) || 
                                                                items.model.toLowerCase().includes(e) || 
                                                                items.type.includes(e));
                setItems(searcedhItems);
            }else{
                setItems(unfilteredItems);
            }
        }
    }  

    // if (status === "Assigned" || status === "Returned") 
    // // document.getElementById("assignBtn").disabled = true;
 
    return (
        <>            
            <Sidebar />
            <Header />
            <div className="ReservationHeader">
                    <div className="fs-4 ms-5 fw-bold">
                        <button onClick={ (e) => cancelViewReservation() } className="PageHeaderBtn">
                            <i className="PageHeaderBtn fa fa-arrow-left ms-2" aria-hidden="true"></i>
                        </button>
                        <label>{reservationno} - {summary}</label> 
                    </div>
                    <div className="searchBar" id="SearchReservation">
                        <input type="email" className="form-control" onChange={ (e)=> { searchUser(e.target.value)} } id="SearchBarInput" placeholder="Search Reservation"/>
                    </div>
            </div>
            <div className="Reservation">
                <div className="ReservationSummary">

                    <div className="OrderList">
                        <div className="row header">
                            <div className="col">
                                 Item Requested
                            </div>
                        </div>
                        {/* Item Requested */}
                        <div className="mb-3 row">
                            <div className="col-sm-10">
                                <ul className="list-group">
                                    <li className="list-group">
                                        <div className="row">
                                            <div className="col">
                                                Type
                                            </div>
                                            <div className="col">
                                                Model
                                            </div>
                                            <div className="col">
                                                Quantity
                                            </div>
                                        </div>
                                    </li>

                                    {reservationCart?.map ( (res,index)=> 
                                    <li className="list-group" key={index}>
                                        <div className="row">
                                            <div className="col">
                                                {res.type}
                                            </div>
                                            <div className="col">
                                                {res.model}
                                            </div>
                                            <div className="col">
                                                {res.quantity}
                                            </div>
                                        </div>
                                    </li>
                                    
                                    )}
                                </ul>
                            </div>
                            
                           
                        </div>
                                        
                        <div className="Assigned-Items">
                            <div className="row header">
                                <div className="col">
                                    {itemListHeader}
                                </div>
                            </div>
                            <div className="row Assigneditemlist">
                                <div className="col">
                                    <ReservationAssignedItemList items={assignedItems} />
                                </div>
                            </div>
                        </div>
                   
                       
                    </div>
                    <div className="UserInfo">
                        <div className="row">
                            <div className="col">
                                <label className="fw-bold form-label">Reservation No</label>
                                <br/>
                                <label className="form-label">{reservationno}</label>
                            </div>
                            <div className="col">
                                <label className="fw-bold form-label">Status</label>
                                <br/>
                                <label className="form-label">{status}</label>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col">
                                <label className="fw-bold form-label">Requested By</label>
                                <br/>
                                <label className="form-label">{firstName + " " + lastName}</label>
                            </div>
                            <div className="col">
                                <label className="fw-bold form-label">Requested Date</label>
                                <br/>
                                <label className="form-label">{currentDate}</label>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col">
                                <label className="fw-bold form-label">School Id</label>
                                <br/>
                                <label className="form-label">{schoolID}</label>
                            </div>
                            <div className="col">
                                <label className="fw-bold form-label">Return Date</label>
                                <br/>
                                <label className="form-label">{returnDate}</label>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col">
                                <label className="fw-bold form-label">Email</label>
                                <br/>
                                <label className="form-label">{email}</label>
                            </div>
                            <div className="col">
                                <label className="fw-bold form-label">Approved By</label>
                                <br/>
                                <label id="approvedBy" className="form-label" value="">{approvedBy.length === 0 ? "N/A" : approvedBy}</label>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col">
                                <label className="fw-bold form-label"></label>
                                <br/>
                                <label className="form-label"></label>
                            </div>
                            <div className="col">
                                <label className="fw-bold form-label"></label>
                                <br/>
                                <button className="btn btn-light" onClick={ (e) => returnItems(assignedItems)}>Return Items</button>
                                <br/>
                                <button className="btn btn-light" id="assignBtn" onClick={ (e) => {setApprovedBy(accountName);setAddApprovedBy(accountName)}}>Assign Items</button>
                            </div>
                        </div>

                    </div>
                </div>

                <div className="ItemList">
                    <ReservationItemList items={currentList} addItem={addItem} status={status} />
                    <div className="Reservation-Pagination">
                    <Pagination
                        PerPage={itemsPerPage} 
                        total={items.length} 
                        paginate={paginate}
                        currentPageLocation = {currentPage}
                        /> 
                    </div>
                
                </div>
            </div>
        </>

    )
}   

export default Reservation;