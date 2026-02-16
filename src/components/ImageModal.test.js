import { render, screen, fireEvent } from '@testing-library/react';
import ImageModal from './ImageModal';

describe('ImageModal Component', () => {
  const mockAlbum = {
    id: 1,
    title: 'Portraits',
    images: [
      'https://example.com/image1.jpg',
      'https://example.com/image2.jpg',
      'https://example.com/image3.jpg'
    ]
  };

  const defaultProps = {
    selectedImage: {
      album: mockAlbum,
      image: mockAlbum.images[0],
      index: 0
    },
    setSelectedImage: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('does not render when selectedImage is null', () => {
    const { container } = render(
      <ImageModal selectedImage={null} setSelectedImage={jest.fn()} />
    );
    
    expect(container.firstChild).toBeNull();
  });

  test('renders modal when selectedImage is provided', () => {
    const { container } = render(<ImageModal {...defaultProps} />);
    
    const modal = container.querySelector('div[class*="fixed"]');
    expect(modal).toBeInTheDocument();
  });

  test('displays the selected image', () => {
    render(<ImageModal {...defaultProps} />);
    
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', mockAlbum.images[0]);
  });

  test('displays image counter', () => {
    render(<ImageModal {...defaultProps} />);
    
    expect(screen.getByText(/1 of 3/)).toBeInTheDocument();
  });

  test('calls setSelectedImage with null when close button is clicked', () => {
    const mockSetSelectedImage = jest.fn();
    const { container } = render(
      <ImageModal {...defaultProps} setSelectedImage={mockSetSelectedImage} />
    );
    
    const closeButton = container.querySelector('button[class*="top-4"]');
    fireEvent.click(closeButton);
    
    expect(mockSetSelectedImage).toHaveBeenCalledWith(null);
  });

  test('advances to next image when next button is clicked', () => {
    const mockSetSelectedImage = jest.fn();
    const { container } = render(
      <ImageModal {...defaultProps} setSelectedImage={mockSetSelectedImage} />
    );
    
    const nextButton = container.querySelector('button[class*="right-4"]:not([class*="top-4"])');
    fireEvent.click(nextButton);
    
    expect(mockSetSelectedImage).toHaveBeenCalledWith({
      album: mockAlbum,
      image: mockAlbum.images[1],
      index: 1
    });
  });

  test('goes to previous image when prev button is clicked', () => {
    const mockSetSelectedImage = jest.fn();
    const { container } = render(
      <ImageModal {...defaultProps} setSelectedImage={mockSetSelectedImage} />
    );
    
    const prevButton = container.querySelector('button[class*="left-4"]');
    fireEvent.click(prevButton);
    
    // When at index 0 and clicking prev, should wrap to last image
    expect(mockSetSelectedImage).toHaveBeenCalledWith({
      album: mockAlbum,
      image: mockAlbum.images[2],
      index: 2
    });
  });

  test('wraps to first image when clicking next on last image', () => {
    const mockSetSelectedImage = jest.fn();
    const selectedImageAtEnd = {
      album: mockAlbum,
      image: mockAlbum.images[2],
      index: 2
    };
    
    const { container } = render(
      <ImageModal selectedImage={selectedImageAtEnd} setSelectedImage={mockSetSelectedImage} />
    );
    
    const nextButton = container.querySelector('button[class*="right-4"]:not([class*="top-4"])');
    fireEvent.click(nextButton);
    
    expect(mockSetSelectedImage).toHaveBeenCalledWith({
      album: mockAlbum,
      image: mockAlbum.images[0],
      index: 0
    });
  });

  test('wraps to last image when clicking prev on first image', () => {
    const mockSetSelectedImage = jest.fn();
    
    const { container } = render(
      <ImageModal {...defaultProps} setSelectedImage={mockSetSelectedImage} />
    );
    
    const prevButton = container.querySelector('button[class*="left-4"]');
    fireEvent.click(prevButton);
    
    expect(mockSetSelectedImage).toHaveBeenCalledWith({
      album: mockAlbum,
      image: mockAlbum.images[2],
      index: 2
    });
  });

  test('renders navigation buttons', () => {
    const { container } = render(<ImageModal {...defaultProps} />);
    
    const buttons = container.querySelectorAll('button');
    // Close, prev, and next buttons
    expect(buttons.length).toBeGreaterThanOrEqual(3);
  });
});
