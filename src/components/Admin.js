// components/Admin.js
import React, { Component } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import Reservations from './Reservations';
import Footer from './Footer';

class Admin extends Component {
  state = {
    events: [],
    name: '',
    vipTicketPrice: '',
    regularTicketPrice: '',
    maxAttendees: '',
    editMode: false,
    eventIdToEdit: null,
    showReservations: false,
  };

  componentDidMount() {
    this.fetchEvents();
  }

  fetchEvents = async () => {
    const response = await axios.get('http://localhost:4000/events');
    this.setState({ events: response.data });
  };

  handleInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const { name, vipTicketPrice, regularTicketPrice, maxAttendees, editMode, eventIdToEdit } = this.state;

    if (editMode) {
      await axios.put(`http://localhost:4000/events/${eventIdToEdit}`, {
        name,
        vipTicketPrice,
        regularTicketPrice,
        maxAttendees,
      });
    } else {
      await axios.post('http://localhost:4000/events', {
        name,
        vipTicketPrice,
        regularTicketPrice,
        maxAttendees,
      });
    }

    this.setState({
      name: '',
      vipTicketPrice: '',
      regularTicketPrice: '',
      maxAttendees: '',
      editMode: false,
      eventIdToEdit: null,
    });

    this.fetchEvents();
  };

  handleEdit = (event) => {
    this.setState({
      name: event.name,
      vipTicketPrice: event.vipTicketPrice,
      regularTicketPrice: event.regularTicketPrice,
      maxAttendees: event.maxAttendees,
      editMode: true,
      eventIdToEdit: event.id,
    });
  };

  handleDelete = async (id) => {
    await axios.delete(`http://localhost:4000/events/${id}`);
    this.fetchEvents();
  };

  toggleReservations = () => {
  this.setState(prevState => ({ showReservations: !prevState.showReservations }));
};

  render() {
    const { events, name, vipTicketPrice, regularTicketPrice, maxAttendees, editMode } = this.state;

    return (
      <div className='admin-panel'>
        <Navbar />
        <h1 className='admin-title'>Admin Panel</h1>

        <form onSubmit={this.handleSubmit} className='admin-form'>
          <input
            type="text"
            name="name"
            value={name}
            onChange={this.handleInputChange}
            placeholder="Event Name"
            required
          />
          <input
            type="number"
            name="vipTicketPrice"
            value={vipTicketPrice}
            onChange={this.handleInputChange}
            placeholder="VIP Ticket Price"
            required
          />
          <input
            type="number"
            name="regularTicketPrice"
            value={regularTicketPrice}
            onChange={this.handleInputChange}
            placeholder="Regular Ticket Price"
            required
          />
          <input
            type="number"
            name="maxAttendees"
            value={maxAttendees}
            onChange={this.handleInputChange}
            placeholder="Max Attendees"
            required
          />
          <button type="submit" className='admin-button'>{editMode ? 'Update' : 'Add'} Event</button>
        </form>

        <button onClick={this.toggleReservations}>
          {this.state.showReservations ? 'Hide Reservations' : 'Show Reservations'}
        </button>

        {this.state.showReservations && <Reservations />}

        <ul className='admin-event-list'>
          {events.map((event) => (
          <li key={event.id} className="admin-event-item">
          <div className="event-actions">
            <button onClick={() => this.handleEdit(event)} className='button-edit'>Edit</button>
            <button onClick={() => this.handleDelete(event.id)} className='button-delete'>Delete</button>
          </div>
          <h2>{event.name}</h2>
          <p>VIP: Ksh {event.vipTicketPrice}</p>
          <p>Regular: Ksh {event.regularTicketPrice}</p>
          <p>Max: {event.maxAttendees}</p>
          </li>
      ))}
        </ul>
        <Footer />
      </div>
    );
  }
}

export default Admin;