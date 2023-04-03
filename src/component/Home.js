import '../assets/styles/Home.css';
import iDashboard from "../assets/icons/dashboard.png";
import QuarterReport from '../component/charts/Quarter';
import GraphReport from '../component/charts/Graph';
import GraphReport2 from '../component/charts/Graph2';
import BarReport from '../component/charts/Bar';
import ScatterReport from '../component/charts/Scatter';
import { useEffect } from 'react';
// import { API } from 'aws-amplify';

// ELISA\src\component\charts\Pie.js
function Home() {

  useEffect(()=>{

  },[]);
  
  return (
    <div className="Home">
              <div className="HomeHeader">
                  <div className="content">
                  <div>
                    <img src={iDashboard} className="icon" alt="dashboard icon" />
                    <span className="dashboardLabel">Dashboard</span>
                    </div>     
                  </div>
              </div>
              <div className="Dashboard">
                <div className="top"> <p className="chartLabel">Most Requested Items</p>  <QuarterReport /> </div>
                <div className="top"> <p className="chartLabel">Inventory Summary</p>  <GraphReport /> </div>
                <div className="center"></div>
                <div className="bottom">  <p className="chartLabel">Reservation Summary</p>   <BarReport /></div>
                {/* <div className="top"> <p className="chartLabel">Type of inventory</p>   <PieReport /> </div> */}
                <div className="bottom">  <p className="chartLabel">Item Status Summary</p>   <ScatterReport /> </div>
                <div className="bottom"> <p className="chartLabel">User Summary</p>  <GraphReport2 /> </div>

              </div> 
    </div>
  );
}

export default Home;