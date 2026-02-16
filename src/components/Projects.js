import React, { useState } from 'react';
import { X } from 'lucide-react';
import { nationalParks } from '../data';

const Projects = () => {
  const [selectedPark, setSelectedPark] = useState(null);

  // Simple US map coordinates (approximate)
  const usBounds = {
    minLat: 24.396308,
    maxLat: 49.384358,
    minLng: -125.0,
    maxLng: -66.93457
  };

  const mapWidth = 800;
  const mapHeight = 500;

  const latToY = (lat) => ((usBounds.maxLat - lat) / (usBounds.maxLat - usBounds.minLat)) * mapHeight;
  const lngToX = (lng) => ((lng - usBounds.minLng) / (usBounds.maxLng - usBounds.minLng)) * mapWidth;

  return (
    <div className="min-h-screen pt-20 bg-neutral-900">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-light text-white mb-4 tracking-wide">
            Photography Projects
          </h1>
          <p className="text-xl text-neutral-400">
            Ongoing photography projects capturing the beauty of America's national parks
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-3xl font-light text-white mb-6">National Parks Project</h2>
          <p className="text-neutral-300 mb-8 max-w-3xl">
            A comprehensive photography project documenting the diverse landscapes, wildlife, and natural beauty
            of America's national parks. Each pin on the map represents a park I've photographed, with images
            showcasing the unique character of each location.
          </p>
        </div>

        {/* Map Container */}
        <div className="bg-neutral-800 rounded-lg p-6 mb-8">
          <h3 className="text-2xl font-light text-white mb-4">United States National Parks</h3>
          <div className="relative">
            {/* Simple US Outline SVG */}
            <svg width={mapWidth} height={mapHeight} className="border border-neutral-600 rounded">
              {/* Very basic US outline - in a real app, you'd use a proper map library */}
              <rect x="0" y="0" width={mapWidth} height={mapHeight} fill="#1f2937" stroke="#374151" strokeWidth="2" />

              {/* State outlines (simplified) */}
              <path d="M 100 200 L 150 180 L 200 190 L 250 170 L 300 180 L 350 160 L 400 170 L 450 150 L 500 160 L 550 140 L 600 150 L 650 130 L 700 140"
                    stroke="#4b5563" strokeWidth="1" fill="none" />

              {/* National Park Pins */}
              {nationalParks.map((park) => {
                const x = lngToX(park.lng);
                const y = latToY(park.lat);

                return (
                  <g key={park.id}>
                    <circle
                      cx={x}
                      cy={y}
                      r="8"
                      fill="#10b981"
                      stroke="#065f46"
                      strokeWidth="2"
                      className="cursor-pointer hover:fill-green-400 transition-colors"
                      onClick={() => setSelectedPark(park)}
                    />
                    <circle
                      cx={x}
                      cy={y}
                      r="12"
                      fill="transparent"
                      className="cursor-pointer"
                      onClick={() => setSelectedPark(park)}
                    />
                  </g>
                );
              })}
            </svg>

            {/* Legend */}
            <div className="absolute top-4 right-4 bg-neutral-700 p-3 rounded-lg">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                <span className="text-white text-sm">National Park</span>
              </div>
            </div>
          </div>
        </div>

        {/* Park List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {nationalParks.map((park) => (
            <div
              key={park.id}
              className="bg-neutral-800 rounded-lg overflow-hidden cursor-pointer hover:bg-neutral-700 transition-colors"
              onClick={() => setSelectedPark(park)}
            >
              <div className="aspect-video bg-neutral-700 flex items-center justify-center">
                <img
                  src={park.pinImage}
                  alt={park.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold text-white mb-2">{park.name}</h3>
                <p className="text-neutral-400 text-sm mb-2">{park.state}</p>
                <p className="text-neutral-300 text-sm">{park.description}</p>
                <p className="text-green-400 text-sm mt-2">{park.images.length} photos</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Park Modal */}
      {selectedPark && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="bg-neutral-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b border-neutral-700">
              <div className="flex items-center space-x-3">
                <img
                  src={selectedPark.pinImage}
                  alt={selectedPark.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-green-500"
                />
                <div>
                  <h2 className="text-2xl font-bold text-white">{selectedPark.name}</h2>
                  <p className="text-neutral-400">{selectedPark.state}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedPark(null)}
                className="text-neutral-400 hover:text-white"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-6">
              <p className="text-neutral-300 mb-6">{selectedPark.description}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {selectedPark.images.map((image, index) => (
                  <div key={index} className="aspect-video">
                    <img
                      src={image}
                      alt={`${selectedPark.name} ${index + 1}`}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Projects;