import './Home.css';
import Sidebar from './Sidebar';
import Header from './Header';

function Home() {
  return (
    <div className="Home">
            <div className="main">
              <h1>ELISA</h1>
              <Sidebar />
            </ div>

            <div className="header">
              <Header />
            </div>
    </div>
  );
}

export default Home;