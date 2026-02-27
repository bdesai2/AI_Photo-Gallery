import React, { useState, useMemo } from 'react';
import './NationalParksMap.css';

// StateParksMap: adapted from NationalParksMap. Allows filtering by state
// and region and selects a park to open its gallery. Reuses the same map styles.
export default function StateParksMap({ parks, onSelectPark }) {
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [selectedState, setSelectedState] = useState('all');
  const [hoveredPark, setHoveredPark] = useState(null);

  const regions = useMemo(() => {
    const uniqueRegions = [...new Set(parks.map(park => park.region))];
    return ['all', ...uniqueRegions.sort()];
  }, [parks]);

  const states = useMemo(() => {
    const stateSet = new Set();
    parks.forEach(park => {
      const parkStates = (park.state || '').split('/').map(s => s.trim()).filter(Boolean);
      parkStates.forEach(s => stateSet.add(s));
    });
    return ['all', ...Array.from(stateSet).sort()];
  }, [parks]);

  const filteredParks = useMemo(() => {
    return parks.filter(park => {
      const regionMatch = selectedRegion === 'all' || park.region === selectedRegion;
      const stateMatch = selectedState === 'all' || (park.state && park.state.includes(selectedState));
      return regionMatch && stateMatch;
    });
  }, [parks, selectedRegion, selectedState]);

  const normalizeCoords = (lat, lon) => {
    const svgWidth = 960;
    const svgHeight = 600;
    const minLat = 24;
    const maxLat = 49.5;
    const minLon = -125;
    const maxLon = -66;

    const x = ((lon - minLon) / (maxLon - minLon)) * svgWidth;
    const y = ((maxLat - lat) / (maxLat - minLat)) * svgHeight;

    return { x, y };
  };

  const calculateTooltipPosition = (x, y) => {
    const tooltipWidth = 160;
    const tooltipHeight = 40;
    const padding = 10;
    const fitsAbove = y - tooltipHeight - padding > 0;
    const fitsRight = x + tooltipWidth + padding < 960;

    if (fitsAbove) return { x: x - tooltipWidth / 2, y: y - tooltipHeight - padding, position: 'above' };
    if (fitsRight) return { x: x + padding + 8, y: y - tooltipHeight / 2, position: 'right' };
    return { x: x - tooltipWidth - padding - 8, y: y - tooltipHeight / 2, position: 'left' };
  };

  return (
    <div className="national-parks-map-container">
      <div className="map-controls mb-6">
        <div className="filter-group">
          <label htmlFor="region-filter" className="text-white mr-3 font-semibold">Region:</label>
          <select id="region-filter" value={selectedRegion} onChange={(e) => setSelectedRegion(e.target.value)} className="px-3 py-2 rounded border border-neutral-600 bg-neutral-800 text-white cursor-pointer">
            {regions.map(region => <option key={region} value={region}>{region === 'all' ? 'All Regions' : region}</option>)}
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="state-filter" className="text-white mr-3 font-semibold">State:</label>
          <select id="state-filter" value={selectedState} onChange={(e) => setSelectedState(e.target.value)} className="px-3 py-2 rounded border border-neutral-600 bg-neutral-800 text-white cursor-pointer">
            {states.map(state => <option key={state} value={state}>{state === 'all' ? 'All States' : state}</option>)}
          </select>
        </div>

        <div className="park-count text-neutral-300 ml-auto">Showing {filteredParks.length} of {parks.length} parks</div>
      </div>

      <div className="map-wrapper">
        <svg width="100%" height="600" viewBox="0 0 960 600" preserveAspectRatio="xMidYMid meet" className="us-map-svg">
          <rect width="960" height="600" fill="#0a0a0a" />
          <image href="https://res.cloudinary.com/du9uhtjxi/image/upload/v1771578636/us-map_nshjvo.png" x="0" y="0" width="960" height="600" preserveAspectRatio="xMidYMid slice" />

          {filteredParks.map((park) => {
            // try map-y/map-x first (some entries use these), fallback to latitude/longitude
            const lat = park['map-y'] || park.latitude || 37;
            const lon = park['map-x'] || park.longitude || -95;
            const { x, y } = normalizeCoords(lat, lon);
            const isHovered = hoveredPark?.id === park.id;

            return (
              <g key={park.id} className="park-pin-group">
                <circle cx={x} cy={y} r={isHovered ? 12 : 10} fill="none" stroke="#254d16" strokeWidth={isHovered ? 3 : 2} opacity={isHovered ? 1 : 0.6} className="pin-halo" />
                <circle cx={x} cy={y} r="5" fill="#793f28" className="pin-main" onClick={() => onSelectPark(park)} onMouseEnter={() => setHoveredPark(park)} onMouseLeave={() => setHoveredPark(null)} style={{ cursor: 'pointer' }} />
              </g>
            );
          })}

          {filteredParks.map((park) => {
            const lat = park['map-y'] || park.latitude || 37;
            const lon = park['map-x'] || park.longitude || -95;
            const { x, y } = normalizeCoords(lat, lon);
            const isHovered = hoveredPark?.id === park.id;
            const tooltipPos = calculateTooltipPosition(x, y);

            return isHovered ? (
              <g key={`tooltip-${park.id}`} className="tooltip-group">
                <rect x={tooltipPos.x} y={tooltipPos.y} width="160" height="40" rx="6" fill="#0a0a0a" opacity="1" stroke="#ff6b35" strokeWidth="2" />
                <text x={tooltipPos.x + 80} y={tooltipPos.y + 12} textAnchor="middle" fill="#ff6b35" fontSize="12" fontWeight="bold" className="tooltip-text">{park.title.split(' ').slice(0,2).join(' ')}</text>
                <text x={tooltipPos.x + 80} y={tooltipPos.y + 25} textAnchor="middle" fill="#ccc" fontSize="11" className="tooltip-text">{park.state}</text>
              </g>
            ) : null;
          })}
        </svg>
      </div>

      <div className="parks-list mt-12">
        <h3 className="text-2xl font-light text-white mb-6">{selectedRegion !== 'all' && `${selectedRegion} - `}{selectedState !== 'all' ? selectedState : 'All Locations'}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredParks.map((park) => (
            <div key={park.id} onClick={() => onSelectPark(park)} className="park-card cursor-pointer transition-all hover:scale-105">
              <img src={park.thumbnail} alt={park.title} className="w-full h-40 object-cover rounded-lg mb-2" />
              <h4 className="text-white font-semibold text-lg">{park.title}</h4>
              <p className="text-neutral-400 text-sm">{park.state}</p>
              <p className="text-neutral-500 text-xs mt-2">{park.region}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
