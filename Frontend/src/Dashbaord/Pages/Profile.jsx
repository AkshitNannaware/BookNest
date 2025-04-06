import React from 'react';
import { User, Phone, Mail, MapPin } from 'lucide-react';

const Profile = () => {
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Owner Profile</h1>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-blue-600 p-8 text-white">
          <div className="flex items-center space-x-4">
            <div className="bg-white p-3 rounded-full">
              <User size={40} className="text-blue-600" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold">John Doe</h2>
              <p className="text-blue-100">Property Owner</p>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Contact Information */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold mb-4">Contact Information</h3>

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Phone className="text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Phone Number</p>
                    <input
                      type="tel"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Mail className="text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Email Address</p>
                    <input
                      type="email"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <MapPin className="text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Address</p>
                    <textarea
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                      rows={3}
                      placeholder="Enter your address"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Information */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold mb-4">Additional Information</h3>

              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Preferred Contact Time</p>
                  <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50">
                    <option>Morning (9 AM - 12 PM)</option>
                    <option>Afternoon (12 PM - 5 PM)</option>
                    <option>Evening (5 PM - 9 PM)</option>
                  </select>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Languages Spoken</p>
                  <div className="mt-2 space-y-2">
                    {['English', 'Hindi', 'Other'].map((language) => (
                      <label key={language} className="flex items-center">
                        <input
                          type="checkbox"
                          className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                        />
                        <span className="ml-2">{language}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
            >
              Save Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;