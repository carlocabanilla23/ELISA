import './Home.css';
import Sidebar from './Sidebar';
import Header from './Header';
import { Routes, Route } from 'react-router-dom';
import Users from './Users';

function Home() {
  return (
    <div className="Home">
              <Sidebar />
              <Header />
    </div>
  );
}

export default Home;