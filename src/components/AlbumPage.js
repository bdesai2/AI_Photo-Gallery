import React from 'react';
import './masonry.css';

// AlbumPage: displays a masonry-style collage of thumbnails for a single album/gallery.
// Clicking a thumbnail calls `onOpenImage(index)` which should open the
// full-screen modal (the parent manages modal state).
const AlbumPage = ({ album, onOpenImage }) => {
  if (!album) return null;

  const images = album.images || [];

  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        <h1 className="text-4xl md:text-5xl font-light text-white mb-8 text-center tracking-wide">{album.title}</h1>

        {/* Using shared masonry styles from ./masonry.css */}

        <div className="masonry">
          {images.map((image, index) => (
            <div key={index} className="masonry-item">
              <button onClick={() => onOpenImage(index)} aria-label={`Open image ${index + 1}`}>
                <img src={image} alt={`${album.title} ${index + 1}`} loading="lazy" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default React.memo(AlbumPage);
