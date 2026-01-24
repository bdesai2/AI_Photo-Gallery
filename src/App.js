import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import HeroSlider from './components/HeroSlider';
import Gallery from './components/Gallery';
import AlbumView from './components/AlbumView';
import ImageModal from './components/ImageModal';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import { albums } from './data';

const PhotographyPortfolio = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
              img.src = img.dataset.src;
              observer.unobserve(img);
            }
          }
        });
      },
      { rootMargin: '50px' }
    );

    const images = document.querySelectorAll('img[data-src]');
    images.forEach((img) => observer.observe(img));

    return () => observer.disconnect();
  }, [currentPage, selectedAlbum]);

  return (
    <div className="min-h-screen bg-neutral-900">
      <Header
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      <main className="pt-16">
        {currentPage === 'home' ? (
          <div className="animate-fadeIn">
            <HeroSlider />

            <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
              <h2 className="text-4xl font-light text-white mb-12 text-center tracking-wide">
                Featured Collections
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {albums.slice(0, 6).map((album, index) => (
                  <div
                    key={album.id}
                    className="group relative overflow-hidden rounded-lg cursor-pointer animate-fadeIn"
                    style={{ animationDelay: `${index * 100}ms` }}
                    onClick={() => {
                      setSelectedAlbum(album);
                      setCurrentPage('album');
                    }}
                  >
                    <img
                      data-src={album.thumbnail}
                      alt={album.title}
                      className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-70 group-hover:opacity-90 transition-opacity" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <h3 className="text-2xl font-light mb-2">{album.title}</h3>
                      <p className="text-sm opacity-80">{album.count} Photos</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <ContactForm />
          </div>
        ) : currentPage === 'gallery' ? (
          <Gallery setCurrentPage={setCurrentPage} setSelectedAlbum={setSelectedAlbum} />
        ) : currentPage === 'album' ? (
          <AlbumView
            selectedAlbum={selectedAlbum}
            setCurrentPage={setCurrentPage}
            setSelectedAlbum={setSelectedAlbum}
            setSelectedImage={setSelectedImage}
          />
        ) : null}
      </main>

      <ImageModal selectedImage={selectedImage} setSelectedImage={setSelectedImage} />

      <Footer />

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out forwards;
        }

        .animate-slideUp {
          animation: slideUp 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default PhotographyPortfolio;