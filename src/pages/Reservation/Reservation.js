import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { API } from "aws-amplify";
import '../../assets/styles/Reservation.css';
import ReservationItemList from "../../component/List/ReservationItemList";
import Pagination from "../../component/Pagination";
import ReservationAssignedItemList from "../../component/List/ReservationAssignedItemList";
import SendNotification from "../../Services/notification/Notification";

function Reservation () {
    const {param,param1,param2} = useParams();
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
    const [summary,setSummary] = useState("");
    const [currentDate,setCurrentDate] = useState("");
    const [note,setNote] = useState("");
    const [assignedDate, setAssignedDate] = useState('');
    const [returnDate,setReturnDate] = useState("");
    const [status,setStatus] = useState('');
    const [reservationno,setReservationNo] = useState('');
    const [approvedBy, setApprovedBy] = useState('');
    const [reviewedBy, setReviewedBy] = useState('');
    const [reservationCart,setReservationCart] = useState([]);

    // Item List
    const [items, setItems] = useState([]);
    const [unfilteredItems, setUnfilteredItems] = useState([]);
    const [assignedItems,setAssignedItems] = useState([]);
    const [itemList,setItemList] = useState([]);
    const [itemListHeader,setItemListHeader] = useState("Assigned Items");

    // Pagination 
    const [currentPage,setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    useEffect( () => {
        API.get("reservation","/reservation/object/"+param+"/"+param1).then( res => {
            setReservationNo(res.reservationno);
            setEmail(res.email);
            setSummary(res.summary);
            setCurrentDate(res.requestdate);
            setReturnDate(res.returndate);
            setStatus (res.status);
            setApprovedBy(res.approvedby);
            if(res.assigndate !== undefined){
                setAssignedDate(res.assigndate);
            }
            if(res.reviewedby !== undefined){
                setReviewedBy(res.reviewedby);
            }
        })

        API.get("reservationcart","/cart/object/"+param1).then( res => {
            setNote(res.note);


            if(param2 !== "Returned") {
                let itm = [...new Set(res.itemrequested.map( item => item.type))]
                let list = [];
                itm.forEach( e => {
                    API.get("items","/items/" +e).then( res => {
                        list.push(...res);
                        sortItems(list);
                    });
                });
            }
            setReservationCart(res.itemrequested);
            setAssignedItems(res.assigneditems);

            if (res.assignedItems === undefined) {}
            else if (res.assigneditems.length === 0 && status === "Returned") {
                setItemListHeader("Returned Items");
                setItemList(res.returneditems);
            }else{
                setItemList(res.assigneditems);
            }
            
            if (itemList.length > 0) {
                let element = document.getElementsByClassName("assignedItemListHeader");
                element.style.display = 'block';
            }

            if (assignedItems.length !== 0 || assignedItems !== undefined) {
                var element = document.getElementsByClassName("assignedItemListRemoveBtn");
                var i;
                for (i = 0; i < element.length; i++) {
                    element[i].style.display = 'none';
                }
            }
        })


        API.get("userapi","/email/object/"+param).then( res => {
            setFirstName(res.firstname);
            setLastName(res.lastname);
            setSchoolID(res.schoolID);
        })
        },[]);
    
    // Sort item in the item list
    const sortItems = (items) => {
        console.log(items)
        const updatedList = items.filter(item => item.location === "Unassigned" || "Room");
        setItems(updatedList);
        setUnfilteredItems(updatedList);
    } 
   
    const cancelViewReservation = () => {
        navigate('/Reservations');
    }

    const AddItemToLocation = (items,firstName,lastName) => {
        items.forEach(item => {
            API.put("items","/items", {
                body : {
                    name : item.name,
                    type : item.type,
                    model : item.model,
                    status : item.status, 
                    serialno : item.serialno,
                    location : "USER",
                    roomno : "USER",
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
            obj.style.color = "#ffffff";
        }
    };

    // Add Item
    const addItem = (item) => {
        setAssignedItems([...assignedItems,item]);
        setItemList([...itemList,item]);
        updateList(item);
    }
    
    //Removing the item and update the assignedItem list
    const removeItem = (item) => {
        const updateAssignedList = assignedItems.filter((itemRes) => itemRes.serialno !== item.serialno);
        setAssignedItems(updateAssignedList);
        setItemList(updateAssignedList);
    }

    const returnItems = (assignedItems) => {
        assignedItems.forEach( item => {
            API.post("items","/items", {
                body : {
                    name : item.name,
                    type : item.type,
                    model : item.model,
                    status : item.status, 
                    serialno : item.serialno,
                    location : "Unassigned",
                    roomno : "Unassigned",
                }
            });
        })

        API.put("reservation","/reservation/", {
            body : {
            email : email,
            reservationno : reservationno,
            summary : summary,
            status : "Returned",
            requestby : firstName + " " + lastName,
            assigndate : assignedDate,
            approvedby : approvedBy,
            reviewedby: reviewedBy,
            requestdate : currentDate,
            returndate : returnDate,
            }
        });

        API.put("reservationcart","/cart", {
            body : {
            reservationno : reservationno,
            description : note,
            itemrequested : reservationCart,
            assigneditems : assignedItems,
            returneditems : assignedItems
            }
        });

        setStatus("Returned");
        setItemListHeader("Returned Items");
    }
   
    const AssignItems = (assignedItems) => {
        API.post("reservation","/reservation/", {
            body : {
                email : email,
                reservationno : reservationno,
                summary : summary,
                status : "Assigned",
                requestby : firstName + " " + lastName,
                assigndate : currentDate,
                approvedby : approvedBy,
                reviewedby: reviewedBy,
                requestdate : currentDate,
                returndate : returnDate,
            }
        });
        API.post("reservationcart","/cart", {
            body : {
                reservationno : reservationno,
                description : note,
                itemrequested : reservationCart,
                assigneditems : assignedItems,
            }
        });

        AddItemToLocation(assignedItems,firstName,lastName);
        CheckInventory(assignedItems)
        setStatus("Assigned");
    }

    const CheckInventory = (assignedItems) => {
        let items = new Set();
        
        assignedItems.forEach(item => {
            items.add(item.type)
        });
        items.forEach(item => {
            const searchItem = unfilteredItems.filter(item => item.type.includes(item))
            if (searchItem.length === 0) { 
                SendNotification("OUT_OF_STOCK",item);              
            }
        });

    }

    //Searching item
    const searchItem = (e) => {
        if (e.length === 9) {
            const searchItem = unfilteredItems.filter(item => item.serialno.toLowerCase().includes(e))
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
                                    <ReservationAssignedItemList items={assignedItems} removeItem={removeItem}/>
                            </div>
                        </div>
                   
                       
                    </div>
                    <div className="UserInfo">
                        <div className="row">
                            <div className="col">
                                <label className="userinfo-form-label fw-bold form-label">Reservation No</label>
                                <br/>
                                <label className="userinfo-form-label form-label">{reservationno}</label>
                            </div>
                            <div className="col">
                                <label className="userinfo-form-label fw-bold form-label">Status</label>
                                <br/>
                                <label className="userinfo-form-label form-label">{status}</label>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col">
                                <label className="userinfo-form-label fw-bold form-label">Requested By</label>
                                <br/>
                                <label className="userinfo-form-label form-label">{firstName + " " + lastName}</label>
                            </div>
                            <div className="col">
                                <label className="userinfo-form-label fw-bold form-label">Requested Date</label>
                                <br/>
                                <label className="userinfo-form-label form-label">{currentDate}</label>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col">
                                <label className="userinfo-form-label fw-bold form-label">School Id</label>
                                <br/>
                                <label className="userinfo-form-label form-label">{schoolID}</label>
                            </div>
                            <div className="col">
                                <div className="row" id="reserveInfoCol">
                                    <div className="col">
                                        <label className="fw-bold form-label">Assign Date</label>
                                        <br/>
                                        <label className="form-label">{assignedDate.length === 0 ? "N/A" : assignedDate}</label>
                                    </div>
                                    {/* <div className="col">
                                        <label className="fw-bold form-label">Return Date</label>
                                        <br/>
                                        <label className="form-label">{returnDate.length === 0 ? "N/A" : returnDate}</label>
                                    </div> */}
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col">
                                <label className="userinfo-form-label fw-bold form-label">Email</label>
                                <br/>
                                <label className="userinfo-form-label form-label">{email}</label>
                            </div>
                            <div className="col">
                                <div className="row" id="reserveInfoCol">
                                    <div className="col">
                                        <label className="fw-bold form-label">Approved By</label>
                                        <br/>
                                        <label id="approvedBy" className="form-label">{approvedBy.length === 0 ? "N/A" : approvedBy}</label>
                                    </div>
                                    {/* <div className="col">
                                        <label className="fw-bold form-label">Reviewd By</label>
                                        <br/>
                                        <label id="reviewedBy" className="form-label">{reviewedBy.length === 0 ? "N/A" : reviewedBy}</label>
                                    </div> */}
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col">
                                <label className="userinfo-form-label fw-bold form-label"></label>
                                <br/>
                                <label className="userinfo-form-label form-label"></label>
                            </div>
                            <div className="col">
                                <label className="userinfo-form-label fw-bold form-label"></label>
                                <div className="row">
                                    <div className="col">
                                        <button className="btn btn-light" id="returnBtn" onClick={ (e) => {setReturnDate(`${year}-${month}-${day}`);returnItems(assignedItems);}}>Return Items</button>
                                    </div>
                                    <div className="col">
                                        <button className="btn btn-light" id="assignBtn" onClick={ (e) => {setApprovedBy(accountName);setAssignedDate(`${year}-${month}-${day}`);AssignItems(assignedItems)}}>Assign Items</button>
                                    </div>
                                </div>
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