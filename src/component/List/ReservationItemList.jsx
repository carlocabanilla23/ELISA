import React from "react";
import '../../assets/styles/List.css';

const ReservationItemList = ({items,addItem,searchItem}) => {
    return (
        <div className="ReservationItemList">
            <div className="container-fluid">
                <div className="row fw-bold bg-grey">
                    <div className="search-bar" id="unassigned-searchbar">
                        <input type="email" className="form-control" onChange={ (e)=> { searchItem(e.target.value)} } id="exampleFormControlInput1" placeholder="Search Reservation"/>
                    </div>
                </div>
            </div>
            <ul className="list-group">
                <li>
                    <div className="container-fluid">
                        <div className="row fw-bold bg-light">
                            <div className="col"></div>
                            <div className="col">Name</div>
                            <div className="col">Type</div>
                            <div className="col">Model</div>
                            <div className="col">Manufacurer</div>
                            {/* <div className="col">Status</div> */}

                        </div>
                    </div>
                </li>

                { items.map( (item,index) => (
                <li key={index}>
                        <div className="container-fluid">
                            <div className="row ">
                                <div className="col action">
                                    <button className="btn btn-dark" onClick={ () => addItem(item)}>Reserve</button>
                                    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
                                    <button className="btn AddItemBtn" onClick={() => addItem(item)}>
                                        <span className="material-icons">
                                        add_circle_outline
                                        </span>
                                    </button>
                                </div>
                                <div className="col item-text"> {item.name} </div>
                                <div className="col item-text"> {item.type} </div>
                                <div className="col item-text"> {item.model} </div>
                                <div className="col item-text"> {item.manufacturer} </div>
                                {/* <div className="col"> {item.status} </div> */}

                            </div>
                        </div>
                    </li>
                ))}
            </ul>

        </div>
       
    )
}

export default ReservationItemList;