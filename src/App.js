import { Fragment, useState } from "react";
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Header from "./layout/Header";
import LeftNavigation from "./layout/LeftNavigation";
import Footer from "./layout/Footer";
import Dashboard from './pages/Dashboard/Dashboard';
import Branches from './pages/Branches/Branches';
import Inventory from './pages/Inventory/Inventory';
import Orders from './pages/Orders/Orders';
import Promotions from './pages/Promotions/Promotions'
import Login from "./login/Login";

function App() {
  const [isLoggedIn, setLogIn] = useState(false);
  let navigate = useNavigate();

  const loginUser = () => {
    setLogIn(true);
    navigate("../", { replace: true });
  }
  
  return (
      <Fragment>
      { isLoggedIn ?
              <Fragment> 
                <div className="d-flex">
                  <LeftNavigation/>
                  <div className="main-wrap">
                      <Header />
                      <main>
                          <Routes>
                            <Route path='/' exact element={<Navigate to="/dashboard" />}></Route>
                            <Route path='/dashboard' element={<Dashboard/>}></Route>
                            <Route path='/branch' element={<Branches />}></Route>
                            <Route path='/inventory/*' element={<Inventory />}></Route>
                            <Route path='/orders' element={<Orders />}></Route>
                            <Route path='/promotions' element={<Promotions />}></Route>
                            <Route path="*" element={<Navigate to="/" replace />}></Route>
                          </Routes>
                      </main>
                  </div>
                </div>
                <Footer />
              </Fragment>
          :
          <Routes>
              <Route path='/' exact element={<Navigate to="/login" />}></Route>
              <Route path='/login' element={<Login onLogin={loginUser}/>}></Route>
              <Route path="*" element={<Navigate to="/" replace />}></Route>
          </Routes>
      }
      </Fragment>  
  );
}

export default App;
