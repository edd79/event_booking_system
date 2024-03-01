// // components/EventDetail.js
// import React, { Component } from 'react';
// import axios from 'axios';
// import TicketBooking from './TicketBooking';

// class EventDetail extends Component {
//   state = {
//     event: null,
//   };

//   async componentDidMount() {
//     const { match } = this.props;
//     const eventId = match.params.id;

//     try {
//       const response = await axios.get(`http://localhost:4000/events/${eventId}`);
//       this.setState({ event: response.data });
//     } catch (error) {
//       console.error(error);
//     }
//   }

//   render() {
//     const { event } = this.state;

//     if (!event) {
//       return <div>Loading...</div>;
//     }

//     return (
//       <div>
//         <h1>{event.name}</h1>
//         <p>VIP Ticket Price: ${event.vipTicketPrice}</p>
//         <p>Regular Ticket Price: ${event.regularTicketPrice}</p>
//         <p>Max Attendees: {event.maxAttendees}</p>

//         <TicketBooking eventId={event.id} />
//       </div>
//     );
//   }
// }

// export default EventDetail;

// components/EventDetail.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import TicketBooking from './TicketBooking';
import { Link } from 'react-router-dom';


function EventDetail() {
  const [event, setEvent] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/events/${id}`);
        setEvent(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchEvent();
  }, [id]);

  if (!event) {
    return <div>Loading...</div>;
  }

  return (
    <div>
    <Link to="/" className="back-to-events">Back to Events</Link>
      <h1>{event.name}</h1>
      <p>VIP Ticket Price: Ksh {event.vipTicketPrice}</p>
      <p>Regular Ticket Price: Ksh {event.regularTicketPrice}</p>
      <p>Max Attendees: {event.maxAttendees}</p>

      <TicketBooking eventId={event.id} />
    </div>
  );
}

export default EventDetail;