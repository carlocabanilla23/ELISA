import React, { useEffect,useState } from "react"
import { Amplify, API } from "aws-amplify";
import awsExport from '../../aws-exports';
import { useNavigate } from 'react-router-dom';
import Pagination from "../../component/secondMainComponents/Pagination";
import "../../assets/styles/Notification.css";
// import {GetDateToday} from '../Services/etc/GetDateToday';
Amplify.configure(awsExport);

function Notification() {
    const navigate = useNavigate();
    const [data,setData] = useState([]);
    const [unfilteredData, setUnfilteredData] = useState([]);
    const [currentPage,setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(9);
    useEffect(()=>{
        let emailParam = decodeURIComponent(escape(window.atob( localStorage.getItem('email'))));
        API.get("notification","/notification/" + emailParam).then( resEmail => {
            console.log(resEmail)
            sortData(resEmail);
        });
    },[]);

    const sortData = (data) => {
        let sortedData = data.sort((p1, p2) => (p1.date < p2.date) ? 1 : (p1.date > p2.date) ? -1 : 0);
        setData(sortedData);
        setUnfilteredData(sortedData);
    }
    const gotoDashboard = () => {
        navigate('/Home')
    }

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

    // const printDate = (date) => {
    //     const today = GetDateToday();
    //     const year = today.split('-').at(0);
    //     const month = today.split('-').at(1);
    //     const day = today.split('-').at(2);
    //     var createdDate = 0;
    //     const notifDate = date.split('-');
    //     if(year > notifDate.at(0)){
    //         createdDate = year - notifDate.at(0);
    //     }else{
    //         if(month > notifDate.at(1) + 1 || (month > notifDate.at(1) && day >= notifDate.at(2))){
    //             createdDate = month - notifDate.at(1);
    //         }else{
    //             if(day == notifDate.at(2)){
    //                 return 'today';
    //             }
    //             createdDate = day - notifDate.at(2);
    //             if(day < notifDate.at(2)){
    //                 createdDate += new Date();
    //             }
    //         }
    //     }
    //     return createdDate;
    // }

    return (
        <>
            {/* Previous Page Navigation Bar */}
            <div className="NotificationHeader">
                    <div className='mobile-content-header'>
                        <button onClick={(e)=> navigate(-1)} className="PageHeaderBtn"><i className="PageHeaderBtn fa fa-arrow-left ms-2" aria-hidden="true"></i></button>
                        <label>Notifications</label>
                    </div>
            </div>

            <div className="NotificationContent">
                <div className="row font-weight-bold">
                    <div className="col1" id="NotifyHeader1"> Date </div>
                    <div className="col2" id="NotifyHeader2"> Description </div>
                </div>
                {/* <div className="notificationBox">

                </div> */}
                {data.map( (items,index) => (
                    <>
                        <div id="seenCircle" />
                        <div className="row" id="notificationBox">
                            <div className="col1"> {items.date} </div>
                            <div className="col2">
                                <strong>{items.message.split(' ').at(0)}</strong>
                                {items.message.substr(items.message.split(' ').at(0).length,items.message.length)}
                            </div>
                            {/* <div className="col3">{printDate(items.date)}</div> */}
                        </div>
                    </>
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
  export default Notification;