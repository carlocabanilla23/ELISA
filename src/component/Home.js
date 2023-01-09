import './styles/Home.css';
import Sidebar from './Sidebar';
import Header from './Header';
import iDashboard from "./icons/dashboard.png";

function Home() {
  return (
    <div className="Home">
              <Sidebar />
              <Header />
              <div className="HomeHeader">
                  <div className="content">
                    <div>
                    <span class="material-symbols-outlined">dashboard</span>
                    <span>Dashboard</span>
                    </div>    
                  </div>
              </div>
              <div className="Dashboard">
              <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,1,0" />
                  <div className="charts">
                    <div className="weekly">
                      <div className="TitleText">Reserved items each week</div>
                    </div>
                    <div className="quarterly">
                      <div className="TitleText">Inventory each quarter</div>
                    </div>
                  </div>

                  <div className="insights">
                    <div className="WeekOverview">
                      <div className="TitleText">This week overview</div>
                      <div className="Itemcards">
                        <div className="reservedItem">
                          <div className="left">
                            <span className="material-symbols-outlined">fact_check</span>
                          </div>
                          <div className="right">
                            <div className="mutedText">Reserved items</div>
                            <div className="number">06</div>
                          </div>
                        </div>
                        <div className="returnItems">
                          <div className="left">
                            <span className="material-symbols-outlined">assignment_return</span>
                          </div>
                          <div className="right">
                            <div className="mutedText">Returned items</div>
                            <div className="number">10</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="InventoryOverview">
                      <div className="TitleText">Inventory summary</div>
                      <div className="InventorySections">
                        <div className="top">
                          <div className="mutedText">Low stock items</div>
                          <div className="number">05</div>
                        </div>
                        <div className="middle">
                          <div className="mutedText">Reserved items</div>
                          <div className="number">12</div>
                        </div>
                        <div className="bottom">
                          <div className="mutedText">Total items</div>
                          <div className="number">80</div>
                        </div>
                      </div>
                    </div>

                    <div className="UserSummary"> 
                      <div className="TitleText">User Summary</div>
                      <div className="UserCards">
                        <div className="TotalUsers">
                          <span className="material-symbols-outlined">groups</span>
                          <div className="mutedText">Total Users</div>
                          <div className="number">50</div>
                        </div>
                        <div className="ActiveUsers">
                          <span className="material-symbols-outlined">verified_user</span>
                          <div className="mutedText">Active Users</div>
                          <div className="number">20</div>
                        </div>
                      </div>
                      
                    </div>
                  </div>

                  
              </div> 
    </div>
  );
}

export default Home;