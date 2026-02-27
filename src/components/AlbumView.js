import React from 'react';
import { ChevronLeft } from 'lucide-react';

const AlbumView = ({ selectedAlbum, setCurrentPage, setSelectedAlbum, setSelectedImage }) => {
  if (!selectedAlbum) return null;

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        <button
          onClick={() => {
            setSelectedAlbum(null);
            setCurrentPage('gallery');
          }}
          className="flex items-center space-x-2 text-neutral-400 hover:text-white mb-8"
        >
          <ChevronLeft size={20} />
          <span>Back to Gallery</span>
        </button>

        <h1 className="text-4xl md:text-5xl font-light text-white mb-12 text-center tracking-wide">
          {selectedAlbum.title}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {selectedAlbum.images.map((image, index) => (
            <div
              key={index}
              className="cursor-pointer animate-fadeIn"
              style={{ animationDelay: `${index * 100}ms` }}
              onClick={() => setSelectedImage({ album: selectedAlbum, image, index })}
            >
              <img
                src={image}
                alt={`${selectedAlbum.title} ${index + 1}`}
                className="w-full h-64 object-cover rounded-lg shadow-md hover:shadow-lg transition-shadow"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AlbumView;