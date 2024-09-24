import React from 'react';
import Final from './final';
import {BrowserRouter,Routes,Route} from "react-router-dom"
import SignIn from './Signin';
// import Dashboard from './dasboard';
import PrivateRoute from './PrivateRoute';


function App() {
  return<>
  <BrowserRouter>
  <Routes>
    <Route path="/" element={<Final />} />
    <Route path="/signin" element={<SignIn />} />
      {/* <Route 
            path="/dashboard" 
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            } 
      /> */}
  </Routes>
  </BrowserRouter>
  </>
}

export default App;
