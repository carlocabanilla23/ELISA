import React, { useState, /*lazy, Suspense*/ } from 'react';
import { Amplify, /* API */ } from 'aws-amplify';
import awsExport from './aws-exports';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Routes, Route } from 'react-router-dom';

import Login from './component/Login';
import Home from './component/Home';
import Users from './component/Users';
import CreateUser from './component/CreateUser';
import AddItem from './component/AddItem';
import EditItem from './component/EditItem';
import EditUser from './component/EditUser';
import Inventory from './pages/Inventory/Inventory';
import Location from './component/Location';
import Reservations from './pages/Reservation/Reservations';
import Reservation from './pages/Reservation/Reservation';
import RoomLocationItem from './component/RoomLocationItem';
import AddItemToLocation from './component/AddItemToLocation';
import StorageLocationItem from './component/StorageLocationItem';
import ItemInformation from './component/ItemInformation';
import Setting from './component/Setting';
import CreateReservation from './pages/Reservation/CreateReservation';
import Signup from './component/Signup';
import AssignedItems from './component/AssignedItems';
import UnassignedItems from './component/UnassignedItems';
import ProtectedRoute from './Services/Routes/ProtectedRoute';
import ViewItemInfo from './mobile/ViewItemInfo-m';
import Notification from './pages/Notification';
import Verify from './component/Verify';
import OrderHistory from './pages/OrderHistory';
import Reader from './pages/RFID/Reader';
import ForgotPassword from './component/ForgotPassword';
import ResetPassword from './component/ResetPassword'

// const Login = lazy(() => import( './component/Login'));
// const Home = lazy(() => import( './component/Home'));
// const Users = lazy(() => import( './component/Users'));
// const CreateUser = lazy(() => import( './component/CreateUser'));
// const AddItem = lazy(() => import( './component/AddItem'));
// const EditItem = lazy(() => import( './component/EditItem'));
// const EditUser = lazy(() => import( './component/EditUser'));
// const Inventory = lazy(() => import( './pages/Inventory/Inventory'));
// const Location = lazy(() => import( './component/Location'));
// const Reservations = lazy(() => import( './pages/Reservation/Reservations'));
// const Reservation = lazy(() => import( './pages/Reservation/Reservation'));
// const UserInformation = lazy(() => import( './component/UserInformation'));
// const RoomLocationItem = lazy(() => import( './component/RoomLocationItem'));
// const AddItemToLocation = lazy(() => import( './component/AddItemToLocation'));
// const StorageLocationItem = lazy(() => import( './component/StorageLocationItem'));
// const ItemInformation = lazy(() => import( './component/ItemInformation'));
// const Setting = lazy(() => import( './component/Setting'));
// const CreateReservation = lazy(() => import( './component/CreateReservation'));
// const Signup = lazy(() => import( './component/Signup'));
// const AssignedItems = lazy(() => import( './component/AssignedItems'));
// const UnassignedItems = lazy(() => import( './component/UnassignedItems'));
// const ProtectedRoute = lazy(() => import( './Services/Routes/ProtectedRoute'));
// const ViewItemInfo = lazy(() => import( './mobile/ViewItemInfo-m'));
// const Notification = lazy(() => import( './pages/Notification'));
// const Verify = lazy(() => import( './component/Verify'));
// const OrderHistory = lazy(() => import( './pages/OrderHistory'));


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
      <Route path='/ForgotPassword' element= {<ForgotPassword /> } />
      <Route path='/ResetPassword/:param' element= {<ResetPassword /> } />

      {/* Route below for testing */}
      {/* <Route path='/ResetPassword' element= {<ResetPassword /> } /> */}

      <Route path='/Reader'element= { < Reader /> } />

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

      <Route path='/Location/:param'
        element= {
          <ProtectedRoute user={user}>
              <RoomLocationItem />
          </ProtectedRoute>
      } />
  
      <Route path='/Location' 
        element= {
          <ProtectedRoute user={user}>
          
              <Location /> 
          </ProtectedRoute> } />

      <Route path='/RoomLocation/StorageLocationItem/:param' 
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

      <Route path='/Reservation/:param/:param1/:param2' 
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

      <Route path='/Users/:param' 
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

      <Route path='/Setting'
        element= {
        <ProtectedRoute user={user}>
            <Setting />
        </ProtectedRoute> } />
        
      <Route path='/Notification'
        element= {
        <ProtectedRoute user={user}>
            <Notification />
      </ProtectedRoute> } />

      <Route path='/ViewItemInfo/:param'
        element= {
        <ProtectedRoute user={user}>
            <ViewItemInfo />
        </ProtectedRoute> } />

      <Route path='/OrderHistory/:param'
        element= {
        <ProtectedRoute user={user}>
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
