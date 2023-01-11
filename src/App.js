import Login from './component/Login';
import Home from './component/Home';
import React, { useEffect, useState } from 'react';
import { Amplify, API } from 'aws-amplify';
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
import UnassignedItems from './component/UnassignedItems';
import ProtectedRoute from './component/Routes/ProtectedRoute';
import ViewItemInfo from './component/mobile/ViewItemInfo-m';

Amplify.configure(awsExport);

function App() {
  const [user] = useState(null);

  useEffect( () => {
  },[]);

  return (
    <div >
    {/* Master Route */}

    <Routes>
      {/* Login Page */}
      <Route path='/' element= {<Login /> } />
      <Route path='/CreateNormalUser' element= {<CreateNormalUser /> } />
      <Route
        path='/Home'
        element= {
          <ProtectedRoute user={user}>
            <Home />
          </ProtectedRoute>
      } />

      <Route
        path='/Inventory'
        element= {
          <ProtectedRoute user={user}>
              <Inventory  />
          </ProtectedRoute>
      } />

      <Route
        path='/RoomLocation'
        element= {
          <ProtectedRoute user={user}>
              <RoomLocation  />
          </ProtectedRoute>
      } />

      <Route path='/RoomLocation/RoomLocationItem'
        element= {
          <ProtectedRoute user={user}>
              <RoomLocationItem />
          </ProtectedRoute>
      } />
  
      <Route path='/StorageLocation' 
        element= {
          <ProtectedRoute user={user}>
              <StorageLocation /> 
          </ProtectedRoute> } />

      <Route path='/RoomLocation/StorageLocationItem' 
        element= {
          <ProtectedRoute user={user}>
              <StorageLocationItem /> 
          </ProtectedRoute> } />

      <Route path='/AssignedItems' 
        element= {
          <ProtectedRoute user={user}>
              <AssignedItems /> 
          </ProtectedRoute> } />
      <Route path='/UnassignedItems' 
        element= {
          <ProtectedRoute user={user}>
              <UnassignedItems /> 
          </ProtectedRoute> } />
      
      
      <Route path='/AddItemToLocation' 
        element= {
          <ProtectedRoute user={user}>
              <AddItemToLocation /> 
          </ProtectedRoute> } />
  
      <Route path='/Reservations' 
        element= {
          <ProtectedRoute user={user}>
              <Reservations /> 
          </ProtectedRoute> } />

      <Route path='/Reservation' 
        element= {
          <ProtectedRoute user={user}>
              <Reservation /> 
          </ProtectedRoute> } />

      <Route path='/CreateReservation'
        element= {
          <ProtectedRoute user={user}>
              <CreateReservation /> 
          </ProtectedRoute> } />

      <Route path='/EditUser'
        element= {
          <ProtectedRoute user={user}>
              <EditUser /> 
          </ProtectedRoute> } /> 
      <Route path='/Users' 
        element= {
          <ProtectedRoute user={user}>
              <Users /> 
          </ProtectedRoute> } />

      <Route path='/CreateUser' element= {
          <ProtectedRoute user={user}>
              <CreateUser /> 
          </ProtectedRoute> } />
      
      <Route path='/ItemInformation' 
          element= {
            <ProtectedRoute user={user}>
                <ItemInformation /> 
            </ProtectedRoute> } />
            
      <Route path="/EditItem" 
        element={
          <ProtectedRoute user={user}>
            <EditItem /> 
          </ProtectedRoute> } />

      <Route path='/AddItem' 
        element= {
          <ProtectedRoute user={user}>
              <AddItem /> 
          </ProtectedRoute> } />

      <Route path='/UserInformation'
        element= {
          <ProtectedRoute user={user}>
              <UserInformation /> 
          </ProtectedRoute> } />

      <Route path='/Setting'
        element= {
        <ProtectedRoute user={user}>
            <Setting />
        </ProtectedRoute> } />

      <Route path='/ViewItemInfo/:param'
        element= {
        <ProtectedRoute user={user}>
            <ViewItemInfo />
        </ProtectedRoute> } />
    </Routes>

    {/* For Testing */}
    {/* Comment The Routes on Top in order to run this. Change the component below for the test that you want to run */}
    {/* < CreateReservation /> */}
    {/* < Inventory /> */}
   
    </div>
  );
}

export default App;
