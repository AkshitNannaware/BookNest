import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

const AdminDashboard = () => {
  const [students, setStudents] = useState([]);
  const [owners, setOwners] = useState([]);
  const [messages, setMessages] = useState([]); // State for contact messages
  const [loading, setLoading] = useState(true);
  const [accessDenied, setAccessDenied] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = '/login';
      return;
    }

    const decoded = jwtDecode(token);
    const role = decoded?.role;

    if (role !== 'admin') {
      setAccessDenied(true);
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        // Fetch students data
        const studentsRes = await fetch('http://localhost:5000/api/admin/students', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Fetch owners data
        const ownersRes = await fetch('http://localhost:5000/api/admin/owners', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Fetch contact messages
        const messagesRes = await fetch('http://localhost:5000/api/admin/messages', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const studentsData = await studentsRes.json();
        const ownersData = await ownersRes.json();
        const messagesData = await messagesRes.json();

        console.log("Fetched Owners Data:", ownersData); // Log owners data to debug

        setStudents(studentsData);
        setOwners(ownersData);
        setMessages(messagesData); // Set contact messages data
      } catch (err) {
        console.error('Error fetching admin data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/login';
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  if (accessDenied) {
    return (
      <div className="text-center mt-10 text-red-600 font-semibold text-xl">
        You do not have permission to view this dashboard.
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <main className="dashboard">
        {/* Students Section */}
        <section className="section">
          <h2 className="text-3xl font-bold mb-8">All Students</h2>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Email</th>
                  {/* <th>Phone</th> */}
                  <th>Total Bookings</th>
                  <th>Last Booking Date</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student, index) => (
                  <tr key={index}>
                    <td>{student.email}</td>
                    {/* <td>{student.phone || 'N/A'}</td> */}
                    <td>{student.totalBookings}</td>
                    <td>{student.lastBookingDate || 'N/A'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Owners Section */}
        <section className="section">
          <h2 className="text-3xl font-bold mb-8">All Owners</h2>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Email</th>
                  {/* <th>Mobile</th> */}
                  <th>Last Upload</th>
                  <th>Total Earnings</th>
                </tr>
              </thead>
              <tbody>
                {owners.map((owner, index) => (
                  <tr key={index}>
                    <td>{owner.email}</td>
                    {/* <td>{owner.mobile || 'N/A'}</td> */}
                    <td>{owner.lastUpload ? new Date(owner.lastUpload).toLocaleString() : 'N/A'}</td>
                    <td>{owner.totalEarnings}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Contact Messages Section */}
        <section className="section">
          <h2 className="text-3xl font-bold mb-8">Contact Messages</h2>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Message</th>
                  <th>Sent At</th>
                </tr>
              </thead>
              <tbody>
                {messages.map((message, index) => (
                  <tr key={index}>
                    <td>{message.name}</td>
                    <td>{message.email}</td>
                    <td>{message.message}</td>
                    <td>{new Date(message.createdAt).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;