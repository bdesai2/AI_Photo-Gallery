import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ 
  title = 'Professional Photographer in Wylie, TX | Photography Portfolio', 
  description = 'Award-winning photographer in Wylie, TX specializing in landscapes, portraits, events, wildlife, and commercial photography. Serving Dallas-Fort Worth area.',
  image = '/images/hero/hero-image.jpg',
  url = 'https://yourportfolio.com',
  type = 'website',
  name = 'Professional Photography - Wylie, TX'
}) => {
  const fullUrl = url.startsWith('http') ? url : `https://yourportfolio.com${url}`;
  const fullImageUrl = image.startsWith('http') ? image : `https://yourportfolio.com${image}`;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content="photographer in Wylie TX, photography Wylie, professional photographer Dallas, landscapes, portraits, events, wildlife photography, Plano photographer, Dallas Photographer,  Murphy TX photographer" />
      <meta name="author" content={name} />
      <meta name="geo.position" content="33.0183;-96.5100" />
      <meta name="ICBM" content="33.0183, -96.5100" />
      <meta name="geo.placename" content="Wylie, Texas" />
      <meta name="geo.region" content="US-TX" />
      
      {/* Canonical Tag */}
      <link rel="canonical" href={fullUrl} />
      
      {/* Open Graph Meta Tags */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:site_name" content={name} />
      
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImageUrl} />
      
      {/* Additional Meta Tags */}
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="30 days" />
    </Helmet>
  );
};

export default SEO;
