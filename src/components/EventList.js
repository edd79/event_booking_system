// components/EventList.js
import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

class EventList extends Component {
  state = {
    events: [],
  };

  async componentDidMount() {
    try {
      const response = await axios.get('http://localhost:4000/events');
      this.setState({ events: response.data });
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    const { events } = this.state;

    return (
      <div>
        <Navbar />
        <h1>Active Events</h1>
        <div className="event-list">
          {events.map((event) => (
            <div key={event.id} className="event-card">
              <h2 className="event-title">{event.name}</h2>
              <p>VIP Ticket Price: Ksh {event.vipTicketPrice}</p>
              <p>Regular Ticket Price: Ksh {event.regularTicketPrice}</p>
              <p>Max Attendees: {event.maxAttendees}</p>
              <Link to={`/event/${event.id}`} className="details-link">View Details</Link>
            </div>
          ))}
        </div>
        <Footer />
      </div>
    );
  }
}

export default EventList;