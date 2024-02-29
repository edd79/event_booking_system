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


// instance.render is not a function
// TypeError: instance.render is not a function
//     at finishClassComponent (http://localhost:3000/static/js/bundle.js:27659:35)
//     at updateClassComponent (http://localhost:3000/static/js/bundle.js:27616:28)
//     at beginWork (http://localhost:3000/static/js/bundle.js:29242:20)
//     at HTMLUnknownElement.callCallback (http://localhost:3000/static/js/bundle.js:14239:18)
//     at Object.invokeGuardedCallbackDev (http://localhost:3000/static/js/bundle.js:14283:20)
//     at invokeGuardedCallback (http://localhost:3000/static/js/bundle.js:14340:35)
//     at beginWork$1 (http://localhost:3000/static/js/bundle.js:34204:11)
//     at performUnitOfWork (http://localhost:3000/static/js/bundle.js:33452:16)
//     at workLoopSync (http://localhost:3000/static/js/bundle.js:33375:9)
//     at renderRootSync (http://localhost:3000/static/js/bundle.js:33348:11)