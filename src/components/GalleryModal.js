import React from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

// GalleryModal: full-screen viewer for a selected album. It receives
// navigation callbacks and the index setter from the parent so it stays
// purely presentational and reusable.
export default function GalleryModal({ selectedAlbum, selectedImage, closeGallery, nextImage, prevImage, setSelectedImage }) {
  if (!selectedAlbum || selectedImage === null) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-95 flex items-center justify-center animate-fadeIn">
      {/* Close button */}
      <button
        onClick={closeGallery}
        className="absolute top-4 right-4 p-2 text-white hover:bg-white hover:bg-opacity-10 rounded-full transition-all z-50"
      >
        <X className="w-8 h-8" />
      </button>

      {/* Prev control */}
      <button
        onClick={prevImage}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 text-white hover:bg-white hover:bg-opacity-10 rounded-full transition-all"
      >
        <ChevronLeft className="w-8 h-8" />
      </button>

      {/* Image + caption */}
      <div className="max-w-6xl max-h-screen px-16 py-8 flex flex-col items-center">
        <img
          src={selectedAlbum.images[selectedImage]}
          alt={`${selectedAlbum.title} ${selectedImage + 1}`}
          className="max-w-full max-h-[80vh] object-contain"
        />
        <p className="text-white mt-4 text-center">
          {selectedAlbum.title} - {selectedImage + 1} of {selectedAlbum.images.length}
        </p>
      </div>

      {/* Next control */}
      <button
        onClick={nextImage}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-white hover:bg-white hover:bg-opacity-10 rounded-full transition-all"
      >
        <ChevronRight className="w-8 h-8" />
      </button>

      {/* Pagination dots (choose a specific image) */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
        {selectedAlbum.images.map((_, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === selectedImage ? 'bg-white w-8' : 'bg-white bg-opacity-50'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
