/**
 * JSON-LD Schema generators for SEO structured data
 * These schemas help search engines understand your content better
 */

export const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Your Name',
  url: 'https://yourportfolio.com',
  image: 'https://photofy.me/images/profile.jpg',
  sameAs: [
    'https://www.instagram.com/yourhandle',
    'https://www.facebook.com/yourhandle',
    'https://www.linkedin.com/in/yourprofile',
  ],
  jobTitle: 'Professional Photographer',
  description: 'Award-winning photographer specializing in landscapes, portraits, urban and wildlife photography in Wylie, TX.',
  areaServed: {
    '@type': 'City',
    name: 'Wylie',
    addressRegion: 'TX',
    addressCountry: 'US'
  },
};

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Photography Portfolio',
  url: 'https://yourportfolio.com',
  logo: 'https://photofy.me/logo.png',
  description: 'Professional photography services in Wylie, TX and surrounding areas - landscapes, portraits, events, and commercial photography',
  sameAs: [
    'https://www.instagram.com/yourhandle',
    'https://www.facebook.com/yourhandle',
  ],
  contact: {
    '@type': 'ContactPoint',
    telephone: '+1-XXX-XXX-XXXX',
    contactType: 'Customer Service',
  },
  areaServed: ['Wylie, TX', 'Dallas, TX', 'Plano, TX', 'Murphy, TX', 'Sachse, TX', 'Rockwall, TX'],
};

export const gallerySchema = (albumTitle, images, description) => ({
  '@context': 'https://schema.org',
  '@type': 'ImageGallery',
  name: albumTitle,
  description: description || `${albumTitle} photography collection`,
  associatedMedia: images.map((image, index) => ({
    '@type': 'ImageObject',
    url: image,
    name: `${albumTitle} ${index + 1}`,
    description: `${albumTitle} photography image ${index + 1}`,
  })),
});

export const breadcrumbSchema = (breadcrumbs) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: breadcrumbs.map((crumb, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: crumb.label,
    item: crumb.url,
  })),
});

export const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': 'https://yourportfolio.com',
  name: 'Professional Photography - Wylie, TX',
  image: 'https://photofy.me/images/hero/hero-image.jpg',
  description: 'Award-winning professional photographer serving Wylie, TX and the Dallas-Fort Worth metropolitan area. Specializing in landscapes, portraits, events, wildlife, and commercial photography.',
  url: 'https://yourportfolio.com',
  telephone: '+1-XXX-XXX-XXXX',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Your Street Address',
    addressLocality: 'Wylie',
    addressRegion: 'TX',
    postalCode: 'Your Zip',
    addressCountry: 'US',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: '33.0183',
    longitude: '-96.5100'
  },
  areaServed: [
    {
      '@type': 'City',
      name: 'Wylie',
      addressRegion: 'TX'
    },
    {
      '@type': 'City',
      name: 'Dallas',
      addressRegion: 'TX'
    },
    {
      '@type': 'City',
      name: 'Plano',
      addressRegion: 'TX'
    }
  ],
  priceRange: '$$$',
  sameAs: [
    'https://www.instagram.com/yourhandle',
    'https://www.facebook.com/yourhandle',
  ],
};

export const FAQSchema = (faqs) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
});
