const getImages = (path) => {
  // Dynamically import all images from src/images/hero so you can add/remove files
  // without editing this file. Webpack (CRA) will return module URLs for each import.
  console.log("Loc 0.1: Getting files from " + path + ".");
  const importAll = (r) => r.keys().map(r);
  let heroRaw = [];
  try {
    // false = do not search subdirectories
    heroRaw = importAll(require.context(path, false, /\.(jpe?g|png|webp|avif)$/));
    console.log(`Loc 1: ${heroRaw.count} hero images found.`);
  } catch (e) {
    // If the folder doesn't exist or require.context isn't available, fall back to empty list
    // (This is resilient for unit tests / environments that don't support require.context)
    heroRaw = [];
  }
  return heroRaw;
};

let heroRaw = getImages('../images/hero');
export const heroImages =  heroRaw.map((src, i) => ({ url: src, alt: `Featured Photography ${i + 1}` }));

export const albums = [
  {
    id: 1,
    title: 'Portraits',
    thumbnail: './images/albums/portraits/thumb.jpg',
    count: 24,
    images: getImages('../images/albums/portraits')
  },
  {
    id: 2,
    title: 'Landscapes',
    thumbnail: './images/albums/landscapes/thumb.jpg',
    count: 32,
    images: [
      getImages('../images/albums/portraits')
    ]
  },
  {
    id: 3,
    title: 'Urban',
    thumbnail: './images/albums/street/thumb.jpg',
    count: 18,
    images: [
      getImages('./images/albums/street')
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

export const nationalParks = [
  {
    id: 1,
    name: 'Yellowstone',
    state: 'Wyoming',
    lat: 44.4280,
    lng: -110.5885,
    pinImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=100&h=100&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=1200&h=800&fit=crop'
    ],
    description: 'First national park in the world, known for geysers, hot springs, and wildlife.'
  },
  {
    id: 2,
    name: 'Grand Canyon',
    state: 'Arizona',
    lat: 36.1069,
    lng: -112.1129,
    pinImage: 'https://images.unsplash.com/photo-1615551043360-33de8b5f410c?w=100&h=100&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1615551043360-33de8b5f410c?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1200&h=800&fit=crop'
    ],
    description: 'Iconic canyon carved by the Colorado River, showcasing millions of years of geological history.'
  },
  {
    id: 3,
    name: 'Yosemite',
    state: 'California',
    lat: 37.8651,
    lng: -119.5383,
    pinImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=100&h=100&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=1200&h=800&fit=crop'
    ],
    description: 'Famous for its granite cliffs, waterfalls, and giant sequoia groves.'
  },
  {
    id: 4,
    name: 'Zion',
    state: 'Utah',
    lat: 37.2982,
    lng: -113.0263,
    pinImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=100&h=100&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=1200&h=800&fit=crop'
    ],
    description: 'Known for its steep red cliffs, narrow canyons, and the Virgin River.'
  },
  {
    id: 6,
    name: 'Glacier',
    state: 'Montana',
    lat: 48.7596,
    lng: -113.7870,
    pinImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=100&h=100&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=1200&h=800&fit=crop'
    ],
    description: 'Features over 700 lakes, 1,000 different species of plants, and many animals.'
  },
  {
    id: 5,
    name: 'Rocky Mountain',
    state: 'Colorado',
    lat: 40.3428,
    lng: -105.6836,
    pinImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=100&h=100&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=1200&h=800&fit=crop'
    ],
    description: 'Home to bighorn sheep, black bears, and stunning mountain landscapes.'
  },
  {
    id: 7,
    name: 'Great Smoky Mountains',
    state: 'Tennessee/North Carolina',
    lat: 35.6118,
    lng: -83.4895,
    pinImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=100&h=100&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=1200&h=800&fit=crop'
    ],
    description: 'Most visited national park, known for its biodiversity and hiking trails.'
  },
  {
    id: 8,
    name: 'Joshua Tree',
    state: 'California',
    lat: 33.8734,
    lng: -115.9009,
    pinImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=100&h=100&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=1200&h=800&fit=crop'
    ],
    description: 'Unique desert landscape with Joshua trees and rock formations.'
  }
];