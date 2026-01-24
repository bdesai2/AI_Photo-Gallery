import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Mail, Instagram, Facebook, Menu, Home, Grid } from 'lucide-react';

const PhotographyPortfolio = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const heroImages = [
    { url: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=1600&h=900&fit=crop', alt: 'Featured Photography 1' },
    { url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&h=900&fit=crop', alt: 'Featured Photography 2' },
    { url: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1600&h=900&fit=crop', alt: 'Featured Photography 3' },
    { url: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1600&h=900&fit=crop', alt: 'Featured Photography 4' }
  ];

  const albums = [
    {
      id: 1,
      title: 'Portraits',
      thumbnail: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&h=800&fit=crop',
      count: 24,
      images: [
        'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=1200&h=800&fit=crop',
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&h=800&fit=crop',
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=1200&h=800&fit=crop',
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=1200&h=800&fit=crop'
      ]
    },
    {
      id: 2,
      title: 'Landscapes',
      thumbnail: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=800&fit=crop',
      count: 32,
      images: [
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop',
        'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200&h=800&fit=crop',
        'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1200&h=800&fit=crop',
        'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=1200&h=800&fit=crop'
      ]
    },
    {
      id: 3,
      title: 'Urban',
      thumbnail: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800&h=800&fit=crop',
      count: 18,
      images: [
        'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=1200&h=800&fit=crop',
        'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1200&h=800&fit=crop',
        'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1200&h=800&fit=crop',
        'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=1200&h=800&fit=crop'
      ]
    },
    {
      id: 4,
      title: 'Wildlife',
      thumbnail: 'https://images.unsplash.com/photo-1484406566174-9da000fda645?w=800&h=800&fit=crop',
      count: 28,
      images: [
        'https://images.unsplash.com/photo-1484406566174-9da000fda645?w=1200&h=800&fit=crop',
        'https://images.unsplash.com/photo-1456926631375-92c8ce872def?w=1200&h=800&fit=crop',
        'https://images.unsplash.com/photo-1535083783855-76ae62b2914e?w=1200&h=800&fit=crop',
        'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=1200&h=800&fit=crop'
      ]
    },
    {
      id: 5,
      title: 'Architecture',
      thumbnail: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&h=800&fit=crop',
      count: 21,
      images: [
        'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=1200&h=800&fit=crop',
        'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?w=1200&h=800&fit=crop',
        'https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?w=1200&h=800&fit=crop',
        'https://images.unsplash.com/photo-1502005097973-6a7082348e28?w=1200&h=800&fit=crop'
      ]
    },
    {
      id: 6,
      title: 'Street',
      thumbnail: 'https://images.unsplash.com/photo-1520034475321-cbe63696469a?w=800&h=800&fit=crop',
      count: 16,
      images: [
        'https://images.unsplash.com/photo-1520034475321-cbe63696469a?w=1200&h=800&fit=crop',
        'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=1200&h=800&fit=crop',
        'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=1200&h=800&fit=crop',
        'https://images.unsplash.com/photo-1513537086458-bc618b89370a?w=1200&h=800&fit=crop'
      ]
    }
  ];

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroImages.length]);

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

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % heroImages.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length);

  const openAlbumGallery = (album) => {
    setSelectedAlbum(album);
    setSelectedImage(0);
  };

  const closeGallery = () => {
    setSelectedAlbum(null);
    setSelectedImage(null);
  };

  const nextImage = () => {
    if (selectedAlbum) {
      setSelectedImage((prev) => (prev + 1) % selectedAlbum.images.length);
    }
  };

  const prevImage = () => {
    if (selectedAlbum) {
      setSelectedImage((prev) => (prev - 1 + selectedAlbum.images.length) % selectedAlbum.images.length);
    }
  };

  const handleSubmit = () => {
    if (formData.name && formData.email && formData.message) {
      alert('Thank you for your message! I will get back to you soon.');
      setFormData({ name: '', email: '', message: '' });
    } else {
      alert('Please fill in all fields.');
    }
  };

  return (
    <div className="min-h-screen bg-neutral-900">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-neutral-900 bg-opacity-95 backdrop-blur-sm border-b border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={() => setCurrentPage('home')}
              className="text-white text-2xl font-light tracking-wider hover:text-neutral-300 transition-colors"
            >
              LENS & LIGHT
            </button>

            <div className="hidden md:flex gap-8">
              <button
                onClick={() => setCurrentPage('home')}
                className={`flex items-center gap-2 transition-colors ${
                  currentPage === 'home' ? 'text-white' : 'text-neutral-400 hover:text-white'
                }`}
              >
                <Home className="w-4 h-4" />
                Home
              </button>
              <button
                onClick={() => setCurrentPage('albums')}
                className={`flex items-center gap-2 transition-colors ${
                  currentPage === 'albums' ? 'text-white' : 'text-neutral-400 hover:text-white'
                }`}
              >
                <Grid className="w-4 h-4" />
                Albums
              </button>
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-white"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>

          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-neutral-800">
              <button
                onClick={() => {
                  setCurrentPage('home');
                  setMobileMenuOpen(false);
                }}
                className="flex items-center gap-2 w-full px-4 py-2 text-white hover:bg-neutral-800 transition-colors"
              >
                <Home className="w-4 h-4" />
                Home
              </button>
              <button
                onClick={() => {
                  setCurrentPage('albums');
                  setMobileMenuOpen(false);
                }}
                className="flex items-center gap-2 w-full px-4 py-2 text-white hover:bg-neutral-800 transition-colors"
              >
                <Grid className="w-4 h-4" />
                Albums
              </button>
            </div>
          )}
        </div>
      </nav>

      <main className="pt-16">
        {currentPage === 'home' ? (
          <div className="animate-fadeIn">
            <div className="relative h-screen overflow-hidden">
              {heroImages.map((img, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-1000 ${
                    index === currentSlide ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <img src={img.url} alt={img.alt} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black bg-opacity-40" />
                </div>
              ))}
              
              <div className="absolute inset-0 flex items-center justify-center text-white z-10">
                <div className="text-center px-4">
                  <h1 className="text-5xl md:text-7xl font-light mb-4 tracking-wider animate-slideUp">
                    LENS & LIGHT
                  </h1>
                  <p className="text-xl md:text-2xl font-light tracking-wide animate-slideUp opacity-90">
                    Capturing Moments, Creating Memories
                  </p>
                </div>
              </div>

              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 bg-white bg-opacity-20 hover:bg-opacity-30 transition-all rounded-full"
              >
                <ChevronLeft className="w-8 h-8 text-white" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 bg-white bg-opacity-20 hover:bg-opacity-30 transition-all rounded-full"
              >
                <ChevronRight className="w-8 h-8 text-white" />
              </button>

              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                {heroImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentSlide ? 'bg-white w-8' : 'bg-white bg-opacity-50'
                    }`}
                  />
                ))}
              </div>
            </div>

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
                    onClick={() => openAlbumGallery(album)}
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

            <section className="py-20 px-4 md:px-8 bg-neutral-800">
              <div className="max-w-6xl mx-auto">
                <h2 className="text-4xl font-light text-white mb-12 text-center tracking-wide">
                  Get In Touch
                </h2>
                <div className="grid md:grid-cols-2 gap-12">
                  <div className="bg-neutral-700 rounded-lg p-8 flex flex-col items-center text-center">
                    <div className="w-32 h-32 rounded-full overflow-hidden mb-6 border-4 border-neutral-600">
                      <img
                        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop"
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="text-2xl font-light text-white mb-4">John Anderson</h3>
                    <div className="space-y-4 text-neutral-300">
                      <a href="mailto:contact@lensandlight.com" className="flex items-center justify-center gap-2 hover:text-white transition-colors">
                        <Mail className="w-5 h-5" />
                        contact@lensandlight.com
                      </a>
                      <div className="flex gap-6 justify-center pt-4">
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                          <Instagram className="w-6 h-6" />
                        </a>
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                          <Facebook className="w-6 h-6" />
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <input
                      type="text"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 bg-neutral-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-500"
                    />
                    <input
                      type="email"
                      placeholder="Your Email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 bg-neutral-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-500"
                    />
                    <textarea
                      placeholder="Your Message"
                      rows="6"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 bg-neutral-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-500 resize-none"
                    />
                    <button
                      onClick={handleSubmit}
                      className="w-full py-3 bg-white text-neutral-900 rounded-lg font-medium hover:bg-neutral-200 transition-colors"
                    >
                      Send Message
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </div>
        ) : (
          <div className="py-20 px-4 md:px-8 max-w-7xl mx-auto animate-fadeIn">
            <h1 className="text-4xl md:text-5xl font-light text-white mb-12 text-center tracking-wide">
              All Collections
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {albums.map((album, index) => (
                <div
                  key={album.id}
                  className="group relative overflow-hidden rounded-lg cursor-pointer animate-fadeIn"
                  style={{ animationDelay: `${index * 100}ms` }}
                  onClick={() => openAlbumGallery(album)}
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
          </div>
        )}
      </main>

      {selectedAlbum && selectedImage !== null && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-95 flex items-center justify-center animate-fadeIn">
          <button
            onClick={closeGallery}
            className="absolute top-4 right-4 p-2 text-white hover:bg-white hover:bg-opacity-10 rounded-full transition-all z-50"
          >
            <X className="w-8 h-8" />
          </button>

          <button
            onClick={prevImage}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 text-white hover:bg-white hover:bg-opacity-10 rounded-full transition-all"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>

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

          <button
            onClick={nextImage}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-white hover:bg-white hover:bg-opacity-10 rounded-full transition-all"
          >
            <ChevronRight className="w-8 h-8" />
          </button>

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
      )}

      <footer className="bg-neutral-950 text-neutral-400 py-8 text-center">
        <p className="text-sm">© 2026 Lens & Light Photography. All rights reserved.</p>
      </footer>

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