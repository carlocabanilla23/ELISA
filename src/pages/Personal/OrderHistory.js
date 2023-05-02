import React, { useEffect,useState } from "react"
import { Amplify, API } from "aws-amplify";
import awsExport from '../../aws-exports';
import { useNavigate, useParams } from 'react-router-dom';
import "../../assets/styles/Notification.css"
import Pagination from "../../component/secondMainComponents/Pagination";
import { csv } from "../../Services/Export/csv";
import { pdf } from "../../Services/Export/pdf";

Amplify.configure(awsExport);

function OrderHistory() {
    const {param} = useParams();
    const navigate = useNavigate();
    const [data,setData] = useState([]);
    const [unfilteredData, setUnfilteredData] = useState([]);
    const [currentPage,setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(15);

    useEffect(()=>{
        API.get("reservation","/reservation/"+param).then( resEmail => {
            setData(resEmail);
            setUnfilteredData(resEmail);
            console.log(resEmail);
        });
    },[]);

    const idxLastItem = currentPage * itemsPerPage;
    const idxFirstItem = idxLastItem - itemsPerPage;
    const currentList = data.slice(idxFirstItem,idxLastItem);

    const paginate = (pageNumber) => {
        if (pageNumber !== 0 && pageNumber !==  Math.ceil(data.length / itemsPerPage) + 1 ) {

           var obj = document.getElementById(currentPage);
            obj.style.backgroundColor = "#F0F0EB";
            obj.style.color = "#3E2B2E";

            setCurrentPage(pageNumber);

            obj = document.getElementById(pageNumber);
            obj.style.backgroundColor = "#3E2B2E";
            obj.style.color = "#ffffff";
        }
    };

    const gotoUsers = () => navigate('/Users');

    const ViewReservation = (email,rid) => navigate('/Reservation/'+email+'/'+rid);

    const CSV = () => {
        csv(data,"Order History", []);
    }

    const PDF = () => {
        pdf(data,"Order History", []);
    }
    return (
        <>
            {/* Previous Page Navigation Bar */}
            <div className="NotificationHeader">
                        <div className='mobile-content-header'>
                            <button onClick={(e)=>navigate(-1)} className="PageHeaderBtn mobile-PageHeaderBtn"><i className="PageHeaderBtn fa fa-arrow-left ms-2" aria-hidden="true"></i></button>
                            <label>Order History</label>
                        </div>
                    <div className="col-auto-dropdown mobile-col-auto-dropdown">
                        <div className="dropdown">
                            <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Export
                            </button>
                            <ul className="dropdown-menu">
                            <li><button className="dropdown-item" onClick={CSV} >CSV</button></li>
                                <li><button className="dropdown-item" onClick={PDF} >PDF</button></li>
                            </ul>
                        </div>
                    </div>
            </div>

            <div className="NotificationContent">
                <div className="row font-weight-bold">
                    <div className="col col1 ">Date </div>
                    <div className="col col2"> Reservation</div>
                    <div className="col col2"> Order Status </div>
                    <div className="col col2"> Action </div>
                </div>
                {currentList.map( (items,index) => (
                    <div key={index} className="row">
                        <div className="col col1"> {items.requestdate} </div>
                        <div className="col col2"> {items.reservationno} </div>
                        <div className="col col3"> {items.status} </div>
                        <div className="col col4">
                            <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
                            <div className="col action">
                            <button onClick={(e)=> ViewReservation(items.email,items.reservationno)} className="btn btn-dark view-btn"> View </button>
                            <button className="btn view-item-btn" onClick={(e) => ViewReservation(items.email,items.reservationno)}>
                                <span className="material-icons">
                                    visibility
                                </span>
                            </button>
                            </div>

                        </div>
                    </div>
                ))}
                <div className="notif_page">
                    <Pagination
                        PerPage={itemsPerPage}
                        total={data.length}
                        paginate={paginate}
                        currentPageLocation = {currentPage}
                    />
                </div>
            </div>
        </>
    );
  }
  export default OrderHistory;