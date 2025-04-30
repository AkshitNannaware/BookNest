import React, { useState, useEffect } from 'react';

const OwnerDashboard = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState([null, null, null]); // For storing room images
  const [formData, setFormData] = useState({
    city: '',
    area: '',
    roomType: 'Single Room',
    rent: '',
    description: '',
  });

  const ownerId = localStorage.getItem('ownerId');

  useEffect(() => {
    const fetchRentalHistory = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/rooms/rental-history/${ownerId}`);
        const data = await response.json();
        setRooms(data);
      } catch (error) {
        console.error('Error fetching rental history:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRentalHistory();
  }, [ownerId]);

  const handleImageUpload = (e, index) => {
    const file = e.target.files[0];
    const newImages = [...images];
    newImages[index] = URL.createObjectURL(file);
    setImages(newImages);
  };

  const removeImage = (index) => {
    const newImages = [...images];
    newImages[index] = null;
    setImages(newImages);
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   // Submit logic goes here (e.g., send formData and images to the server)
  //   alert('Room Published!');
  // };




  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // Create a new FormData object
      const formData = new FormData();
      formData.append('ownerId', ownerId); // Assuming ownerId is stored in localStorage
      formData.append('title', formData.roomType); // Use the correct field
      formData.append('description', formData.description);
      formData.append('rent', formData.rent);
      formData.append('location', `${formData.city}, ${formData.area}`);
      images.forEach((image, index) => {
        if (image) formData.append('photos', image); // Add images to FormData
      });
  
      console.log('Form data being sent:', formData);
  
      // Send the request to the backend
      const response = await fetch('http://localhost:5000/api/rooms/upload', {
        method: 'POST',
        body: formData,
      });
  
      const result = await response.json();
  
      if (response.ok) {
        alert('Room uploaded successfully!');
        setRooms((prevRooms) => [...prevRooms, result.room]); // Update local state
      } else {
        console.error('Error response from server:', result);
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
          <h1 className="text-3xl font-bold mb-8">Room Details</h1>

          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
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
                    <label className="block text-sm font-medium text-gray-700 mb-1">Area/Locality</label>
                    <input
                      type="text"
                      className="w-full p-2 border rounded-md"
                      placeholder="Enter area"
                      value={formData.area}
                      onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                    />
                  </div>
                </div>
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
                      <option>Single Room</option>
                      <option>Double Room</option>
                      <option>Studio Apartment</option>
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
                    <div
                      key={index}
                      className="border-2 border-dashed rounded-lg p-4 flex flex-col items-center justify-center"
                    >
                      {image ? (
                        <div className="relative w-full h-40">
                          <img
                            src={image}
                            alt={`Room ${index + 1}`}
                            className="w-full h-full object-cover rounded-lg"
                          />
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
        </div>

        {/* Right: Rental History */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-2xl font-bold mb-4">Your Uploaded Rooms</h2>
          {loading ? (
            <p>Loading...</p>
          ) : rooms.length === 0 ? (
            <p className="text-gray-500">No rooms uploaded yet.</p>
          ) : (
            <div className="space-y-4">
              {rooms.map((room) => (
                <div key={room._id} className="bg-white p-4 rounded-xl shadow">
                  <h3 className="text-xl font-semibold mb-2">{room.title}</h3>
                  <img
                    src={room.photos}
                    alt={room.title}
                    className="w-full h-40 object-cover rounded mb-2"
                  />
                  <p className="text-gray-700">{room.description}</p>
                  <p><strong>Rent:</strong> ₹{room.rent}</p>
                  <p><strong>Location:</strong> {room.location}</p>
                  <div className="mt-2">
                    <p className="font-medium">Rented By:</p>
                    {room.rentedBy.length > 0 ? (
                      <ul className="list-disc pl-5">
                        {room.rentedBy.map((rental) => (
                          <li key={rental._id}>
                            {rental.user.username} ({rental.user.email})
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-gray-500">Not rented yet</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OwnerDashboard;
