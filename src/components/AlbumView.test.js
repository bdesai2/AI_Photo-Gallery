import { render, screen, fireEvent } from '@testing-library/react';
import AlbumView from './AlbumView';

describe('AlbumView Component', () => {
  const mockAlbum = {
    id: 1,
    title: 'Portraits',
    images: [
      'https://example.com/portrait1.jpg',
      'https://example.com/portrait2.jpg',
      'https://example.com/portrait3.jpg'
    ]
  };

  const defaultProps = {
    selectedAlbum: mockAlbum,
    setCurrentPage: jest.fn(),
    setSelectedAlbum: jest.fn(),
    setSelectedImage: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('does not render when selectedAlbum is null', () => {
    const { container } = render(
      <AlbumView
        selectedAlbum={null}
        setCurrentPage={jest.fn()}
        setSelectedAlbum={jest.fn()}
        setSelectedImage={jest.fn()}
      />
    );
    
    expect(container.firstChild).toBeNull();
  });

  test('renders album view when selectedAlbum is provided', () => {
    const { container } = render(<AlbumView {...defaultProps} />);
    
    expect(container.querySelector('div[class*="min-h-screen"]')).toBeInTheDocument();
  });

  test('displays album title', () => {
    render(<AlbumView {...defaultProps} />);
    
    expect(screen.getByText('Portraits')).toBeInTheDocument();
  });

  test('renders back button', () => {
    render(<AlbumView {...defaultProps} />);
    
    expect(screen.getByText('Back to Gallery')).toBeInTheDocument();
  });

  test('calls setCurrentPage when back button is clicked', () => {
    const mockSetCurrentPage = jest.fn();
    render(
      <AlbumView
        {...defaultProps}
        setCurrentPage={mockSetCurrentPage}
      />
    );
    
    const backButton = screen.getByText('Back to Gallery');
    fireEvent.click(backButton);
    
    expect(mockSetCurrentPage).toHaveBeenCalledWith('gallery');
  });

  test('calls setSelectedAlbum with null when back button is clicked', () => {
    const mockSetSelectedAlbum = jest.fn();
    render(
      <AlbumView
        {...defaultProps}
        setSelectedAlbum={mockSetSelectedAlbum}
      />
    );
    
    const backButton = screen.getByText('Back to Gallery');
    fireEvent.click(backButton);
    
    expect(mockSetSelectedAlbum).toHaveBeenCalledWith(null);
  });

  test('renders all images from album', () => {
    render(<AlbumView {...defaultProps} />);
    
    const images = screen.getAllByRole('img');
    expect(images).toHaveLength(mockAlbum.images.length);
  });

  test('calls setSelectedImage when image is clicked', () => {
    const mockSetSelectedImage = jest.fn();
    render(
      <AlbumView
        {...defaultProps}
        setSelectedImage={mockSetSelectedImage}
      />
    );
    
    const images = screen.getAllByRole('img');
    fireEvent.click(images[0].closest('div'));
    
    expect(mockSetSelectedImage).toHaveBeenCalled();
  });

  test('passes correct index to setSelectedImage', () => {
    const mockSetSelectedImage = jest.fn();
    render(
      <AlbumView
        {...defaultProps}
        setSelectedImage={mockSetSelectedImage}
      />
    );
    
    const images = screen.getAllByRole('img');
    fireEvent.click(images[1].closest('div'));
    
    expect(mockSetSelectedImage).toHaveBeenCalledWith(
      expect.objectContaining({
        index: 1
      })
    );
  });

  test('applies responsive grid layout', () => {
    const { container } = render(<AlbumView {...defaultProps} />);
    
    const grid = container.querySelector('.grid');
    expect(grid).toHaveClass('grid-cols-1');
    expect(grid).toHaveClass('md:grid-cols-2');
    expect(grid).toHaveClass('lg:grid-cols-3');
  });
});
