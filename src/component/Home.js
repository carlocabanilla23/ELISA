import './styles/Home.css';
import Sidebar from './Sidebar';
import Header from './Header';
import PieReport from '../component/charts/Pie';
import GraphReport from '../component/charts/Graph';
import GraphReport2 from '../component/charts/Graph2';
import BarReport from '../component/charts/Bar';
import ScatterReport from '../component/charts/Scatter';
// ELISA\src\component\charts\Pie.js
function Home() {
  
  return (
    <div className="Home">
              <Sidebar />
              <Header />
              <div className="HomeHeader">
                  <div className="content">
                    <div>
                    <span>Dashboard</span>
                    </div>    
                  </div>
              </div>
              <div className="Dashboard">
                <div class="top">   <PieReport /> </div>
                <div class="top">  <GraphReport /> </div>
                <div class="center"></div>
                <div class="bottom">    <BarReport /></div>
                <div class="bottom">  <GraphReport2 /> </div>
                <div class="bottom">    <ScatterReport /> </div>

              </div> 
    </div>
  );
}

export default Home;