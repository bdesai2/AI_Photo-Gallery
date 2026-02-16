import { render, screen, fireEvent } from '@testing-library/react';
import Gallery from './Gallery';
import * as data from '../data';

// Mock the data
jest.mock('../data', () => ({
  albums: [
    {
      id: 1,
      title: 'Portraits',
      thumbnail: 'https://example.com/thumb1.jpg',
      count: 24,
      images: []
    },
    {
      id: 2,
      title: 'Landscapes',
      thumbnail: 'https://example.com/thumb2.jpg',
      count: 32,
      images: []
    }
  ]
}));

describe('Gallery Component', () => {
  const defaultProps = {
    setCurrentPage: jest.fn(),
    setSelectedAlbum: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders gallery section', () => {
    const { container } = render(<Gallery {...defaultProps} />);
    expect(container.querySelector('section')).toBeInTheDocument();
  });

  test('displays gallery heading', () => {
    render(<Gallery {...defaultProps} />);
    expect(screen.getByText('Photo Gallery')).toBeInTheDocument();
  });

  test('displays gallery description', () => {
    render(<Gallery {...defaultProps} />);
    expect(screen.getByText('Explore my collection of photography')).toBeInTheDocument();
  });

  test('renders all albums from data', () => {
    render(<Gallery {...defaultProps} />);
    
    expect(screen.getByText('Portraits')).toBeInTheDocument();
    expect(screen.getByText('Landscapes')).toBeInTheDocument();
  });

  test('displays album count for each album', () => {
    render(<Gallery {...defaultProps} />);
    
    expect(screen.getByText('24 Photos')).toBeInTheDocument();
    expect(screen.getByText('32 Photos')).toBeInTheDocument();
  });

  test('calls setSelectedAlbum when album is clicked', () => {
    const mockSetSelectedAlbum = jest.fn();
    const mockSetCurrentPage = jest.fn();
    
    render(
      <Gallery
        setCurrentPage={mockSetCurrentPage}
        setSelectedAlbum={mockSetSelectedAlbum}
      />
    );
    
    const portraitsAlbum = screen.getByText('Portraits').closest('div');
    fireEvent.click(portraitsAlbum);
    
    expect(mockSetSelectedAlbum).toHaveBeenCalledWith(
      expect.objectContaining({ title: 'Portraits' })
    );
  });

  test('calls setCurrentPage with "album" when album is clicked', () => {
    const mockSetSelectedAlbum = jest.fn();
    const mockSetCurrentPage = jest.fn();
    
    render(
      <Gallery
        setCurrentPage={mockSetCurrentPage}
        setSelectedAlbum={mockSetSelectedAlbum}
      />
    );
    
    const portraitsAlbum = screen.getByText('Portraits').closest('div');
    fireEvent.click(portraitsAlbum);
    
    expect(mockSetCurrentPage).toHaveBeenCalledWith('album');
  });

  test('renders album thumbnails with lazy loading', () => {
    const { container } = render(<Gallery {...defaultProps} />);
    
    const images = container.querySelectorAll('img');
    images.forEach(img => {
      expect(img).toHaveAttribute('loading', 'lazy');
    });
  });

  test('applies grid layout classes', () => {
    const { container } = render(<Gallery {...defaultProps} />);
    
    const grid = container.querySelector('.grid');
    expect(grid).toHaveClass('grid-cols-1');
    expect(grid).toHaveClass('md:grid-cols-2');
    expect(grid).toHaveClass('lg:grid-cols-3');
  });
});
