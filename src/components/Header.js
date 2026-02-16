<<<<<<< HEAD
import React from 'react';
import { Menu, Home, Grid, Mail } from 'lucide-react';

const Header = ({ currentPage, setCurrentPage, mobileMenuOpen, setMobileMenuOpen }) => {
  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'gallery', label: 'Gallery', icon: Grid },
    { id: 'contact', label: 'Contact', icon: Mail }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-neutral-900 bg-opacity-95 backdrop-blur-sm border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <h1 className="text-white text-2xl font-light tracking-wider hover:text-neutral-300 transition-colors">
              LENS & LIGHT
            </h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-8">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentPage(item.id)}
                  className={`flex items-center gap-2 transition-colors ${
                    currentPage === item.id ? 'text-white' : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  <Icon size={18} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-neutral-800">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setCurrentPage(item.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`flex items-center gap-2 w-full px-4 py-2 text-white hover:bg-neutral-800 transition-colors ${
                      currentPage === item.id ? 'bg-neutral-800' : ''
                    }`}
                  >
                    <Icon size={18} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
=======
import React, { useState } from 'react';
import { Menu, Home, Grid } from 'lucide-react';

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
            LENS & LIGHT
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
>>>>>>> 7eaa6286336b021a2766dc51e2de6beddf8b655c
