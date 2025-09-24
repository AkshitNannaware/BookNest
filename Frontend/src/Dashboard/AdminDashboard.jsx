import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { FiLogOut, FiUsers, FiHome, FiMail, FiDollarSign, FiCalendar, FiUser } from 'react-icons/fi';
import { API_URL } from '../config';
import { FaChalkboardTeacher, FaUserGraduate } from 'react-icons/fa';

const AdminDashboard = () => {
  const [students, setStudents] = useState([]);
  const [owners, setOwners] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [accessDenied, setAccessDenied] = useState(false);
  const [activeTab, setActiveTab] = useState('students');
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalOwners: 0,
    totalMessages: 0,
    totalEarnings: 0
  });

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
        // Fetch all data
        const [studentsRes, ownersRes, messagesRes] = await Promise.all([
          fetch(`${API_URL}/api/admin/students`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch(`${API_URL}/api/admin/owners`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch(`${API_URL}/api/admin/messages`, {
            headers: { Authorization: `Bearer ${token}` },
          })
        ]);

        const studentsData = await studentsRes.json();
        const ownersData = await ownersRes.json();
        const messagesData = await messagesRes.json();

        // Calculate statistics
        const totalEarnings = ownersData.reduce((sum, owner) => sum + (owner.totalEarnings || 0), 0);

        setStudents(studentsData);
        setOwners(ownersData);
        setMessages(messagesData);
        setStats({
          totalStudents: studentsData.length,
          totalOwners: ownersData.length,
          totalMessages: messagesData.length,
          totalEarnings: totalEarnings
        });
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

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );

  if (accessDenied) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-md">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h2>
          <p className="text-gray-600 mb-6">You do not have permission to view this dashboard.</p>
          <button 
            onClick={handleLogout}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Return to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
          >
            <FiLogOut /> Logout
          </button>
        </div>
      </header>

      {/* Stats Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6 flex items-center">
            <div className="p-3 rounded-full bg-blue-100 text-blue-600 mr-4">
              <FaUserGraduate size={24} />
            </div>
            <div>
              <p className="text-gray-500 text-sm admin-I">Total Students</p>
              <p className="text-2xl font-bold">{stats.totalStudents}</p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6 flex items-center">
            <div className="p-3 rounded-full bg-green-100 text-green-600 mr-4">
              <FaChalkboardTeacher size={24} />
            </div>
            <div>
              <p className="text-gray-500 text-sm admin-I">Total Owners</p>
              <p className="text-2xl font-bold">{stats.totalOwners}</p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6 flex items-center">
            <div className="p-3 rounded-full bg-purple-100 text-purple-600 mr-4">
              <FiMail size={24} />
            </div>
            <div>
              <p className="text-gray-500 text-sm admin-I">Messages</p>
              <p className="text-2xl font-bold admin-I">{stats.totalMessages}</p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6 flex items-center">
            <div className="p-3 rounded-full bg-yellow-100 text-yellow-600 mr-4 ">
              <FiDollarSign size={24} />
            </div>
            <div>
              <p className="text-gray-500 text-sm admin-I">Total Earnings</p>
              <p className="text-2xl font-bold">${stats.totalEarnings.toFixed(2)}</p>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-lg shadow mb-6">
          <nav className="flex overflow-x-auto">
            <button
              onClick={() => setActiveTab('students')}
              className={`px-6 py-3 font-medium text-sm flex items-center ${activeTab === 'students' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            >
              <FaUserGraduate className="mr-2 admin" /> Students
            </button>
            <button
              onClick={() => setActiveTab('owners')}
              className={`px-6 py-3 font-medium text-sm flex items-center ${activeTab === 'owners' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            >
              <FaChalkboardTeacher className="mr-2 admin" /> Owners
            </button>
            <button
              onClick={() => setActiveTab('messages')}
              className={`px-6 py-3 font-medium text-sm flex items-center ${activeTab === 'messages' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            >
              <FiMail className="mr-2 admin" /> Messages
            </button>
          </nav>
        </div>

        {/* Content Sections */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {/* Students Table */}
          {activeTab === 'students' && (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Bookings
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Last Booking
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {students.map((student, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {student.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {student.totalBookings || 0}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {student.lastBookingDate ? new Date(student.lastBookingDate).toLocaleDateString() : 'Never'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Owners Table */}
          {activeTab === 'owners' && (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Last Upload
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Earnings
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {owners.map((owner, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {owner.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {owner.lastUpload ? new Date(owner.lastUpload).toLocaleDateString() : 'Never'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        ${owner.totalEarnings?.toFixed(2) || '0.00'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Messages Table */}
          {activeTab === 'messages' && (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Message
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {messages.map((message, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {message.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {message.email}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                        {message.message}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(message.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;