import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from './components/Header';
import HeroCarousel from './components/HeroCarousel';
import AlbumsGrid from './components/AlbumsGrid';
import ContactForm from './components/ContactForm';
import GalleryModal from './components/GalleryModal';
import imagesData from './data/images.json';
import ProjectsGrid from './components/ProjectsGrid';
import ProjectPage from './components/ProjectPage';
import { useLazyLoadImages } from './lib/utils';
import SEO from './components/SEO';
import { organizationSchema, personSchema } from './lib/schemas';

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

  // Determine SEO title and description based on current page
  const getPageSEO = () => {
    const baseUrl = 'https://yourportfolio.com';
    switch (currentPage) {
      case 'home':
        return {
          title: 'Professional Photographer in Wylie, TX | Landscapes, Portraits & More',
          description: 'Award-winning photographer in Wylie, TX specializing in landscapes, portraits, events, wildlife, and commercial photography. Serving Plano, Dallas, Murphy, and surrounding areas.',
          url: baseUrl,
        };
      case 'albums':
        return {
          title: 'Photography Collections | All Albums | Wylie, TX Photographer',
          description: 'Browse all photography collections including landscapes, portraits, wildlife, urban, commercial and event photography by professional photographer in Wylie, TX.',
          url: `${baseUrl}/albums`,
        };
      case 'projects':
        return {
          title: 'Photography Projects | Featured Works | Professional Photographer Wylie TX',
          description: 'Discover featured photography projects and detailed collections including our US National Parks photography series. Professional photography services in Wylie, TX.',
          url: `${baseUrl}/projects`,
        };
      default:
        return {
          title: 'Professional Photographer in Wylie, TX',
          description: 'Award-winning photographer in Wylie, TX providing professional photography services including portraits, landscapes, events, and commercial photography for Dallas and surrounding areas.',
          url: baseUrl,
        };
    }
  };

  const pageSEO = getPageSEO();

  return (
    <div className="min-h-screen bg-neutral-900">
      <SEO 
        title={pageSEO.title} 
        description={pageSEO.description}
        url={pageSEO.url}
      />
      
      {/* Schema.org structured data for better SEO */}
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(organizationSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(personSchema)}
        </script>
      </Helmet>

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

            {/* Featured Projects Section */}
            {projects.length > 0 && (
              <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
                <h2 className="text-4xl font-light text-white mb-12 text-center tracking-wide">Featured Projects</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  {/* Featured project card */}
                  {projects.map((project, index) => (
                    <div
                      key={project.id}
                      className="group cursor-pointer"
                      onClick={() => {
                        setCurrentPage('projects');
                        openProject(project);
                      }}
                    >
                      <div className="relative overflow-hidden rounded-lg mb-6 h-96">
                        <img
                          src={project.thumbnail}
                          alt={project.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <button className="px-8 py-3 bg-white text-neutral-900 rounded-lg font-semibold hover:bg-neutral-100 transition-colors">
                            Explore Project
                          </button>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-3xl font-light text-white mb-4">{project.title}</h3>
                        <p className="text-neutral-300 text-lg leading-relaxed">{project.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

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

      <footer className="bg-neutral-950 text-neutral-400 py-12 text-center border-t border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-white font-semibold mb-2">Location</h3>
              <p className="text-sm">Wylie, Texas</p>
              <p className="text-sm">Serving Dallas-Fort Worth Area</p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-2">Services</h3>
              <p className="text-sm">Portraits & Events</p>
              <p className="text-sm">Commercial & Wildlife</p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-2">Contact</h3>
              <p className="text-sm">Phone: (XXX) XXX-XXXX</p>
              <p className="text-sm">Email: info@example.com</p>
            </div>
          </div>
          <p className="text-sm">© 2026 Professional Photographer in Wylie, TX. All rights reserved. | Photography Portfolio serving Wylie, Dallas, Plano, Murphy, and surrounding areas.</p>
        </div>
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