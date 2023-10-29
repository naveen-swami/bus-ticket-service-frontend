import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Login from './components/Authentication/LoginForm';
import Register from './components/Authentication/RegistrationForm';
import BusSearch from './components/Bus/BusSearch';
import SeatSelection from './components/Bus/SeatSelection';
import Booking from './components/Bus/Booking';
// import BookingList from './components/Bus/BookingList';

function App() {
  return (
    <Router>
      <div className="App">
        <header>
          <nav>
            <ul>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/register">Register</Link>
              </li>
              <li>
                <Link to="/bus/search">Bus Search</Link>
              </li>
              <li>
                <Link to="/bus/seat-selection">Seat Selection</Link>
              </li>
              <li>
                <Link to="/bus/booking">Booking</Link>
              </li>
              <li>
                <Link to="/bus/bookings">Booking List</Link>
              </li>
            </ul>
          </nav>
        </header>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/bus/search" element={<BusSearch />} />
          <Route path="/bus/seat-selection" element={<SeatSelection />} />
          <Route path="/bus/booking" element={<Booking />} />
          {/* <Route path="/bus/bookings" component={BookingList} /> */}
          {/* Add more routes for other components */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
