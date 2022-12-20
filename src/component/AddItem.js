import React from "react"
import Sidebar from './Sidebar';
import Header from './Header';
import BackArrow from './icons/back_arrow.png';
import "./styles/AddItem.css";


function AddItem() {
    return (
      <div className="AddItemWindow">
            <Sidebar />
            <Header />
            {/* Previous Page Navigation Bar */}
            <div className="PrevNavbar">
                <a href="/Item">
                    <img src={BackArrow} className="back-arrow" alt="back arrow" />
                </a>
                <label className="prevPage">Item</label>
            </div>
            {/* Add Item Form */}
            <div className="form-wrapper">
                <form>
                    <div className="form-input">
                        <label className="input-label" for="name" >Name</label>
                        <input type="text" className="text-input" id="name" placeholder="Enter name" />
                    </div>
                    <div className="form-input">
                        <label className="input-label" for="serialNumber" >Serial #</label>
                        <input type="text" className="text-input" id="serialNumber" placeholder="Enter serial #" />
                    </div>
                    <div className="form-input">
                        <label className="input-label" for="manufacturer" >Manufacturer</label>
                        <input type="text" className="text-input" id="manufacturer" placeholder="Enter manufacturer" />
                    </div>
                    <div className="form-input">
                        <label className="input-label" for="model" >Model</label>
                        <input type="text" className="text-input" id="model" placeholder="Enter model" />
                    </div>
                    <div className="form-input">
                        <label className="input-label" for="location" >Location</label>
                        <input type="text" className="nameInput" id="name" placeholder="Enter name" />
                    </div>
                    <div className="form-input">
                        <label className="input-label" for="roomNumber" >Room Number</label>
                        <input type="text" className="text-input" id="roomNumber" placeholder="Enter room number" />
                    </div>
                    <div className="form-input">
                        <label className="input-label" for="photo" >Photo</label>
                        <input type="text" className="nameInput" id="name" placeholder="Enter name" />
                    </div>
                    <div className="button-wrapper">
                    <button className="button">Cancel</button>
                    <button className="button">Save item</button>

                    </div>
                    
                </form>
            </div>
                
            
      </div>
    );
  }
  
  export default AddItem;