import React, { useEffect, useState } from 'react';
import { API } from 'aws-amplify';
import "./styles/Users.css";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { useNavigate,useLocation, Link } from "react-router-dom";
import AddItemToLocationList from './AddItemToLocationList';
import Pagination from "./Pagination";

function AddItemToLocation () {
    const location = useLocation();
    const [items, setItems] = useState([]);
    const [unfilteredItems, setUnfilteredItems] = useState([]);
    const [currentPage,setCurrentPage] = useState(1);
    const [itemsPerPage,setItemsPerPage] = useState(10);
    const locationParam = location.state.location;
    const roomnoParam = location.state.roomno;
    const navigate = useNavigate();

    const AddItem = e => {
        e.preventDefault(); // prevent the default behavior of the event
        navigate('/AddItem'); //// navigate to the '/AddItem' route
    }

    useEffect( () => {
        API.get("inventory","/items").then( itemRes => {// make a GET request to the "inventory" API to retrieve a list of items
            sortItems(itemRes); // call the sortItems function and pass in the response from the API
        })
    },[]);

    const sortItems = (items) => { // function to filter the items based on the room number
        const updatedList = items.filter(item => item.roomno !== roomnoParam);
        updatedList.sort((a,b) => {
            var tA = Number.parseInt(a.type);
            var tB = Number.parseInt(b.type);
            if(isNaN(tA) && isNaN(tB)){
                return a.type.localeCompare(b.type);
            }else if(isNaN(tA)){
                return -1;
            }else if(isNaN(tB)){
                return 1;
            }else{
                return Math.sign(tA - tB);
            }
        });
        setItems(updatedList);
        setUnfilteredItems(updatedList);
    }
    
    const updateList = (serialno) => { // function to remove an item from the list
        // API.del("inventory","/items/object/"+serialno);
        const updatedList = items.filter(item => item.serialno !== serialno);
        setItems(updatedList);  // update the state of items with the updated list
        setUnfilteredItems(updatedList);
    } 

    const searchItem = (e) => { // function to search for an item in the list
        if (e.length > 0) { //// check if the search input is not empty
            const searcedhItems = unfilteredItems.filter((items) => items.serialno.toLowerCase().includes(e) || 
                                                            items.name.toLowerCase().includes(e) || 
                                                            items.model.toLowerCase().includes(e) || 
                                                            items.type.includes(e)); // filter the items based on the search input
            setItems(searcedhItems);  // update the state of items with the searched items
        }else{
            setItems(unfilteredItems); //// update the state of items with the unfiltered items
        }
       
    }  

    const idxLastItem = currentPage * itemsPerPage;
    const idxFirstItem = idxLastItem - itemsPerPage;
    const currentList = items.slice(idxFirstItem,idxLastItem);

    const paginate = (pageNumber) => { // paginate function
        if (pageNumber !== 0 && pageNumber !==  Math.ceil(items.length / itemsPerPage) + 1 ) {
                        // check if the page number is not 0 or the last page
           var obj = document.getElementById(currentPage); // get the current page element
            obj.style.backgroundColor = "#F0F0EB"; //// change the background color
            obj.style.color = "#3E2B2E"; // change the text color

            setCurrentPage(pageNumber); // update the state of currentPage with the new page number

            obj = document.getElementById(pageNumber); // get the new page element
            obj.style.backgroundColor = "#3E2B2E"; // change the background color
            obj.style.color = "#ffffff"; // change the text color
        }
    };

    const returnToViewItemLocation = () => { //// function to handle returning to the view item location
        let path = "/";
        if (locationParam === "Storage") {
             path = "/RoomLocation/StorageLocationItem/"+roomnoParam; // set the path to the storage location item route
        } 
        else if (locationParam === "Room") {
             path = "/RoomLocation/RoomLocationItem/"+roomnoParam; // set the path to the room location item route
        }

        navigate(path,{ //// use the navigate function to go to the specified path
                state: {
                        roomno : roomnoParam //// pass in the room number as a state parameter
                }
        });
    }

    return (
        <div className="Users">
        <Sidebar />
        <Header />
        <div className="UserHeader">

            <div className="row">
                <div className="col fs-4 ms-5 fw-bold" onClick={ (e) => returnToViewItemLocation() }>          
                        <i className="fa fa-arrow-left " aria-hidden="true"> 
                        <span className="ms-1">Add Item To Location </span>  
                        <span>{roomnoParam}</span>  
                        </i>

                </div>

                <div className="col-sm-5 searchbar">
                    <input type="email" className="form-control" onChange={ (e)=> { searchItem(e.target.value)} } id="exampleFormControlInput1" placeholder="Search Item"/>
                </div>

                <div className="col text-end adduser">
                    <button type="submit" className="btn" id="AddUser" onClick={AddItem}>Add Item</button>

                </div>

                <div className="col auto dropdown">
                    <div className="dropdown">
                        <button className="btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
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
            
            <AddItemToLocationList items={currentList} updateList={updateList}/>
            <Pagination
                    PerPage={itemsPerPage} 
                    total={items.length} 
                    paginate={paginate}
                    currentPageLocation = {currentPage}
                    /> 
          
                {/* {items.map( (itemRes,index) => <Item item={itemRes} key={index} updateList={updateList}/>)} */}
                   
        </div>
    </div>    
    )
}

export default AddItemToLocation;