import './styles/Home.css';
import Sidebar from './Sidebar';
import Header from './Header';

function Home() {
  return (
    <div className="Home">
              <Sidebar />
              <Header />
              <div className="HomeHeader">
                  <div className="row">
                      <div className="col fs-4 ms-5 fw-bold">
                          <i className="fa fa-home" aria-hidden="true"> Dashboard</i>
                        </div>
                  </div>
              </div>
              <div className="Dashboard">
              <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,1,0" />
                  <div class="charts">
                    <div class="weekly">
                      <div class="TitleText">Reserved items each week</div>
                    </div>
                    <div class="quarterly">
                      <div class="TitleText">Inventory each quarter</div>
                    </div>
                  </div>

                  <div class="insights">
                    <div class="WeekOverview">
                      <div class="TitleText">This week overview</div>
                      <div class="Itemcards">
                        <div class="reservedItem">
                          <div class="left">
                            <span class="material-symbols-outlined">fact_check</span>
                          </div>
                          <div class="right">
                            <div class="mutedText">Reserved items</div>
                            <div class="number">06</div>
                          </div>
                        </div>
                        <div class="returnItems">
                          <div class="left">
                            <span class="material-symbols-outlined">assignment_return</span>
                          </div>
                          <div class="right">
                            <div class="mutedText">Returned items</div>
                            <div class="number">10</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="InventoryOverview">
                      <div class="TitleText">Inventory summary</div>
                      <div class="InventorySections">
                        <div class="top">
                          <div class="mutedText">Low stock items</div>
                          <div class="number">05</div>
                        </div>
                        <div class="middle">
                          <div class="mutedText">Reserved items</div>
                          <div class="number">12</div>
                        </div>
                        <div class="bottom">
                          <div class="mutedText">Total items</div>
                          <div class="number">80</div>
                        </div>
                      </div>
                    </div>

                    <div className="UserSummary"> 
                      <div class="TitleText">User Summary</div>
                      <div class="UserCards">
                        <div class="TotalUsers">
                          <span class="material-symbols-outlined">groups</span>
                          <div class="mutedText">Total Users</div>
                          <div class="number">50</div>
                        </div>
                        <div class="ActiveUsers">
                          <span class="material-symbols-outlined">verified_user</span>
                          <div class="mutedText">Active Users</div>
                          <div class="number">20</div>
                        </div>
                      </div>
                      
                    </div>
                  </div>

                  
              </div> 
    </div>
  );
}

export default Home;