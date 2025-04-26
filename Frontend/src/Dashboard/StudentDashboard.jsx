// import React, { useEffect, useState } from 'react';

// const RentedRooms = () => {
//   const [rentedRooms, setRentedRooms] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchRentedRooms = async () => {
//       try {
//         const userId = localStorage.getItem('userId'); // Assuming user ID is stored in localStorage
//         const response = await fetch(`http://localhost:5000/api/rooms/rented/${userId}`);
//         const data = await response.json();
//         setRentedRooms(data);
//       } catch (error) {
//         console.error('Error fetching rented rooms:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchRentedRooms();
//   }, []);

//   if (loading) {
//     return <p>Loading...</p>;
//   }

//   return (
//     <div className="rented-rooms-container">
//       <h2>My Rented Rooms</h2>
//       {rentedRooms.length === 0 ? (
//         <p>You have not rented any rooms yet.</p>
//       ) : (
//         <div className="rented-rooms-grid">
//           {rentedRooms.map((room) => (
//             <div key={room._id} className="rented-room-card">
//               <img src={room.photos[0]} alt={room.title} className="room-image" />
//               <h3>{room.title}</h3>
//               <p>{room.description}</p>
//               <p><strong>Rent:</strong> Rs. {room.rent}</p>
//               <p><strong>Location:</strong> {room.location}</p>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default RentedRooms;

import React, { useEffect, useState } from 'react';

const StudentDashboard = () => {
  const [rentedRooms, setRentedRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRentedRooms = async () => {
      try {
        const userId = localStorage.getItem('userId'); // Assuming user ID is stored in localStorage
        const response = await fetch(`http://localhost:5000/api/rooms/rented/${userId}`);
        const data = await response.json();
        setRentedRooms(data);
      } catch (error) {
        console.error('Error fetching rented rooms:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRentedRooms();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="rented-rooms-container">
      <h2>My Rented Rooms</h2>
      {rentedRooms.length === 0 ? (
        <p>You have not rented any rooms yet.</p>
      ) : (
        <div className="rented-rooms-grid">
          {rentedRooms.map((room) => (
            <div key={room._id} className="rented-room-card">
              <img src={room.photos[0]} alt={room.title} className="room-image" />
              <h3>{room.title}</h3>
              <p>{room.description}</p>
              <p><strong>Rent:</strong> Rs. {room.rent}</p>
              <p><strong>Location:</strong> {room.location}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StudentDashboard;