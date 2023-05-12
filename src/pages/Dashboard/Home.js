import '../../assets/styles/Home.css';
import iDashboard from "../../assets/icons/dashboard.png";
import QuarterReport from '../../component/charts/Quarter';
import GraphReport from '../../component/charts/Graph';
import GraphReport2 from '../../component/charts/Graph2';
import BarReport from '../../component/charts/Bar';
import ScatterReport from '../../component/charts/Scatter';
import { useEffect, useState, useRef } from 'react';
import UserReservationGraph from '../../component/charts/UserReservationGraph';
import { csv } from '../../Services/Export/csv';
import { pdf } from '../../Services/Export/pdf';
import { API } from 'aws-amplify';
// import { API } from 'aws-amplify';

// ELISA\src\component\charts\Pie.js
function Home() {
  const access = localStorage.getItem('access');
  const [board,setBoard] = useState();
  const [inventory, setInventory] = useState([]);
  const [users, setUsers] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [exportType, setExportType] = useState('');

  useEffect(()=>{
    if (access === 'Admin') {
      setBoard(
      <>
      <BarReport />
      <GraphReport />
      <div className="center">
      </div><QuarterReport />
      <ScatterReport />
      <GraphReport2 />
      </>
      )
    } else (
      setBoard(
        <>
          <UserReservationGraph />
        </>
      )
    )
    API.get("items","/items").then(itemRes => {
      sortTypeModel(itemRes);
    });
    API.get("userapi","/email").then( res => {
      sortRoleStatus(res);
    });
    API.get("reservation","/reservation").then( res => {
      sortReservation(res);
    });
  },[]);

  //Inventory Report
  const sortTypeModel = (itemRes) => {
    const typeList = [...new Map(itemRes.map((item) => [item.type, item])).values()];
    var updatedList = [];
    typeList.map((type) => {
      var tmpList = itemRes.filter(item => item.type === type.type);
      var modelList = [...new Map(tmpList.map((item) => [item.model, item]))];
      modelList.map(async (model) => {
        var data = await API.get('items','/items/object/'+model[1].type + '/' +model[1].serialno);
        var typeItemAmount = itemRes.filter(item => item.type === model[1].type && item.model === model[1].model);
        updatedList.push(model[1].type + '-' + model[1].model + '-' + data.cost + '-' + typeItemAmount.length + '-' + (data.cost * typeItemAmount.length));
      });
    });
    setInventory(updatedList);
  }

  //User Report
  const sortRoleStatus = (res) => {
    const typeList = [...new Map(res.map((user) => [user.role, user])).values()];
    var updatedList = [];
    typeList.map((role) => {
      var tmpList = res.filter(user => user.role === role.role);
      var statusList = [...new Map(tmpList.map((user) => [user.status, user]))];
      statusList.map((status) => {
        const data = res.filter(user => user.role === status[1].role && user.status === status[1].status);
        updatedList.push(status[1].role + '-' + status[1].status + '-' + data.length);
      });
    });
    setUsers(updatedList);
  }

  //Reservation Report
  const sortReservation = (res) => {
    var updatedList = [];
    var reservationList = [...new Map(res.map((reservation) => [reservation.status, reservation]))]
    reservationList.map((reservation) => {
      const tmpList = res.filter(item => item.status === reservation[0])
      updatedList.push(reservation[0] + '-' + tmpList.length);
    })
    setReservations(updatedList);
  }

  const CSV = () => {
    setExportType('CSV');
  }

  const PDF = () => {
    setExportType('PDF');
  }

  const Export_Inventory = () => {
    inventory.sort((a,b) => {
      var first = '';
      var second = '';
      var i = 0;
      while(first.length === 0){
        first = a.split('-').at(0).split(' ').at(i);
        i++;
      }
      i = 0;
      while(second.length === 0){
        second = b.split('-').at(0).split(' ').at(i);
        i++;
      }
      //Compare a and b
      var tA = Number.parseInt(first);
      var tB = Number.parseInt(second);
      if(isNaN(tA) && isNaN(tB)){
          return first.localeCompare(second);
      }else if(isNaN(tA)){
          return -1;
      }else if(isNaN(tB)){
          return 1;
      }else{
          return Math.sign(tA - tB);
      }
    })
    if(exportType === 'CSV'){
      csv(inventory, "Inventory_Report", []);
    }else if(exportType === 'PDF'){
      pdf(inventory, "Inventory_Report", []);
    }
  }

  const Export_User = () => {
    if(exportType === 'CSV'){
      csv(users, "User_Report", []);
    }else if(exportType === 'PDF'){
      pdf(users, "User_Report",[]);
    }
  }

  const Export_Reservation = () => {
    if(exportType === 'CSV'){
      csv(reservations, "Reservation_Report", []);
    }else if(exportType === 'PDF'){
      pdf(reservations, "Reservation_Report",[]);
    }
  }

  return (
    <div className="Home">
              <div className="HomeHeader">
                  <div className="content">
                  <div>
                    <img src={iDashboard} className="icon" alt="dashboard icon" />
                    <span className="dashboardLabel">Dashboard</span>
                    </div>
                  </div>
                  <div className="col-auto-dropdown">
                    <div className="dropdown">
                      <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" id='export-btn'>
                          Export
                      </button>
                      <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <li>
                          <button className="dropdown-item" onMouseEnter={CSV} onClick={CSV} >CSV</button>
                          <ul className="dropdown-menu" id="dropdown-submenu">
                            <li><button className="dropdown-item" onClick={Export_Inventory} >Inventory Report</button></li>
                            <li><button className="dropdown-item" onClick={Export_Reservation} >Reservation Report</button></li>
                            <li><button className="dropdown-item" onClick={Export_User} >User Report</button></li>
                          </ul>
                        </li>
                        <li>
                          <button className="dropdown-item" onMouseEnter={PDF} onClick={PDF} >PDF</button>
                          <ul className="dropdown-menu" id="dropdown-submenu">
                            <li><button className="dropdown-item" onClick={Export_Inventory} >Inventory Report</button></li>
                            <li><button className="dropdown-item" onClick={Export_Reservation} >Reservation Report</button></li>
                            <li><button className="dropdown-item" onClick={Export_User} >User Report</button></li>
                          </ul>
                        </li>
                      </ul>
                    </div>
                  </div>
              </div>
              <div className="Dashboard">
                {board}
              </div>
    </div>
  );
}

export default Home;