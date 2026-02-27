import React from 'react';
import { Link } from 'react-router-dom';
import AlbumsGrid from './AlbumsGrid';
import NationalParksMap from './NationalParksMap';
import StateParksMap from './StateParksMap';
import './masonry.css';

// ProjectPage: shows a single project's galleries (reuses AlbumsGrid).
// `project.galleries` should be an array of album-like objects with
// { id, title, thumbnail, images }.
const ProjectPage = ({ project, onBack, onOpenAlbum, onOpenImage }) => {
  if (!project) return null;

  // Special handling for national parks project
  const isNationalParksProject = project.id === 'us-national-parks';

  return (
    <div className="py-8 px-4 md:px-8 max-w-7xl mx-auto animate-fadeIn">
      {/* Breadcrumbs */}
      <div className="mb-6">
        <nav className="text-sm text-neutral-400">
          <Link to="/" className="hover:underline text-neutral-300">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/projects" className="hover:underline text-neutral-300">Projects</Link>
          <span className="mx-2">/</span>
          <span className="text-white">{project.title}</span>
        </nav>
      </div>

      {/* Hero area */}
      <div className="relative rounded-lg overflow-hidden mb-8">
        {project.thumbnail && (
          <img loading="lazy" src={project.thumbnail} alt={project.title} className="w-full h-64 md:h-80 object-cover" />
        )}
        <div className="absolute inset-0 bg-black bg-opacity-40" />
        <div className="absolute inset-0 flex items-center">
          <div className="px-6 md:px-12">
            <h1 className="text-4xl md:text-5xl font-light text-white tracking-wide">{project.title}</h1>
            {project.description && <p className="text-neutral-300 mt-3 max-w-3xl">{project.description}</p>}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mb-12">
        {isNationalParksProject ? (
          <NationalParksMap parks={project.galleries} onSelectPark={onOpenAlbum} />
        ) : project.id === 'state-parks' ? (
          <StateParksMap parks={project.galleries} onSelectPark={onOpenAlbum} />
        ) : (
          <div>
            {/* Render each gallery as a section with a masonry collage using shared styles */}

            {project.galleries.map((gallery) => {
              const count = (gallery.images || []).length;
              return (
                <section key={gallery.id} className="mb-10">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-2xl text-white font-semibold">
                      {gallery.title}
                      <span className="text-sm text-neutral-400 ml-3">{`(${count} ${count === 1 ? 'photo' : 'photos'})`}</span>
                    </h3>
                    <Link to={`/projects/${project.id}/${gallery.id}`} className="text-sm text-neutral-300 hover:underline">View gallery</Link>
                  </div>

                  <div className="masonry">
                    {(gallery.images || []).map((img, idx) => (
                      <div key={idx} className="masonry-item">
                        <button onClick={() => onOpenImage(gallery, idx)} className="w-full p-0 border-0 bg-transparent" aria-label={`Open ${gallery.title} image ${idx + 1}`}>
                          <img loading="lazy" src={img} alt={`${gallery.title} ${idx + 1}`} />
                        </button>
                      </div>
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default React.memo(ProjectPage);
