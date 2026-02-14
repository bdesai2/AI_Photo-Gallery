import React from 'react';

// ProjectsGrid: displays a grid of photography projects. Each project
// contains a thumbnail and title. Clicking a project triggers `onOpenProject`.
export default function ProjectsGrid({ projects, onOpenProject }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project, index) => (
        <div
          key={project.id}
          className="group relative overflow-hidden rounded-lg cursor-pointer animate-fadeIn"
          style={{ animationDelay: `${index * 100}ms` }}
          onClick={() => onOpenProject && onOpenProject(project)}
        >
          <img
            data-src={project.thumbnail}
            alt={project.title}
            className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <h3 className="text-2xl font-light mb-2">{project.title}</h3>
            {project.description && <p className="text-sm opacity-80">{project.description}</p>}
          </div>
        </div>
      ))}
    </div>
  );
}
