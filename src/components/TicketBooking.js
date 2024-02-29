// components/TicketBooking.js
import React, { Component } from 'react';
import axios from 'axios';

class TicketBooking extends Component {
  state = {
    vipTickets: 0,
    regularTickets: 0,
  };

  handleInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const { vipTickets, regularTickets } = this.state;
    const { eventId } = this.props;

    try {
      const response = await axios.post('http://localhost:4000/reservations', {
        eventId,
        vipTickets,
        regularTickets,
      });

      console.log(response.data);
      alert('Tickets reserved successfully!');
    } catch (error) {
      console.error(error);
      alert('Failed to reserve tickets. Please try again.');
    }
  };

  render() {
    const { vipTickets, regularTickets } = this.state;

    return (
      <div>
        <h1>Reserve Tickets</h1>

        <form onSubmit={this.handleSubmit}>
          <label>
            VIP Tickets:
            <input
              type="number"
              name="vipTickets"
              value={vipTickets}
              onChange={this.handleInputChange}
              min="0"
            />
          </label>

          <label>
            Regular Tickets:
            <input
              type="number"
              name="regularTickets"
              value={regularTickets}
              onChange={this.handleInputChange}
              min="0"
            />
          </label>

          <button type="submit">Reserve Tickets</button>
        </form>
      </div>
    );
  }
}

export default TicketBooking;

// // components/TicketBooking.js
// import React, { useState } from 'react';
// import axios from 'axios';
// import Modal from './Modal';

// function TicketBooking({ eventId }) {
//   const [showModal, setShowModal] = useState(false);
//   const [modalMessage, setModalMessage] = useState('');

//   const bookTicket = async () => {
//     try {
//         console.log('were here');
//       //const response = await axios.post(`http://localhost:4000/book/${eventId}`);
//       const response = await axios.post(`http://localhost:4000/bookings`, {
//       eventId: eventId,
//     });
//       if (response.data.success) {
//         console.log('were here1');
//         setModalMessage('Ticket booked successfully!');
//       } else {
//         console.log('were here2');
//         setModalMessage('Failed to book ticket.');
//       }
//       setShowModal(true);
//     } catch (error) {
//         console.log('were here3');
//       console.error(error);
//       setModalMessage('An error occurred while booking the ticket.');
//       setShowModal(true);
//     }
//   };

//   const closeModal = () => {
//     setShowModal(false);
//   };

//   return (
//     <div>
//       <button onClick={bookTicket}>Book Ticket</button>
//       {showModal && <Modal message={modalMessage} onClose={closeModal} />}
//     </div>
//   );
// }

// export default TicketBooking;