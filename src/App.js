import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import HeroCarousel from './components/HeroCarousel';
import AlbumsGrid from './components/AlbumsGrid';
import ContactForm from './components/ContactForm';
import GalleryModal from './components/GalleryModal';
import imagesData from './data/images.json';
import ProjectsGrid from './components/ProjectsGrid';
import ProjectPage from './components/ProjectPage';
import { useLazyLoadImages } from './lib/utils';

// PhotographyPortfolio: top-level page component that keeps application state
// and orchestrates composed child components. Most UI is delegated to
// components/* so this file holds only state, handlers and composition.

const PhotographyPortfolio = () => {
  // UI state: current page and currently-open album modal/index
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const { heroImages } = imagesData;

  const { albums } = imagesData;
  const { projects = [] } = imagesData;

  // local form state for the contact form (used only if local submission)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  // Use reusable hook for lazy-loading images; re-run when page/album change.
  useLazyLoadImages([currentPage, selectedAlbum]);
  // Handlers for opening / closing the full-screen album modal
  const openAlbumGallery = (album) => {
    setSelectedAlbum(album);
    setSelectedImage(0);
  };

  // Projects state: selected project for project-specific view
  const [selectedProject, setSelectedProject] = useState(null);

  const openProject = (project) => {
    setSelectedProject(project);
  };

  const closeProject = () => setSelectedProject(null);

  const closeGallery = () => {
    setSelectedAlbum(null);
    setSelectedImage(null);
  };

  // Advance the modal image index (wraps around)
  const nextImage = () => {
    if (selectedAlbum) {
      setSelectedImage((prev) => (prev + 1) % selectedAlbum.images.length);
    }
  };

  // Move to previous image (wraps around)
  const prevImage = () => {
    if (selectedAlbum) {
      setSelectedImage((prev) => (prev - 1 + selectedAlbum.images.length) % selectedAlbum.images.length);
    }
  };

  // Local contact form submission (simple demo behaviour)
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
      <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />

      {/* Main content area. Navigation is provided by `Header`. */}
      <main className="pt-16">
        {/* Two main views: home and albums */}
        {currentPage === 'home' ? (
          <div className="animate-fadeIn">
            {/* Hero carousel - configured from src/data/images.json */}
            <HeroCarousel heroImages={heroImages} />

            {/* Featured collections (subset of albums) */}
            <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
              <h2 className="text-4xl font-light text-white mb-12 text-center tracking-wide">Featured Collections</h2>
              <AlbumsGrid albums={albums.slice(0, 6)} onOpenAlbum={openAlbumGallery} />
            </section>

            {/* Contact form - local behaviour by default; pass a submit handler to integrate with a backend */}
            <ContactForm onSubmit={(data) => {
              alert('Thank you for your message! I will get back to you soon.');
            }} />
          </div>
        ) : currentPage === 'albums' ? (
          <div className="py-20 px-4 md:px-8 max-w-7xl mx-auto animate-fadeIn">
            <h1 className="text-4xl md:text-5xl font-light text-white mb-12 text-center tracking-wide">All Collections</h1>
            <AlbumsGrid albums={albums} onOpenAlbum={openAlbumGallery} />
          </div>
        ) : currentPage === 'projects' ? (
          <div className="py-20 px-4 md:px-8 max-w-7xl mx-auto animate-fadeIn">
            {/* If a project is selected, show its page; otherwise show the projects grid */}
            {selectedProject ? (
              <ProjectPage project={selectedProject} onBack={closeProject} onOpenAlbum={openAlbumGallery} />
            ) : (
              <div>
                <h1 className="text-4xl md:text-5xl font-light text-white mb-12 text-center tracking-wide">Projects</h1>
                <ProjectsGrid projects={projects} onOpenProject={openProject} />
              </div>
            )}
          </div>
        ) : (
          <div className="py-20 px-4 md:px-8 max-w-7xl mx-auto animate-fadeIn">
            <h1 className="text-4xl md:text-5xl font-light text-white mb-12 text-center tracking-wide">All Collections</h1>
            <AlbumsGrid albums={albums} onOpenAlbum={openAlbumGallery} />
          </div>
        )}
      </main>

      {/* Fullscreen gallery modal (delegated to component) */}
      <GalleryModal
        selectedAlbum={selectedAlbum}
        selectedImage={selectedImage}
        closeGallery={closeGallery}
        nextImage={nextImage}
        prevImage={prevImage}
        setSelectedImage={setSelectedImage}
      />

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