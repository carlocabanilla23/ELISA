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
import Inventory from './pages/Inventory/Inventory';
import Location from './component/Location';
import Reservations from './pages/Reservation/Reservations';
import Reservation from './pages/Reservation/Reservation';
import UserInformation from './component/UserInformation';
import RoomLocationItem from './component/RoomLocationItem';
import AddItemToLocation from './component/AddItemToLocation';
import StorageLocationItem from './component/StorageLocationItem';
import ItemInformation from './component/ItemInformation';
import Setting from './component/Setting';
import CreateReservation from './component/CreateReservation';
import Signup from './component/Signup';
import AssignedItems from './component/AssignedItems';
import UnassignedItems from './component/UnassignedItems';
import ProtectedRoute from './Services/Routes/ProtectedRoute';
import ViewItemInfo from './mobile/ViewItemInfo-m';
import Notification from './pages/Notification';
import Verify from './component/Verify';
import OrderHistory from './pages/OrderHistory';
import Sidebar from './component/Sidebar';
import Header from './component/Header';

Amplify.configure(awsExport);

function App() {
  const [user] = useState(null);
  const [nav,setNav] = useState();

  
  return (
    <>
    <div >
    {/* Master Route */}
    <div className='nav'>
          {nav}
    </div>
    <Routes>
      {/* Login Page */}
      <Route path='/' element= {<Login /> } />

      <Route path='/Verify/:param' element= {<Verify /> } />
      <Route path='/Signup' element= {<Signup /> } />

      
      <Route
        path='/Home'
        element= {
          <ProtectedRoute user={user}>
            <Sidebar />
            <Header />
            <Home />
          </ProtectedRoute>
      } />
      
      <Route
        path='/Inventory'
        element= {
          <ProtectedRoute user={user}>
            <Sidebar />
            <Header />
              <Inventory  />
          </ProtectedRoute>
      } />

      <Route path='/RoomLocation/RoomLocationItem/:param'
        element= {
          <ProtectedRoute user={user}>
            <Sidebar />
            <Header />
              <RoomLocationItem />
          </ProtectedRoute>
      } />
  
      <Route path='/Location' 
        element= {
          <ProtectedRoute user={user}>
            <Sidebar />
            <Header />
              <Location /> 
          </ProtectedRoute> } />

      <Route path='/RoomLocation/StorageLocationItem/:param' 
        element= {
          <ProtectedRoute user={user}>
            <Sidebar />
            <Header />
              <StorageLocationItem /> 
          </ProtectedRoute> } />

      <Route path='/AssignedItems' 
        element= {
          <ProtectedRoute user={user}>
            <Sidebar />
            <Header />
              <AssignedItems /> 
          </ProtectedRoute> } />
      <Route path='/UnassignedItems' 
        element= {
          <ProtectedRoute user={user}>
            <Sidebar />
            <Header />
              <UnassignedItems /> 
          </ProtectedRoute> } />
      
      
      <Route path='/AddItemToLocation' 
        element= {
          <ProtectedRoute user={user}>
            <Sidebar />
            <Header />
              <AddItemToLocation /> 
          </ProtectedRoute> } />
  
      <Route path='/Reservations' 
        element= {
          <ProtectedRoute user={user}>
            <Sidebar />
            <Header />
              <Reservations /> 
          </ProtectedRoute> } />

      <Route path='/Reservation/:param/:param1/:param2' 
        element= {
          <ProtectedRoute user={user}>
            <Sidebar />
            <Header />
              <Reservation /> 
          </ProtectedRoute> } />

      <Route path='/CreateReservation'
        element= {
          <ProtectedRoute user={user}>
            <Sidebar />
            <Header />
              <CreateReservation /> 
          </ProtectedRoute> } />

      <Route path='/EditUser'
        element= {
          <ProtectedRoute user={user}>
            <Sidebar />
            <Header />
              <EditUser /> 
          </ProtectedRoute> } /> 

      <Route path='/Users' 
        element= {
          <ProtectedRoute user={user}>
            <Sidebar />
            <Header />
              <Users /> 
          </ProtectedRoute> } />

      <Route path='/Users/:param' 
        element= {
          <ProtectedRoute user={user}>
            <Sidebar />
            <Header />
              <Users /> 
          </ProtectedRoute> } />

      <Route path='/CreateUser' element= {
          <ProtectedRoute user={user}>
            <Sidebar />
            <Header />
              <CreateUser /> 
          </ProtectedRoute> } />
      
      <Route path='/ItemInformation' 
          element= {
            <ProtectedRoute user={user}>
              <Sidebar />
            <Header />
                <ItemInformation /> 
            </ProtectedRoute> } />
            
      <Route path="/EditItem" 
        element={
          <ProtectedRoute user={user}>
            <Sidebar />
            <Header />
            <EditItem /> 
          </ProtectedRoute> } />

      <Route path='/AddItem' 
        element= {
          <ProtectedRoute user={user}>
            <Sidebar />
            <Header />
              <AddItem /> 
          </ProtectedRoute> } />

      <Route path='/UserInformation'
        element= {
          <ProtectedRoute user={user}>
            <Sidebar />
            <Header />
              <UserInformation /> 
          </ProtectedRoute> } />

      <Route path='/Setting'
        element= {
        <ProtectedRoute user={user}>
          <Sidebar />
            <Header />
            <Setting />
        </ProtectedRoute> } />
        
      <Route path='/Notification'
        element= {
        <ProtectedRoute user={user}>
          <Sidebar />
            <Header />
            <Notification />
      </ProtectedRoute> } />

      <Route path='/ViewItemInfo/:param'
        element= {
        <ProtectedRoute user={user}>
          <Sidebar />
            <Header />
            <ViewItemInfo />
        </ProtectedRoute> } />

      <Route path='/OrderHistory/:param'
        element= {
        <ProtectedRoute user={user}>
          <Sidebar />
            <Header />
            < OrderHistory />
        </ProtectedRoute> } />
       
    </Routes>

    {/* For Testing */}
    {/* Comment The Routes on Top in order to run this. Change the component below for the test that you want to run */}
    {/* < CreateReservation /> */}
    {/* < Inventory /> */}
   
    </div>

    </>
  );
}

export default App;
