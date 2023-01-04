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
import EditItem from './component/EditItem';
import EditUser from './component/EditUser';
import Inventory from './component/Inventory';
import RoomLocation from './component/RoomLocation';
import StorageLocation from './component/StorageLocation';
import Reservations from './component/Reservations';
import Reservation from './component/Reservation';
import UserInformation from './component/UserInformation';
import RoomLocationItem from './component/RoomLocationItem';
import AddItemToLocation from './component/AddItemToLocation';
import StorageLocationItem from './component/StorageLocationItem';
import ItemInformation from './component/ItemInformation';
import Setting from './component/Setting';
import CreateReservation from './component/CreateReservation';
import CreateNormalUser from './component/CreateNormalUser';
import AssignedItems from './component/AssignedItems';
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
      <Route path='/RoomLocationItem' element= {<RoomLocationItem />} />

      <Route path='/StorageLocation' element= {<StorageLocation />} />
      <Route path='/StorageLocationItem' element= {<StorageLocationItem />} />

      <Route path='/AssignedItems' element= {<AssignedItems />} />
      
      
      <Route path='/AddItemToLocation' element= {<AddItemToLocation />} />
  
      <Route path='/Reservations' element= {<Reservations />} />
      <Route path='/Reservation' element= {<Reservation />} />
      <Route path='/CreateReservation' element= {<CreateReservation />} />

      <Route path='/EditUser' element= {<EditUser />} /> 
      <Route path='/Users' element= {<Users />} />
      <Route path='/CreateUser' element= {<CreateUser />} />
      <Route path='/CreateNormalUser' element= {<CreateNormalUser />} />
      
      <Route path='/ItemInformation' element= {<ItemInformation />} />
      <Route path="/EditItem" element={<EditItem />} />
      <Route path='/AddItem' element= {<AddItem />} />
      <Route path='/UserInformation' element= {<UserInformation />} />

      <Route path='/Setting' element= {<Setting />} />
     
    </Routes>

    {/* For Testing */}
    {/* Comment The Routes on Top in order to run this. Change the component below for the test that you want to run */}
    {/* < CreateReservation /> */}
    {/* < Inventory /> */}
   
    </div>
  );
}

export default App;
