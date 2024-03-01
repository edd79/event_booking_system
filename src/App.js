// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Admin from './components/Admin';
import EventList from './components/EventList';
import EventDetail from './components/EventDetail';
import TicketBooking from './components/TicketBooking';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/admin" element={<Admin />} />
        <Route path="/event/:id" element={<EventDetail />} />
        <Route path="/book/:id" element={<TicketBooking />} />
        <Route path="/" element={<EventList />} />
      </Routes>
    </Router>
  );
}

export default App;
