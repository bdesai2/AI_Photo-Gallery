import React from 'react';
import AlbumsGrid from './AlbumsGrid';
import NationalParksMap from './NationalParksMap';

// ProjectPage: shows a single project's galleries (reuses AlbumsGrid).
// `project.galleries` should be an array of album-like objects with
// { id, title, thumbnail, images }.
export default function ProjectPage({ project, onBack, onOpenAlbum }) {
  if (!project) return null;

  // Special handling for national parks project
  const isNationalParksProject = project.id === 'us-national-parks';

  return (
    <div className="py-20 px-4 md:px-8 max-w-7xl mx-auto animate-fadeIn">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl md:text-5xl font-light text-white tracking-wide">{project.title}</h1>
        <button onClick={onBack} className="py-2 px-4 bg-white text-neutral-900 rounded-md">Back</button>
      </div>

      {project.description && <p className="text-neutral-300 mb-8">{project.description}</p>}

      {isNationalParksProject ? (
        <NationalParksMap parks={project.galleries} onSelectPark={onOpenAlbum} />
      ) : (
        <AlbumsGrid albums={project.galleries} onOpenAlbum={onOpenAlbum} />
      )}
    </div>
  );
}
