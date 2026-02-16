import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import HeroSlider from './HeroSlider';
import * as data from '../data';

// Mock the data
jest.mock('../data', () => ({
  heroImages: [
    { url: 'https://example.com/image1.jpg', alt: 'Image 1' },
    { url: 'https://example.com/image2.jpg', alt: 'Image 2' },
    { url: 'https://example.com/image3.jpg', alt: 'Image 3' }
  ]
}));

describe('HeroSlider Component', () => {
  beforeEach(() => {
    jest.clearAllTimers();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  test('renders all hero images', () => {
    render(<HeroSlider />);
    
    const images = screen.getAllByRole('img');
    expect(images).toHaveLength(data.heroImages.length);
  });

  test('displays first image by default', () => {
    render(<HeroSlider />);
    
    const images = screen.getAllByRole('img');
    const firstImage = images[0];
    
    // First image should be visible
    expect(firstImage.closest('div')).toHaveClass('opacity-100');
  });

  test('renders navigation buttons', () => {
    const { container } = render(<HeroSlider />);
    
    const buttons = container.querySelectorAll('button');
    // Should have prev and next buttons plus dot indicators
    expect(buttons.length).toBeGreaterThan(0);
  });

  test('advances to next image when next button is clicked', async () => {
    const { container } = render(<HeroSlider />);
    
    const nextButton = container.querySelector('button:nth-of-type(2)');
    fireEvent.click(nextButton);
    
    await waitFor(() => {
      const images = screen.getAllByRole('img');
      expect(images[1].closest('div')).toHaveClass('opacity-100');
    });
  });

  test('goes to previous image when prev button is clicked', async () => {
    const { container } = render(<HeroSlider />);
    
    // Click next first to move forward
    let nextButton = container.querySelector('button:nth-of-type(2)');
    fireEvent.click(nextButton);
    
    // Then click prev
    let prevButton = container.querySelector('button:nth-of-type(1)');
    fireEvent.click(prevButton);
    
    await waitFor(() => {
      const images = screen.getAllByRole('img');
      expect(images[0].closest('div')).toHaveClass('opacity-100');
    });
  });

  test('auto-advances image every 5 seconds', async () => {
    render(<HeroSlider />);
    
    // Initial: first image
    let images = screen.getAllByRole('img');
    expect(images[0].closest('div')).toHaveClass('opacity-100');
    
    // Advance 5 seconds
    jest.advanceTimersByTime(5000);
    
    await waitFor(() => {
      images = screen.getAllByRole('img');
      expect(images[1].closest('div')).toHaveClass('opacity-100');
    });
  });

  test('wraps around to first image after last image', async () => {
    const { container } = render(<HeroSlider />);
    
    // Click next button multiple times to reach the last image
    let nextButton = container.querySelector('button:nth-of-type(2)');
    fireEvent.click(nextButton);
    fireEvent.click(nextButton);
    fireEvent.click(nextButton); // Now at last image
    fireEvent.click(nextButton); // Should wrap to first
    
    await waitFor(() => {
      const images = screen.getAllByRole('img');
      expect(images[0].closest('div')).toHaveClass('opacity-100');
    });
  });
});
