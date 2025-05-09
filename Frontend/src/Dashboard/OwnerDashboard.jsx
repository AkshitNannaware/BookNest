import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

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
    facilities: [],
  });

  const [token, setToken] = useState('');
  const [ownerId, setOwnerId] = useState('');
  const [userRole, setUserRole] = useState('');  // Store user role

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      try {
        const decoded = jwtDecode(storedToken);
        console.log("Decoded token:", decoded);
        setOwnerId(decoded?.email); // Use email as ownerId
        setUserRole(decoded?.role); // Store the user's role (owner, admin, etc.)
      } catch (err) {
        console.error('Invalid token:', err);
      }
    }
  }, []);


  useEffect(() => {
    const fetchRentalHistory = async () => {
      // if (!token || (userRole !== 'owner' && userRole !== 'admin')) {
      //   alert('You must be logged in as an owner or admin to upload and view uploaded rooms.');
      //   return;
      // }

      try {
        const response = await fetch('http://localhost:5000/api/rooms/rental-history', {
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

      // Loop through images and append them to FormData
      images.forEach((image) => {
        if (image) uploadData.append('photos', image);
      });

      const response = await fetch('http://localhost:5000/api/rooms/upload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: uploadData,
      });

      const result = await response.json();

      if (response.ok) {
        alert('Room uploaded successfully!');
        // Optionally, update rooms or redirect here
      } else {
        alert(result.msg || 'Failed to upload room.');
      }
    } catch (error) {
      console.error('Error uploading room:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Form */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h1 className="text-3xl font-bold mb-8">Room Upload</h1>

          {/* Only allow owners and admins to upload rooms */}
          {(userRole === 'owner' || userRole === 'admin') ? (
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                {/* Personal Details Section */}
                <div>
                  <h2 className="text-xl font-semibold mb-4">Personal Details</h2>
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                      <input
                        type="text"
                        className="w-full p-2 border rounded-md"
                        placeholder="Enter your full name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
                      <input
                        type="tel"
                        className="w-full p-2 border rounded-md"
                        placeholder="Enter mobile number"
                        value={formData.mobile}
                        onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                      />
                    </div>
                  </div>
                </div>

                {/* Location Section */}
                <div>
                  <h2 className="text-xl font-semibold mb-4">Location</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                      <input
                        type="text"
                        className="w-full p-2 border rounded-md"
                        placeholder="Enter city"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Area</label>
                      <input
                        type="text"
                        className="w-full p-2 border rounded-md"
                        placeholder="Enter area"
                        value={formData.area}
                        onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Location / Address</label>
                      <input
                        type="text"
                        className="w-full p-2 border rounded-md"
                        placeholder="Full address"
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      />
                    </div>
                  </div>
                  {/* Google Map Embed */}
                  {formData.address && (
                    <div className="mt-4">
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
                <div>
                  <h2 className="text-xl font-semibold mb-4">Room Information</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Room Type</label>
                      <select
                        className="w-full p-2 border rounded-md"
                        value={formData.roomType}
                        onChange={(e) => setFormData({ ...formData, roomType: e.target.value })}
                      >
                        <option value="">Select room type</option>
                        <option>1 BHK</option>
                        <option>2 BHK</option>
                        <option>Hostel</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Rent (per month)</label>
                      <input
                        type="number"
                        className="w-full p-2 border rounded-md"
                        placeholder="Enter amount"
                        value={formData.rent}
                        onChange={(e) => setFormData({ ...formData, rent: e.target.value })}
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Facilities</label>
                      <textarea
                        className="w-full p-2 border rounded-md"
                        rows={3}
                        placeholder="Mention facilities like WiFi, AC, attached bathroom, etc."
                        value={formData.facilities.join(', ')} // Display as comma-separated string
                        onChange={(e) => setFormData({ ...formData, facilities: e.target.value.split(',') })}
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                      <textarea
                        className="w-full p-2 border rounded-md"
                        rows={4}
                        placeholder="Describe your room..."
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      />
                    </div>
                  </div>
                </div>

                {/* Room Photos Section */}
                <div>
                  <h2 className="text-xl font-semibold mb-4">Room Photos</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {images.map((image, index) => (
                      <div key={index} className="border-2 border-dashed rounded-lg p-4 flex flex-col items-center justify-center">
                        {image ? (
                          <div className="relative w-full h-40">
                            <img src={URL.createObjectURL(image)} alt={`Room ${index + 1}`} className="w-full h-full object-cover rounded-lg" />
                            <button
                              type="button"
                              onClick={() => removeImage(index)}
                              className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
                            >
                              <span className="text-xs">X</span>
                            </button>
                          </div>
                        ) : (
                          <label className="cursor-pointer text-center">
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => handleImageUpload(e, index)}
                            />
                            <span className="text-sm text-gray-500">Upload Photo</span>
                          </label>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Publish Room
                </button>
              </div>
            </form>
          ) : (
            <p className="text-red-500">You do not have permission to upload a room.</p>
          )}
        </div>

        {/* Right: Rental History */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-2xl font-bold mb-4">Your Uploaded Rooms</h2>

          {/* Only allow owners and admins to view uploaded rooms */}
          {(userRole === 'owner' || userRole === 'admin') ? (
            loading ? (
              <p>Loading...</p>
            ) : rooms.length === 0 ? (
              <p className="text-gray-500">No rooms uploaded yet.</p>
            ) : (
              <div className="space-y-4">
                {rooms.map((room, index) => (
                  <div key={index} className="border-b-2 pb-4">
                    <h3 className="font-semibold text-lg">{room.title}</h3>
                    <p className="text-sm text-gray-600">{room.location}</p>
                    <p className="mt-2">{room.description}</p>
                    <div className="mt-2">
                      <strong>Rent:</strong> ₹{room.rent}/month
                    </div>
                  </div>
                ))}
              </div>
            )
          ) : (
            <p className="text-red-500">You do not have permission to view uploaded rooms.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default OwnerDashboard;