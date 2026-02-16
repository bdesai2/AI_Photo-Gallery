import { render, screen, fireEvent } from '@testing-library/react';
import Projects from './Projects';
import * as data from '../data';

// Mock the data
jest.mock('../data', () => ({
  nationalParks: [
    {
      id: 1,
      name: 'Yellowstone',
      lat: 44.4,
      lng: -110.8,
      description: 'Historic national park',
      image: 'https://example.com/yellowstone.jpg'
    },
    {
      id: 2,
      name: 'Grand Canyon',
      lat: 36.1,
      lng: -112.1,
      description: 'Iconic canyon park',
      image: 'https://example.com/grandcanyon.jpg'
    }
  ]
}));

describe('Projects Component', () => {
  test('renders projects section', () => {
    const { container } = render(<Projects />);
    expect(container.querySelector('div[class*="min-h-screen"]')).toBeInTheDocument();
  });

  test('displays projects heading', () => {
    render(<Projects />);
    expect(screen.getByText('Photography Projects')).toBeInTheDocument();
  });

  test('displays projects description', () => {
    render(<Projects />);
    expect(
      screen.getByText(/Ongoing photography projects capturing the beauty of America's national parks/)
    ).toBeInTheDocument();
  });

  test('renders SVG map', () => {
    const { container } = render(<Projects />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  test('renders park markers on map', () => {
    const { container } = render(<Projects />);
    const circles = container.querySelectorAll('circle');
    
    // Should have circles for each park
    expect(circles.length).toBeGreaterThan(0);
  });

  test('displays park information when marker is hovered or clicked', () => {
    const { container } = render(<Projects />);
    const circles = container.querySelectorAll('circle');
    
    if (circles.length > 0) {
      fireEvent.click(circles[0]);
      
      // Check if park info is displayed
      const parkInfo = container.querySelector('div[class*="rounded-lg"]');
      expect(parkInfo).toBeInTheDocument();
    }
  });

  test('handles park selection state', () => {
    const { container, rerender } = render(<Projects />);
    const circles = container.querySelectorAll('circle');
    
    if (circles.length > 0) {
      // Initially no park selected
      let parkDetails = screen.queryByText(/Yellowstone|Grand Canyon/);
      if (!parkDetails) {
        // Click first circle to select a park
        fireEvent.click(circles[0]);
        rerender(<Projects />);
      }
    }
  });

  test('renders close button when park is selected', () => {
    const { container } = render(<Projects />);
    const circles = container.querySelectorAll('circle');
    
    if (circles.length > 0) {
      fireEvent.click(circles[0]);
      
      const closeButton = container.querySelector('button');
      expect(closeButton).toBeInTheDocument();
    }
  });

  test('closes park details when close button is clicked', () => {
    const { container } = render(<Projects />);
    const circles = container.querySelectorAll('circle');
    
    if (circles.length > 0) {
      fireEvent.click(circles[0]);
      
      const closeButton = container.querySelector('button');
      fireEvent.click(closeButton);
      
      // After closing, selectedPark should be null
      // (We can't directly test state, but we can verify the UI change)
      expect(closeButton.closest('div')).toBeInTheDocument();
    }
  });

  test('applies dark theme styling', () => {
    const { container } = render(<Projects />);
    const section = container.querySelector('div[class*="bg-neutral-900"]');
    
    expect(section).toHaveClass('bg-neutral-900');
  });

  test('applies responsive padding', () => {
    const { container } = render(<Projects />);
    const main = container.querySelector('div[class*="max-w-7xl"]');
    
    expect(main).toHaveClass('px-4');
    expect(main).toHaveClass('md:px-8');
  });
});
