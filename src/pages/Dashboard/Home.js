import '../../assets/styles/Home.css';
import iDashboard from "../../assets/icons/dashboard.png";
import QuarterReport from '../../component/charts/Quarter';
import GraphReport from '../../component/charts/Graph';
import GraphReport2 from '../../component/charts/Graph2';
import BarReport from '../../component/charts/Bar';
import ScatterReport from '../../component/charts/Scatter';
import { useEffect, useState } from 'react';
import UserReservationGraph from '../../component/charts/UserReservationGraph';
// import { API } from 'aws-amplify';

// ELISA\src\component\charts\Pie.js
function Home() {
  const access = localStorage.getItem('access');
  const [board,setBoard] = useState();


  useEffect(()=>{
    if (access === 'Admin') {
      setBoard(
      <>
      <QuarterReport />
      <GraphReport />
      <div className="center">
      </div><BarReport />
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
                {board}
              </div>
    </div>
  );
}

export default Home;