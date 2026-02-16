import { render, screen } from '@testing-library/react';
import Footer from './Footer';

describe('Footer Component', () => {
  test('renders footer element', () => {
    const { container } = render(<Footer />);
    expect(container.querySelector('footer')).toBeInTheDocument();
  });

  test('displays copyright text', () => {
    render(<Footer />);
    expect(screen.getByText(/© 2026 Lens & Light Photography/)).toBeInTheDocument();
  });

  test('displays all rights reserved message', () => {
    render(<Footer />);
    expect(screen.getByText(/All rights reserved/)).toBeInTheDocument();
  });

  test('has correct styling classes', () => {
    const { container } = render(<Footer />);
    const footer = container.querySelector('footer');
    
    expect(footer).toHaveClass('bg-neutral-950');
    expect(footer).toHaveClass('text-neutral-400');
    expect(footer).toHaveClass('py-8');
    expect(footer).toHaveClass('text-center');
  });

  test('renders paragraph with small text size', () => {
    const { container } = render(<Footer />);
    const paragraph = container.querySelector('p');
    
    expect(paragraph).toHaveClass('text-sm');
  });
});
