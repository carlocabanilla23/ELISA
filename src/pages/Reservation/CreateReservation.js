import React from "react";
import { useState, useEffect } from "react";
import { API } from 'aws-amplify';
import '../../assets/styles/CreateReservation.css';
import { useNavigate, useLocation, useParams } from "react-router-dom";
import SendNotification from "../../Services/notification/Notification";
import ItemRequestDropDown from "../../component/others/ItemRequestDropDown";
import ItemRequestAuto from "../../component/others/ItemRequestAuto";
import ContentHeader from "../../component/others/ContentHeader";

function CreateReservation () {
    const {typeParam,itemNoParam} = useParams();
    const location = useLocation();
    const [reservationNo,setReservationNo] = useState();
    // const [types,setTypes] = useState([]);
    const [items,setItems] = useState([]);
    const [requestItemMenu,setRequestItemMenu] = useState();

    const [firstName,setFirstName] = useState("");
    const [lastName,setLastName] = useState("");
    const [schoolID,setSchoolID] = useState("");
    const [email,setEmail] = useState("");
    const [role,setRole] = useState("");
    const [summary,setSummary] = useState("");
    const [currentDate,setCurrentDate] = useState("");
    const [note,setNote] = useState("N/A");

    const [returnDate,setReturnDate] = useState();
    const [reservationCart,setReservationCart] = useState([]);
    const navigate = useNavigate();

    const [error, setError] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const [header,setHeader] = useState('');
    const access = localStorage.getItem('access');

    const date = new Date();
    let day;
    let month = date.getMonth() + 1;
    let monthPlus3;
    (date.getMonth() + 4 < 10) ?  monthPlus3 = "0" + (date.getMonth() + 4) :  monthPlus3 = date.getMonth();
    (date.getDate() < 10) ?  day = "0" + date.getDate().toString() :  day = date.getDate();

    let year = date.getFullYear();
    

    useEffect( () => {
        if (access === "Admin") {
            setHeader(
            <>
                <ContentHeader title="Make a Reservation" />
            </>
            );
        }
       
        setReturnDate(year+"-"+monthPlus3.toString()+"-"+day);
        setNote("I would like to borrow an equipment. Thank you");
        
        API.get("reservation","/reservation/count").then( rno => { 
            setReservationNo("R"+rno);
            setSummary("Reservation " + rno);
        });

        if (typeParam === undefined || itemNoParam === undefined) {
            API.get("items","/items").then( itemRes => {
                // console.log(itemRes);
                // sortItems(itemRes);
                // setItems(itemRes);
            })
            
            setRequestItemMenu(
                <>
                 <ItemRequestDropDown
                            setReservationCart={setReservationCart}
                            // types={types}
                            setError={setError}
                            setErrorMessage={setErrorMessage}
                            reservationCart={reservationCart}
                            // setModelList={setModelList}
                        />
                </>
            );

            
        } else {
            API.get("items","/items/object/" + typeParam +"/"+itemNoParam).then( itemRes => {
                console.log(itemRes);

                setRequestItemMenu(
                   <ItemRequestAuto item={itemRes} />
                );
                // sortItems(itemRes);
                // setItems(itemRes);
            })
            
        }
        
        // console.log(location.state.reservationCount);
        

        setCurrentDate(`${day}-${month}-${year}`);

        let emailParam = decodeURIComponent(escape(window.atob( localStorage.getItem('email'))));
        API.get("userapi","/email/object/" + emailParam).then( res => {
            setFirstName(res.firstname);
            setLastName(res.lastname);
            setSchoolID(res.schoolID);
            setEmail(res.email);
            setRole(res.role);
        })

    },[]);

    useEffect(() => {
        if(error === 1){
            setErrorMessage('Please choose a Type and a Model');
        }else if(error === 2){
            setErrorMessage('Please choose a Type');
        }else if(error === 3){
            setErrorMessage('Please choose a Model');
        }else if(error === 4){
            setErrorMessage('Please specify amount of items you want to reserve');
        }else if(error === 5){
            setErrorMessage('Please add items to your reservation');
        }else if(error === 6){
            setErrorMessage('Return date is invalid')
        }else if(error === 7){
            setErrorMessage('Your exceed the maximum item request')
        }
    },[error])

    useEffect(() => {
        const defaultValue = document.getElementById('default');
        if(reservationCart.length !== 0){
            defaultValue.style.display = 'none';
        }else{
            defaultValue.style.display = 'block';
        }
        if(note.length === 0){
            setNote('N/A');
        }
    },[reservationCart, note])

    const submitOrder = (e) => {
        e.preventDefault();
        console.log(reservationCart);
        if(reservationCart.length === 0){
            throw new Error(setError(5));
        }
        // //Check return date if it is in range of two months from request date

        API.post("reservation","/reservation", {
            body : {
            email : email,
            reservationno : reservationNo,
            summary : summary,
            status : "Open",
            requestby : firstName + " " + lastName,
            approvedby : "N/A",
            requestdate : currentDate,
            returndate : returnDate,
            }
        });

        API.post("reservationcart","/cart", {
            body : {
            reservationno : reservationNo,
            description : note,
            itemrequested : reservationCart,
            assigneditems : []
            }
        });
        // Send Email to Admin
        SendNotification("NEW_RESERVATION",reservationNo);
        ShowAlert();
        // navigate('/Reservations')
    }
    const cancelEdit = () => {
        navigate(-1);
    }

    const ShowAlert = () => {
        var alert = document.getElementById("alert");
        alert.style.display = "block";
        setTimeout( () =>{
             navigate("/Reservations");
        },1500);
    }
    
    return (
        <>
            <div className="alert alert-success alert-popout" id="alert" role="alert">
                The reservation has been created successfully!
            </div>
            
            { header }
          
            <div className="CreateReservation">
                <div className="container ReservationForm">
                    <div className="row">
                        <div className="col">
                            <h1>Request Item</h1>
                        </div>
                    </div>
                    <form onSubmit={submitOrder}>
                        {/* Requests */}
                        {/* <div className="row">
                            <div className="col">
                                <label className="form-label">Request Item</label>
                            </div>
                        </div>         */}
                        {/* { console.log(types)} */}
                        {requestItemMenu}

                       
                       
                        {/* Summary */}
                        <div className="row">
                            <div className="col">
                                <div className="mb-3">
                                    <label  className="form-label">Reservation Summary</label>
                                    <input type="text"
                                    className="form-control"
                                    value={summary}
                                    onChange={ (e) => {setSummary(e.target.value); setError(''); setErrorMessage('')}}
                                    onInvalid={(event) => {event.target.setCustomValidity('Please write a summary for your reservation purpose')}}
                                    onInput={(e) => e.target.setCustomValidity('')}
                                    required={true} />
                                </div>
                            </div>
                        </div>
                        {/* Return Date */}
                        <div className="row">
                            <div className="col">
                                <div className="mb-3">
                                    <label className="form-label">Return Date</label>
                                    <input className="form-control dateInput"
                                    type="date"
                                    input="date"
                                    onChange={ (e) => {setReturnDate(e.target.value); setError(''); setErrorMessage('')}}
                                    onInvalid={(event) => {event.target.setCustomValidity('You can only reserve for two months at most')}}
                                    onInput={(e) => e.target.setCustomValidity('')}
                                    value={returnDate}
                                    required={true} />
                                    
                                </div>
                            </div>
                        </div>
  
                        {/* Note */}
                        <div className="row">
                            <div className="col">
                                <div className="mb-3">
                                    <label  className="form-label">Note</label>
                                    <textarea className="form-control"
                                    id="NoteTextarea1"
                                    onChange={ (e) => { setNote(e.target.value); setError(''); setErrorMessage('')}}
                                    rows="3"
                                    pattern='^([a-zA-Z0-9]{1,})$'
                                    onInvalid={(event) => {event.target.setCustomValidity('Write a short note or "None" before submit the reservation form')}}
                                    onInput={(e) => e.target.setCustomValidity('')} 
                                    required={true}
                                    value={note} />
                                </div>
                            </div>
                        </div>
                        {/* Submit Button */}
                        <div className="row justify-content-end">
                            <div className="col ">
                                <button type="submit" className="btn btn-primary">
                                    Submit Order
                                </button>
                            </div>
                            <span className="errorMessage">{errorMessage}</span>
                        </div>
                    </form>
                </div>

                <div className="container CreateReservationSummary">
                    <div className="row">
                        <div className="col">
                            <h1>Summary</h1>
                        </div>
                    </div>

                    <div className="mb-3 row">
                        <label  className="col-sm-2 col-form-label">First Name</label>
                        <div className="col-sm-10">
                            <input type="text" readOnly className="form-control-plaintext" value={firstName} />
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <label  className="col-sm-2 col-form-label">Last Name</label>
                        <div className="col-sm-10">
                            <input type="text" readOnly className="form-control-plaintext" value={lastName} />
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <label  className="col-sm-2 col-form-label">School  ID</label>
                        <div className="col-sm-10">
                            <input type="text" readOnly className="form-control-plaintext" value={schoolID} />
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <label  className="col-sm-2 col-form-label">Role</label>
                        <div className="col-sm-10">
                            <input type="text" readOnly className="form-control-plaintext" value={role} />
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <label  className="col-sm-2 col-form-label">Student Email</label>
                        <div className="col-sm-10">
                            <input type="text" readOnly className="form-control-plaintext" value={email} />
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <label  className="col-sm-2 col-form-label">Request Date</label>
                        <div className="col-sm-10">
                            <input type="text" readOnly className="form-control-plaintext" value={currentDate} />
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <label  className="col-sm-2 col-form-label">Return Date</label>
                        <div className="col-sm-10">
                            <input type="text" readOnly className="form-control-plaintext" value={returnDate} />
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <label  className="col-sm-2 col-form-label">Items Requested</label>
                        <div className="col-sm-10">
                            <ul className="list-group">
                                <li className="list-group" id="default" >N/A</li>
                                {reservationCart.map ( (res,index)=> 
                                <li className="list-group" key={index}>{res.type} - {res.model} - {res.quantity }</li>
                                )}
                            </ul>
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <label  className="col-sm-2 col-form-label">Note</label>
                        <div className="col-sm-10">
                            <input type="text" readOnly className="form-control-plaintext" value={note} />
                        </div>
                    </div>
                </div>
    
            </div>  
        </>
    );
}

export default CreateReservation;