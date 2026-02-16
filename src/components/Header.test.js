import { render, screen, fireEvent } from '@testing-library/react';
import Header from './Header';

describe('Header Component', () => {
  const defaultProps = {
    currentPage: 'home',
    setCurrentPage: jest.fn(),
    mobileMenuOpen: false,
    setMobileMenuOpen: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders the header with branding', () => {
    render(<Header {...defaultProps} />);
    expect(screen.getByText('LENS & LIGHT')).toBeInTheDocument();
  });

  test('renders all navigation items on desktop', () => {
    render(<Header {...defaultProps} />);
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Gallery')).toBeInTheDocument();
    expect(screen.getByText('Projects')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
  });

  test('calls setCurrentPage when a nav item is clicked', () => {
    const mockSetCurrentPage = jest.fn();
    render(
      <Header {...defaultProps} setCurrentPage={mockSetCurrentPage} />
    );
    
    const galleryBtn = screen.getAllByText('Gallery')[0];
    fireEvent.click(galleryBtn);
    
    expect(mockSetCurrentPage).toHaveBeenCalledWith('gallery');
  });

  test('toggles mobile menu when menu button is clicked', () => {
    const mockSetMobileMenuOpen = jest.fn();
    const { container } = render(
      <Header
        {...defaultProps}
        setMobileMenuOpen={mockSetMobileMenuOpen}
      />
    );
    
    const menuButton = container.querySelector('.md\\:hidden button');
    if (menuButton) {
      fireEvent.click(menuButton);
      expect(mockSetMobileMenuOpen).toHaveBeenCalledWith(true);
    }
  });

  test('highlights current page in navigation', () => {
    const { rerender } = render(
      <Header {...defaultProps} currentPage="home" />
    );
    
    let homeBtn = screen.getAllByText('Home')[0];
    expect(homeBtn.closest('button')).toHaveClass('text-white');

    rerender(
      <Header {...defaultProps} currentPage="gallery" />
    );
    
    const galleryBtn = screen.getAllByText('Gallery')[0];
    expect(galleryBtn.closest('button')).toHaveClass('text-white');
  });
});
