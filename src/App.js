import React from 'react';
import Sidebar from './Components/Sidebar/Sidebar';
import Dashboard from './Pages/Dashboard/Dashboard';
import { Switch, Route } from "react-router-dom";
import Users from './Pages/Users/Users';
import Logout from './Pages/Logout/Logout';
import Analytics from './Pages/Analytics/Analytics';
import News from './Pages/News/News';
import './App.css'
import View from './Components/View';
import AddEdit from './Components/AddEdit';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>

      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    <div className="app">
      <div className="container-left">
        <Sidebar />
      </div>
      <div className="container-right">
        <Switch>
          <Route exact path='/'>
            <Dashboard />
          </Route>

          <Route exact path='/users'>
            <Users />
          </Route>

          <Route exact path='/update/:id'>
            <AddEdit />
          </Route>

          <Route exact path='/view/:id'>
            <View />
          </Route>

          <Route exact path='/news'>
            <News />
          </Route>

          <Route exact path='/analytics'>
            <Analytics />
          </Route>

          <Route exact path='/logout'>
            <Logout />
          </Route>

        </Switch>
      </div>

    </div>

    </>
  );
}

export default App;
