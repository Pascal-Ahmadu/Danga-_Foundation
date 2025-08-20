"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';

export default function Impact() {
  const data = [
    { name: 'Program services', value: 87, color: '#D97706' },
    { name: 'Funding', value: 6, color: '#2563EB' },
    { name: 'General', value: 7, color: '#92400E' }
  ];

  const COLORS = ['#D97706', '#2563EB', '#92400E'];

  return (
    <div className="bg-gray-100 min-h-screen py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Donut Chart Section */}
          <div className="flex justify-center">
            <div className="relative w-[500px] h-[500px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={80}
                    outerRadius={180}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Impact Text Section */}
          <div className="space-y-6">
            <h1 className="text-3xl font-light text-gray-700">Our impact</h1>
            
            <p className="text-base leading-relaxed text-gray-600 max-w-md font-light">
              With a 4-star rating and a 96% score from Charity Navigator, along 
              with Candid's highest Platinum Seal of Transparency, we remain 
              committed to maximizing the impact of every dollar.
            </p>

            <button className="bg-white text-blue-600 border border-blue-600 hover:bg-blue-50 font-light py-3 px-6 text-base transition-colors duration-200">
              Learn more
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}