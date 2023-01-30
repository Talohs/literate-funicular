import React, {useState} from "react";
import { Routes, Route } from 'react-router-dom';
import Home from "./components/Home";
import Register from "./components/Register";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import AlertMessage from "./components/AlertMessage";

function App() {
  const [message, setMessage] = useState(null);
  const [category, setCategory] = useState(null);

  const now = new Date();
  const [loggedIn, setLoggedIn] = useState((localStorage.getItem('token') && new Date(localStorage.getItem('tokenExp')) > now))

  function flashMessage(message, category){
    setMessage(message);
    setCategory(category);
  }

  function logUserIn(){
    setLoggedIn(true);
  }

  function logUserOut(){
    setLoggedIn(false);
    localStorage.removeItem('token');
    localStorage.removeItem('tokenExp');
    flashMessage('You have logged out', 'primary')
  }
  
  return (
    <>
      <Navbar loggedIn={loggedIn} logUserOut={logUserOut}/>
      <div className="container">
        {message ? <AlertMessage message={message} category={category} flashMessage={flashMessage}/> : null}
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/register' element={<Register flashMessage={flashMessage}/>}/>
          <Route path="/login" element={<Login flashMessage={flashMessage} logUserIn={logUserIn}/>}/>
        </Routes>
      </div>
    </>
  );
}

export default App;
