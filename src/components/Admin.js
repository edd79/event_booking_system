// components/Admin.js
import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Admin extends Component {
  state = {
    events: [],
    name: '',
    vipTicketPrice: '',
    regularTicketPrice: '',
    maxAttendees: '',
    editMode: false,
    eventIdToEdit: null,
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

  render() {
    const { events, name, vipTicketPrice, regularTicketPrice, maxAttendees, editMode } = this.state;

    return (
      <div>
        <Link to="/">Event List</Link>
        <h1>Admin Panel</h1>

        <form onSubmit={this.handleSubmit}>
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
          <button type="submit">{editMode ? 'Update' : 'Add'} Event</button>
        </form>

        <ul>
          {events.map((event) => (
            <li key={event.id}>
              {event.name} - VIP: ${event.vipTicketPrice} - Regular: ${event.regularTicketPrice} - Max: {event.maxAttendees}
              <button onClick={() => this.handleEdit(event)}>Edit</button>
              <button onClick={() => this.handleDelete(event.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Admin;