import Login from './component/Login';
import Home from './component/Home';
import React, { useEffect } from 'react';
import { Amplify, API } from 'aws-amplify';
import awsExport from './aws-exports';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { createBrowserRounter, RouterProvider, Routes, Link, Route } from 'react-router-dom';


Amplify.configure(awsExport);

function App() {

  // API.post("userpool", "/users/", {
  //   body: {
  //     userid: "new item useridaaa",
  //     password: "new item password",
  //     username: "new item username",
  //     name: "new item name",
  //     type : "new attribute"
  //   }
  // });

  // useEffect( () => {
  //     API.get("userpool","/users/ads").then( res => console.log(res));
  // },[]);


  return (
    <div>
    <Routes>
      <Route path='/' element= {<Login />} />
      <Route path='/Home' element= {<Home />} />
    </Routes>
    </div>
  );
}

export default App;
