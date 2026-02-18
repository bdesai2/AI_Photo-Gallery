import React, { useState } from 'react';
import { Menu, Home, Grid, Globe } from 'lucide-react';

// Header: responsive navigation used across the app. Keeps only
// navigation presentation and mobile menu state — page switching
// is lifted to the parent via `setCurrentPage`.
export default function Header({ currentPage, setCurrentPage }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-neutral-900 bg-opacity-95 backdrop-blur-sm border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-16">
          <button
            onClick={() => setCurrentPage('home')}
            className="text-white text-2xl font-light tracking-wider hover:text-neutral-300 transition-colors"
          >
            Photofy Me
          </button>

          {/* Desktop nav links */}
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
            <button
              onClick={() => setCurrentPage('projects')}
              className={`flex items-center gap-2 transition-colors ${
                currentPage === 'projects' ? 'text-white' : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Globe className="w-4 h-4" />
              Projects
            </button>
          </div>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-white"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {/* Mobile menu content */}
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
  );
}