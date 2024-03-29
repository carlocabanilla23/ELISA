import React from "react";
import { useState, useEffect } from "react";
import { API } from 'aws-amplify';
import '../../assets/styles/CreateReservation.css';
import { useNavigate, useLocation, useParams } from "react-router-dom";
import SendNotification from "../../Services/notification/Notification";
import ItemRequestDropDown from "../../component/others/ItemRequestDropDown";
import ItemRequestAuto from "../../component/others/ItemRequestAuto";
import ContentHeader from "../../component/others/ContentHeader";
import ItemList from "../../component/List/ItemList";
import ItemRequestList from "../../component/List/ItemRequestList";
import ReservationItemList from "../../component/List/ReservationItemList";
import Pagination from "../../component/secondMainComponents/Pagination";
import { GetDateToday } from "../../Services/etc/GetDateToday";
import logo from '../../assets/icons/elisa_logo.png';

function CreateReservation () {
    const {typeParam,serialParam} = useParams();
    const location = useLocation();
    const [reservationNo,setReservationNo] = useState();
    // const [types,setTypes] = useState([]);
    const [items,setItems] = useState([]);

    const [requestItemMenu,setRequestItemMenu] = useState();
    const [itemListSummary,setItemListSummary] = useState();

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
    const [filteredItems,setFilteredItems] = useState([]);
    const [error, setError] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const [header,setHeader] = useState('');
    const access = localStorage.getItem('access');
    const loggedUser = decodeURIComponent(escape(window.atob(localStorage.getItem('email'))));

    const [pageUpdate,setPageUpdate] = useState(true);

    // Pagination
    const [currentPage,setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const date = new Date();
    let day;
    let month = date.getMonth() + 1;
    let monthPlus3;
    (date.getMonth() + 4 < 10) ?  monthPlus3 = "0" + (date.getMonth() + 4) :  monthPlus3 = date.getMonth();
    (date.getDate() < 10) ?  day = "0" + date.getDate().toString() :  day = date.getDate();

    let year = date.getFullYear();


    useEffect( () => {
        setPageUpdate(false);
        if (access === "Admin") {
            setHeader(
            <>
                <ContentHeader title="Make a Reservation" />
            </>
            );
        }

        API.get("items","/items/createreservation").then( itemRes => {
            setItems(itemRes);
        })

        setReturnDate(year+"-"+monthPlus3.toString()+"-"+day);
        setNote("I would like to borrow an equipment. Thank you");

        API.get("reservation","/reservation/count").then( rno => {
            setReservationNo("R"+rno);
            setSummary("Reservation " + rno);
        });

        if (typeParam === undefined || serialParam === undefined) {
            setRequestItemMenu(
                <>
                 <ItemRequestDropDown
                            updateCart={updateCart}
                            // Allitems={itemRes}
                            setError={setError}
                            setErrorMessage={setErrorMessage}
                            reservationCart={reservationCart}
                            setReservationCart={setReservationCart}
                            // setModelList={setModelList}
                            filteredItems={filteredItems}
                            setFilteredItems={setFilteredItems}
                        />
                </>
            );
        } else {
            document.getElementById("ItemRequestList").style.display = "none";
            document.getElementById("ReservationItemList").style.display = "none";

            API.get("items","/items/object/" + typeParam +"/"+serialParam).then( itemRes => {
                setReservationCart([itemRes,...reservationCart]);
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

    },[filteredItems]);

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

    // useEffect(() => {
    //     const defaultValue = document.getElementById('default');
    //     if(reservationCart.length !== 0){
    //         defaultValue.style.display = 'none';
    //     }else{
    //         defaultValue.style.display = 'block';
    //     }
    //     if(note.length === 0){
    //         setNote('N/A');
    //     }
    // },[reservationCart, note])

    // useEffect( ()=> {
    //     document.getElementById('custom-dropdown-row').style = "none";
    //     document.getElementById('custom-dropdown-row').style = "none";
    // },[]);

    const searchItem = (e) => {
        // console.log(e.length);
        let query = e.toLowerCase();

        if (e.length === 0) {
            setFilteredItems([]);
        }else {
            let searcedhItems = items.filter((item) => item.type.toLowerCase().includes(query) ||
                                                        item.name.toLowerCase().includes(query) ||
                                                        item.model.toLowerCase().includes(query) ||
                                                        item.manufacturer.toLowerCase().includes(query) ||
                                                        item.roomno.toLowerCase().includes(query)
                                                        );
                                                    //  ||
                                                    // item.manufacturer !== undefined ||
                                                    // item.manufacturer.toLowerCase().includes(e));
            reservationCart.map(requested => {
                const available = searcedhItems;
                searcedhItems = available.filter(item => item.name !== requested.name);
            });
            searcedhItems.sort((a,b) => {
                var tA = Number.parseInt(a.name);
                var tB = Number.parseInt(b.name);
                if(isNaN(tA) && isNaN(tB)){
                    if(a.name.length > b.name.length){
                        return 1;
                    }else if(a.name.length < b.name.length){
                        return -1;
                    }else{
                        return a.name.localeCompare(b.name);
                    }
                }else if(isNaN(tA)){
                    return -1;
                }else if(isNaN(tB)){
                    return 1;
                }else{
                    return Math.sign(tA - tB);
                }
            });
            setFilteredItems(searcedhItems);
        }                                            // setItems(searcedhItems);
    }

    const updateCart = (order) => {
        // let tmp = reservationCart;
        // tmp.push(order)
        setReservationCart(order);
        console.log(reservationCart);
    }

    const submitOrder = () => {
        let cart = reservationCart;
        // e.preventDefault();
        if(reservationCart.length === 0){
            setError(5);
        } else {
            API.post("reservation","/reservation", {
                body : {
                email : email,
                reservationno : reservationNo,
                summary : summary,
                status : "Reserved",
                requestby : firstName + " " + lastName,
                approvedby : "N/A",
                requestdate : currentDate,
                returndate : returnDate,
                }
            });

            cart.forEach( item => {
                item.prevlocation = item.location;
                item.prevroomno = item.roomno;
                item.lastupdated = GetDateToday();
                item.status = "Reserved";
                item.roomno = "NA";
                item.location = "USER";
                item.assignedto = email;
                item.assigndate = GetDateToday();

                API.put("items",'/items/', {
                    body : item
                })
            })

            API.post("reservationcart","/cart", {
                body : {
                reservationno : reservationNo,
                description :   note,
                itemrequested : cart,
                assigneditems : cart,
                returneditems : []
                }
            });

            // Send Email to Admin
            SendNotification("NEW_RESERVATION",reservationNo);
            ShowAlert();
            // CheckInventory(reservationCart);

        }


    }

    const CheckInventory = (assignedItems) => {
        let items = new Set();

        assignedItems.forEach(item => {
            items.add(item.type)
        });
        items.forEach(item => {
            const searchItem = items.filter(item => item.type.includes(item))
            if (searchItem.length === 0) {
                SendNotification("OUT_OF_STOCK",item);
            }
        });

    }

    const addItem = (itm) => {
        console.log(itm);
        console.log(reservationCart);
        const tmpItm = items.filter( i=> i !== itm)
        const tmpupItm = filteredItems.filter( i => i !== itm);
        setItems(tmpItm);

        setFilteredItems((items) =>
        items.filter((i) => i !== itm)
        );
        setReservationCart([itm,...reservationCart]);
    }

    const RemoveItem = (itm) => {
        setReservationCart((items) =>
        items.filter((i) => i !== itm)
        );

        // console.log(reservationCart);
        const tmpItems = reservationCart.filter( i => i !== itm);
        // setReservationCart([...tmpItems]);
        setItems([itm,...filteredItems]);
        setFilteredItems([itm,...filteredItems]);
    }

    const ShowAlert = () => {
        var alert = document.getElementById("alert");
        alert.style.display = "block";

        if (access === "Admin") {
            setTimeout( () =>{
                navigate("/Reservations");
           },1500);
        }else {
            setTimeout( () =>{
                navigate("/OrderHistory/"+loggedUser);
           },1500);
        }
    }

    // Pagination

    const idxLastItem = currentPage * itemsPerPage;
    const idxFirstItem = idxLastItem - itemsPerPage;
    const currentList = filteredItems.slice(idxFirstItem,idxLastItem);

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

    const showFilter = () => {
        document.getElementById("ReservationItemList").style.display = "none";
        document.getElementById("custom-dropdown-row").style.display = "flex";
        document.getElementById("ItemRequestList").style.display = "none";
        document.getElementById("Pagination").style.display = "none";
    }
    const showSearch = () => {
        document.getElementById("ItemRequestList").style.display = "none";
        document.getElementById("custom-dropdown-row").style.display = "none";
        document.getElementById("ReservationItemList").style.display = "block";
        document.getElementById("Pagination").style.display = "flex";
    }
    const showSummary = () => {
        document.getElementById("ItemRequestList").style.display = "block";
        document.getElementById("custom-dropdown-row").style.display = "none";
        document.getElementById("ReservationItemList").style.display = "none";
        document.getElementById("Pagination").style.display = "none";
    }

    return (
        <>
            <div className="alert alert-success alert-popout" id="alert" role="alert">
                The reservation has been created successfully!
            </div>

            { header }

            <div className='CreateReservation'>
                <div className="container ReservationForm">
                    <div className="row">
                        <div className="col">
                            <img src={logo} alt="logo" className="logo" />
                            <h1>Reserve Item</h1>
                        </div>
                    </div>

                    <div className="options">
                    <button className="options-btn" onClick={ (e)=> showFilter()}>Filter</button>
                    <button className="options-btn" onClick={ (e)=> showSearch()}>Search</button>
                    <button className="options-btn" onClick={ (e)=> showSummary()}>Cart</button>

                </div>

                    {requestItemMenu}

                        {/* Requests */}
                        {/* <div className="row">
                            <div className="col">
                                <label className="form-label">Request Item</label>
                            </div>
                        </div>         */}
                        {/* { console.log(types)} */}



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
                                <button onClick={ (e)=> submitOrder()} className="submit-order-btn">
                                    Submit Order
                                </button>
                            </div>
                            <span className="errorMessage">{errorMessage}</span>
                        </div>

                    <div id="ItemRequestList">
                    <ItemRequestList RemoveItem={RemoveItem} items={reservationCart} />
                    </div>
                </div>
                <div className="RightContainer">
                    <div id="ReservationItemList">
                        <ReservationItemList
                            items = {currentList}
                            addItem = {addItem}
                            searchItem={searchItem}
                        />
                    </div>
                    <div id = "Pagination">
                    <Pagination
                            PerPage={itemsPerPage}
                            total={filteredItems.length}
                            paginate={paginate}
                            currentPageLocation = {currentPage}
                            />
                    {itemListSummary}
                    </div>
                </div>
            </div>
        </>
    );
}

export default CreateReservation;