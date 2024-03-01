import React, { Component } from 'react';
import axios from 'axios';

class Reservations extends Component {
  state = {
    reservations: [],
    events: [],
    isLoading: true,
  };

  componentDidMount() {
    this.fetchReservations();
    this.fetchEvents();
  }

  fetchReservations = async () => {
    try {
      const response = await axios.get('http://localhost:4000/reservations');
      console.log('Reservations:', response.data);
      this.setState({ reservations: response.data , isLoading: false});
    } catch (error) {
      console.error('Error fetching reservations:', error);
      this.setState({ isLoading: false });
    }
  };

  fetchEvents = async () => {
    try {
      const response = await axios.get('http://localhost:4000/events');
      console.log('Event:', response.data);
      this.setState({ events: response.data , isLoading: false});
    } catch (error) {
      console.error('Error fetching reservations:', error);
      this.setState({ isLoading: false });
    }
  };

  render() {
    if (this.state.isLoading) {
      return <div>Loading...</div>;
    }
  return (
    <div className='reservations-list'>
      <h2>Reservations</h2>
      {this.state.reservations.map(reservation => {
        const event = this.state.events.find(e => e.id === reservation.eventId);

        return (
          <div key={reservation.id} className='reservations-card'>
            <p>Reservation ID: {reservation.id}</p>
            <p>Event: {event ? event.name : 'Event not found'}</p>
            <p>VIP Tickets: {reservation.vipTickets}</p>
            <p>Regular Tickets: {reservation.regularTickets}</p>
          </div>
        );
      })}
    </div>
  );
}
}

export default Reservations;