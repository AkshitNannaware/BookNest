import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { FiUpload, FiX, FiCheck, FiPlus, FiTrash2, FiMapPin, FiHome, FiDollarSign, FiInfo } from 'react-icons/fi';

const OwnerDashboard = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState([null, null, null]);
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    city: '',
    area: '',
    address: '',
    roomType: '',
    rent: '',
    description: '',
    newFacility: '',
    facilities: []
  });

  const [token, setToken] = useState('');
  const [ownerId, setOwnerId] = useState('');
  const [userRole, setUserRole] = useState('');
  const [activeTab, setActiveTab] = useState('upload');






  const getImageSrc = (photos) => {
  if (Array.isArray(photos) && photos.length > 0) {
    const imageUrl = photos[0];
    if (typeof imageUrl !== 'string' || imageUrl.trim() === '') {
      return 'https://via.placeholder.com/600x400?text=No+Image+Available';
    }
    if (imageUrl.startsWith('/uploads')) {
      return `http://localhost:5000${imageUrl}`;
    } else if (imageUrl.startsWith('http')) {
      return imageUrl;
    } else {
      return `http://localhost:5000/${imageUrl}`;
    }
  }
  return 'https://via.placeholder.com/600x400?text=No+Image+Available';
};










  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      try {
        const decoded = jwtDecode(storedToken);
        setOwnerId(decoded?.email);
        setUserRole(decoded?.role);
      } catch (err) {
        console.error('Invalid token:', err);
      }
    }
  }, []);

  useEffect(() => {
    const fetchRentalHistory = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/rooms/rental-history`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        const data = await response.json();

        if (response.ok) {
          setRooms(data.rooms);
        } else {
          alert(data.msg || 'Failed to fetch rooms.');
        }
      } catch (error) {
        console.error('Error fetching rental history:', error);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchRentalHistory();
    }
  }, [token, userRole]);

  const handleImageUpload = (e, index) => {
    const file = e.target.files[0];
    if (!file) return;

    const newImages = [...images];
    newImages[index] = file;
    setImages(newImages);
  };

  const removeImage = (index) => {
    const newImages = [...images];
    newImages[index] = null;
    setImages(newImages);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token || !ownerId) {
      alert('Authentication failed. Please log in again.');
      return;
    }

    try {
      const uploadData = new FormData();
      uploadData.append('ownerId', ownerId);
      uploadData.append('name', formData.name);
      uploadData.append('title', formData.roomType);
      uploadData.append('description', formData.description);
      uploadData.append('rent', formData.rent);
      uploadData.append('mobile', formData.mobile);
      uploadData.append('location', `${formData.city}, ${formData.area}, ${formData.address}`);
      uploadData.append('facilities', JSON.stringify(formData.facilities));

      images.forEach((image) => {
        if (image) uploadData.append('photos', image);
      });

      const response = await fetch(`http://localhost:5000/api/rooms/upload`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: uploadData,
      });

      if (response.ok) {
        alert('Room uploaded successfully!');
        window.location.reload();
      } else {
        const result = await response.json();
        alert(result.msg || 'Failed to upload room.');
      }
    } catch (error) {
      console.error('Error uploading room:', error);
      alert('An error occurred. Please try again.');
    }
  };

  const deleteRoom = async (roomId) => {
    if (window.confirm('Are you sure you want to delete this room?')) {
      try {
        const response = await fetch(`http:localhost:500/api/rooms/${roomId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.ok) {
          alert('Room deleted successfully!');
          setRooms(rooms.filter(room => room._id !== roomId));
        } else {
          const data = await response.json();
          alert(data.msg || 'Failed to delete room.');
        }
      } catch (error) {
        console.error('Error deleting room:', error);
        alert('An error occurred while deleting the room.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-indigo-600 text-white p-6">
            <h1 className="text-3xl font-bold">Owner Dashboard</h1>
            <p className="text-indigo-100">Manage your property listings</p>
          </div>

          {/* Navigation Tabs */}
          <div className="flex border-b">
            <button
              className={`px-6 py-3 font-medium ${activeTab === 'upload' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500'}`}
              onClick={() => setActiveTab('upload')}
            >
              Upload New Room
            </button>
            <button
              className={`px-6 py-3 font-medium ${activeTab === 'listings' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500'}`}
              onClick={() => setActiveTab('listings')}
            >
              My Listings
            </button>
          </div>

          {/* Content Area */}
          <div className="p-6">
            {(userRole === 'owner' || userRole === 'admin') ? (
              activeTab === 'upload' ? (
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Personal Details Section */}
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h2 className="text-xl font-semibold mb-4 flex items-center">
                      <FiHome className="mr-2" /> Personal Details
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                        <input
                          type="text"
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                          placeholder="Enter your full name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
                        <input
                          type="tel"
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                          placeholder="Enter mobile number"
                          value={formData.mobile}
                          onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Location Section */}
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h2 className="text-xl font-semibold mb-4 flex items-center">
                      <FiMapPin className="mr-2" /> Location Details
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                        <input
                          type="text"
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                          placeholder="Enter city"
                          value={formData.city}
                          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Area</label>
                        <input
                          type="text"
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                          placeholder="Enter area"
                          value={formData.area}
                          onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                          required
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Address</label>
                        <input
                          type="text"
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                          placeholder="Full address"
                          value={formData.address}
                          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                          required
                        />
                      </div>
                    </div>
                    {formData.address && (
                      <div className="mt-4 rounded-lg overflow-hidden">
                        <iframe
                          width="100%"
                          height="250"
                          style={{ border: 0 }}
                          loading="lazy"
                          allowFullScreen
                          src={`https://www.google.com/maps?q=${encodeURIComponent(
                            `${formData.city}, ${formData.area}, ${formData.address}`
                          )}&output=embed`}
                        ></iframe>
                      </div>
                    )}
                  </div>

                  {/* Room Information Section */}
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h2 className="text-xl font-semibold mb-4 flex items-center">
                      <FiHome className="mr-2" /> Room Information
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Room Type</label>
                        <select
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                          value={formData.roomType}
                          onChange={(e) => setFormData({ ...formData, roomType: e.target.value })}
                          required
                        >
                          <option value="">Select room type</option>
                          <option>1 BHK</option>
                          <option>2 BHK</option>
                          <option>Hostel</option>
                          <option>Studio</option>
                          <option>Shared Room</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                          <FiDollarSign className="mr-1" /> Rent (per month)
                        </label>
                        <div className="relative">
                          <span className="absolute left-3 top-3 text-gray-500">₹</span>
                          <input
                            type="number"
                            className="w-full pl-8 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Enter amount"
                            value={formData.rent}
                            onChange={(e) => setFormData({ ...formData, rent: e.target.value })}
                            required
                          />
                        </div>
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Facilities</label>
                        <div className="flex items-center mb-2">
                          <input
                            type="text"
                            placeholder="Add facility (e.g., WiFi, Parking)"
                            className="flex-1 p-3 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            value={formData.newFacility || ''}
                            onChange={(e) => setFormData({ ...formData, newFacility: e.target.value })}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                e.preventDefault();
                                const trimmed = formData.newFacility?.trim();
                                if (trimmed && !formData.facilities.includes(trimmed)) {
                                  setFormData({
                                    ...formData,
                                    facilities: [...formData.facilities, trimmed],
                                    newFacility: '',
                                  });
                                }
                              }
                            }}
                          />
                          <button
                            type="button"
                            className="bg-indigo-600 text-white px-4 py-3 rounded-r-lg hover:bg-indigo-700 transition-colors"
                            onClick={() => {
                              const trimmed = formData.newFacility?.trim();
                              if (trimmed && !formData.facilities.includes(trimmed)) {
                                setFormData({
                                  ...formData,
                                  facilities: [...formData.facilities, trimmed],
                                  newFacility: '',
                                });
                              }
                            }}
                          >
                            <FiPlus />
                          </button>
                        </div>
                        
                        <div className="flex flex-wrap gap-2">
                          {formData.facilities.map((facility, index) => (
                            <div
                              key={index}
                              className="flex items-center bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full"
                            >
                              <span className="mr-2 text-sm">{facility}</span>
                              <button
                                type="button"
                                className="text-indigo-600 hover:text-indigo-800"
                                onClick={() => {
                                  const updated = formData.facilities.filter((_, i) => i !== index);
                                  setFormData({ ...formData, facilities: updated });
                                }}
                              >
                                <FiX size={14} />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                          <FiInfo className="mr-1" /> Description
                        </label>
                        <textarea
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                          rows={4}
                          placeholder="Describe your room (features, rules, etc.)"
                          value={formData.description}
                          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Room Photos Section */}
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h2 className="text-xl font-semibold mb-4 flex items-center">
                      <FiUpload className="mr-2" /> Room Photos
                    </h2>
                    <p className="text-sm text-gray-500 mb-4">Upload at least 1 photo (max 3)</p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {images.map((image, index) => (
                        <div key={index} className="border-2 border-dashed border-gray-300 rounded-xl p-4 flex flex-col items-center justify-center h-48">
                          {image ? (
                            <div className="relative w-full h-full">
                              <img 
                                src={URL.createObjectURL(image)} 
                                alt={`Room ${index + 1}`} 
                                className="w-full h-full object-cover rounded-lg" 
                              />
                              <button
                                type="button"
                                onClick={() => removeImage(index)}
                                className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                              >
                                <FiX size={14} />
                              </button>
                            </div>
                          ) : (
                            <label className="cursor-pointer flex flex-col items-center justify-center w-full h-full">
                              <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => handleImageUpload(e, index)}
                              />
                              <div className="bg-gray-100 p-3 rounded-full mb-2">
                                <FiUpload className="text-gray-500" />
                              </div>
                              <span className="text-sm text-gray-500 text-center">Click to upload</span>
                            </label>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 transition-colors font-medium text-lg flex items-center justify-center"
                  >
                    <FiCheck className="mr-2" /> Publish Room
                  </button>
                </form>
              ) : (
                <div>
                  <h2 className="text-2xl font-bold mb-6">Your Uploaded Rooms</h2>
                  {loading ? (
                    <div className="flex justify-center items-center h-64">
                      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
                    </div>
                  ) : rooms.length === 0 ? (
                    <div className="text-center py-12">
                      <div className="mx-auto w-24 h-24 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                        <FiHome className="text-indigo-600 text-3xl" />
                      </div>
                      <h3 className="text-lg font-medium text-gray-900">No rooms uploaded yet</h3>
                      <p className="mt-1 text-sm text-gray-500">Get started by uploading your first room.</p>
                      <button
                        onClick={() => setActiveTab('upload')}
                        className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Upload New Room
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {rooms.map((room) => (
                        <div key={room._id} className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow">
                          <div className="md:flex">
                            {room.photos && room.photos.length > 0 ? (
                              <div className="md:w-1/3 h-48 md:h-auto">
                                <img 
                                   src={getImageSrc(room.photos)}
                                  alt={room.title} 
                                  className="w-full h-full object-cover"
                                  onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = 'https://via.placeholder.com/600x400?text=No+Image+Available';
                                  }}
                                />
                              </div>
                            ) : (
                              <div className="md:w-1/3 h-48 md:h-auto bg-gray-100 flex items-center justify-center">
                                <FiHome className="text-gray-400 text-4xl" />
                              </div>
                            )}
                            <div className="p-6 md:w-2/3">
                              <div className="flex justify-between items-start">
                                <div>
                                  <h3 className="text-xl font-semibold">{room.title}</h3>
                                  <p className="text-gray-600 flex items-center mt-1">
                                    <FiMapPin className="mr-1" size={14} /> {room.location}
                                  </p>
                                </div>
                                <div className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full font-medium">
                                  ₹{room.rent}/month
                                </div>
                              </div>
                              <p className="mt-3 text-gray-700">{room.description}</p>
                              {room.facilities && room.facilities.length > 0 && (
                                <div className="mt-4">
                                  <h4 className="text-sm font-medium text-gray-900 mb-2">Facilities:</h4>
                                  <div className="flex flex-wrap gap-2">
                                    {room.facilities.map((facility, index) => (
                                      <span key={index} className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                                        {facility}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              )}
                              <div className="mt-6 flex justify-end space-x-3">
                                <button
                                  onClick={() => deleteRoom(room._id)}
                                  className="text-red-600 hover:text-red-800 flex items-center"
                                >
                                  <FiTrash2 className="mr-1" /> Delete
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )
            ) : (
              <div className="text-center py-12">
                <div className="mx-auto w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mb-4">
                  <FiX className="text-red-600 text-3xl" />
                </div>
                <h3 className="text-lg font-medium text-gray-900">Access Denied</h3>
                <p className="mt-1 text-sm text-gray-500">You must be logged in as an owner or admin to access this dashboard.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OwnerDashboard;