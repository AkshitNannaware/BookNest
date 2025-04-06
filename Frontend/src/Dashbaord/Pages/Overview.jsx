import React from 'react';
import { Home, Users, Clock } from 'lucide-react';

const Overview = () => {
  const stats = [
    { icon: Home, label: 'Total Rooms', value: '5' },
    { icon: Users, label: 'Total Inquiries', value: '12' },
    { icon: Clock, label: 'Pending Reviews', value: '3' },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Dashboard Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center space-x-4">
                <Icon size={24} className="text-blue-600" />
                <div>
                  <p className="text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <div className="space-y-4">
          <div className="border-b pb-4">
            <p className="text-gray-600">New room inquiry received</p>
            <p className="text-sm text-gray-500">2 hours ago</p>
          </div>
          <div className="border-b pb-4">
            <p className="text-gray-600">Room details updated</p>
            <p className="text-sm text-gray-500">5 hours ago</p>
          </div>
          <div>
            <p className="text-gray-600">New review pending</p>
            <p className="text-sm text-gray-500">1 day ago</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Overview;