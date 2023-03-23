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

    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    // Reservation Data
    const [firstName,setFirstName] = useState("");
    const [lastName,setLastName] = useState("");
    const [schoolID,setSchoolID] = useState("");
    const [email,setEmail] = useState("");
    const [role,setRole] = useState("");
    const [summary,setSummary] = useState("");
    const [currentDate,setCurrentDate] = useState("");
    const [note,setNote] = useState("");
    const [assignedDate, setAssignedDate] = useState('');
    const [returnDate,setReturnDate] = useState("");
    const [status,setStatus] = useState('');
    const [reservationno,setReservationNo] = useState('');
    const [approvedBy, setApprovedBy] = useState('');
    const [addApprovedBy, setAddApprovedBy] = useState('');
    const [reviewedBy, setReviewedBy] = useState('');
    const [addReviewedBy, setAddReviewedBy] = useState('');
    const [reservationCart,setReservationCart] = useState([]);

    //Addition space for positioning assign and request date and by
    const [assignedSpace, setAssignedSpace] = useState('');
    const [approvedSpace, setApprovedSpace] = useState('');

    // Item List
    const [items, setItems] = useState([]);
    const [unfilteredItems, setUnfilteredItems] = useState([]);
    const [assignedItems,setAssignedItems] = useState([]);
    const [returnedItems,setReturnedItems] = useState([]);
    const [itemList,setItemList] = useState([]);
    const [itemListHeader,setItemListHeader] = useState("Assigned Items");
    const [removeAssignedItem, setRemoveAssignedItem] = useState('');

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
            if(res.assigndate !== undefined){
                setAssignedDate(res.assigndate);
            }
            setReturnDate(res.returndate);
            setReservationCart(res.itemrequested);
            setAssignedItems(res.assigneditems);
            setStatus (res.status);
            setReturnedItems(res.returneditems);
            setApprovedBy(res.approvedby);
            setReviewedBy(res.reviewedby);
            console.log(approvedBy);
            if (res.assignedItems === undefined) {}
            else if (res.assigneditems.length === 0 && res.status === "Returned") {
                setItemListHeader("Returned Items");
                setItemList(res.returneditems);
            }else{
                setItemList(res.assigneditems);
            }
        })
           
    },[]);

    //sorted the item list (right side) base on the item request in reservation cart
    useEffect(() => {
        setTimeout(() => {},1000);
        if(status !== "Returned"){
            API.get("inventory","/items").then( itemRes => {
                sortItems(itemRes);
            });
        }
    },[reservationCart]);

    //Set approved by after clicking assigned button
    useEffect(() => {
        setApprovedBy(accountName);
        if(addApprovedBy.length > 1){
            setAssignedDate(`${year}-${month}-${day}`);
        }
        AssignItems(assignedItems);
    },[addApprovedBy])

    //Set reviewed by after clicking return button
    useEffect(() => {
        if(addReviewedBy === accountName){
            setReviewedBy(accountName);
            returnItems(assignedItems);
        }
    },[addReviewedBy])

    //Change ItemListHeader name and hide assign and retunr button base on reservation status
    useEffect(() => {
        const returnBtn = document.getElementById("returnBtn");
        const assignBtn = document.getElementById("assignBtn");
        if(status != "Open"){
            setItemListHeader(status + " Items");
            if(status == "Assigned"){
                assignBtn.style.display = 'inline';
                returnBtn.style.display = 'inline';
            }else if(status == "Returned"){
                returnBtn.style.display = 'none';
                assignBtn.style.display = 'none';
            }
        }else{
            returnBtn.style.display = 'none';
            assignBtn.style.display = 'inline';
        }
    },[status])

    //Adding additional space to position the return date and review by
    useEffect(() => {
        let additionSpace = '';
        for(let i = 0; i < 21 - assignedDate.length; i++){
            additionSpace += ' ';
        }
        setAssignedSpace(additionSpace);
        additionSpace = '';
        for(let o = 0; o < 21 - approvedBy.length; o++){
            additionSpace += ' ';
        }
        setApprovedSpace(additionSpace);
    },[assignedDate,returnDate])

    //Add the remove item to the unassigned list
    useEffect(() => {
        if(removeAssignedItem !== ''){
            setItems([...items,removeAssignedItem]);
            setUnfilteredItems([...unfilteredItems,removeAssignedItem]);
        }
        setRemoveAssignedItem('');
    },[removeAssignedItem])
    
    //Sort item in the item list
    const sortItems = (items) => {
        const updatedList = items.filter(item => item.location === "Unassigned");
        var requestedItem;
        var matchRequested = [];
        for(var o = 0; o < reservationCart.length; o++){
            requestedItem = reservationCart[o];
            for(var i = 0; i < updatedList.length; i++){//Sort item according to the request type
                if(updatedList[i].type === requestedItem.type){
                    matchRequested.push(updatedList[i]);
                }
            }
        }
        setItems(matchRequested);
        setUnfilteredItems(matchRequested);
    } 
   
    const cancelViewReservation = () => {
        console.log("asbasd");
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
        console.log(item);
        setAssignedItems([...assignedItems,item]);
        setItemList([...itemList,item]);
        updateList(item);
    }
    
    //Removing the item and update the assignedItem list
    const removeItem = (item) => {
        const updateAssignedList = assignedItems.filter((itemRes) => itemRes.serialno !== item.serialno);
        setAssignedItems(updateAssignedList);
        setItemList(updateAssignedList);
        setRemoveAssignedItem(item);
    }

    const returnItems = (assignedItems) => {
        console.log(reviewedBy);
        setAddReviewedBy(accountName);
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
            reviewedby: reviewedBy,
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
            reviewby: reviewedBy,
            requestdate : currentDate,
            assigndate: assignedDate,
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
        let items = []
        assignedItems.forEach(item => {
            items.push(item.type)
        });
        items.forEach(item => {
            const searchItem = unfilteredItems.filter(item => item.serialno.type().includes(item))
            if (searchItem.length === 0) { 
                // console.log( item + " is out of stock !!!")
                SendNotification("OUT_OF_STOCK",item);              
            }
        });

    }


    //Searching item
    const searchItem = (e) => {
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
                                    <ReservationAssignedItemList items={assignedItems} removeItem={removeItem}/>
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
                                <label className="fw-bold form-label">Assign Date&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Return Date</label>
                                <br/>
                                <label className="form-label"><pre>{assignedDate.length === 0 ? "N/A                  " : assignedDate+assignedSpace}{returnDate.length === 0 ? "N/A" : returnDate}</pre></label> {/* 20 */}
                            </div>
                        </div>

                        <div className="row">
                            <div className="col">
                                <label className="fw-bold form-label">Email</label>
                                <br/>
                                <label className="form-label">{email}</label>
                            </div>
                            <div className="col">
                                <label className="fw-bold form-label">Approved By&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Review By</label>
                                <br/>
                                <label id="approvedBy" className="form-label" value=""><pre>{approvedBy.length === 0 ? "N/A                  " : approvedBy+approvedSpace}{reviewedBy === undefined ? "N/A" : reviewedBy}</pre></label>
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
                                <button className="btn btn-light" id="returnBtn" onClick={ (e) => {setReviewedBy(accountName);setAddReviewedBy(accountName);setReturnDate(`${year}-${month}-${day}`)}}>Return Items</button>
                                <br/>
                                <button className="btn btn-light" id="assignBtn" onClick={ (e) => {setApprovedBy(accountName);setAddApprovedBy(accountName);setAssignedDate(`${year}-${month}-${day}`)}}>Assign Items</button>
                            </div>
                        </div>

                    </div>
                </div>

                <div className="ItemList">
                    <ReservationItemList items={currentList} addItem={addItem} status={status} searchItem={searchItem}/>
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