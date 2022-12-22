import Login from './component/Login';
import Home from './component/Home';
import React from 'react';
import { Amplify,  } from 'aws-amplify';
import awsExport from './aws-exports';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Routes, Route } from 'react-router-dom';
import Users from './component/Users';
import CreateUser from './component/CreateUser';
import AddItem from './component/AddItem';
import EditUser from './component/EditUser';
import Inventory from './component/Inventory';
import RoomLocation from './component/RoomLocation';
import StorageLocation from './component/StorageLocation';
import Reservations from './component/Reservations';
import Reservation from './component/Reservation';


Amplify.configure(awsExport);

function App() {

  return (
    <div >
    {/* Master Route */}

    <Routes>
      <Route path='/' element= {<Login />} />
      <Route path='/Home' element= {<Home />} />
      <Route path='/Inventory' element= {<Inventory />} />
      <Route path='/RoomLocation' element= {<RoomLocation />} />
      <Route path='/StorageLocation' element= {<StorageLocation />} />
  
      <Route path='/Reservations' element= {<Reservations />} />
      <Route path='/Reservation' element= {<Reservation />} />

      <Route path='/EditUser' element= {<EditUser />} /> 
      <Route path='/Users' element= {<Users />} />
      <Route path='/CreateUser' element= {<CreateUser />} />
      <Route path='/AddItem' element= {<AddItem />} />
     
    </Routes>

    {/* For Testing */}
    {/* Comment The Routes on Top in order to run this. Change the component below for the test that you want to run */}

        {/* <Users/>  */}
   
    </div>
  );
}

export default App;
