import { render, screen, fireEvent } from '@testing-library/react';
import ContactForm from './ContactForm';

describe('ContactForm Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    global.alert = jest.fn();
    console.log = jest.fn();
  });

  test('renders contact form section', () => {
    const { container } = render(<ContactForm />);
    expect(container.querySelector('section')).toBeInTheDocument();
  });

  test('displays "Get In Touch" heading', () => {
    render(<ContactForm />);
    expect(screen.getByText('Get In Touch')).toBeInTheDocument();
  });

  test('renders profile image', () => {
    render(<ContactForm />);
    const image = screen.getByAltText('Profile');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', expect.stringContaining('unsplash'));
  });

  test('displays contact name', () => {
    render(<ContactForm />);
    expect(screen.getByText('John Anderson')).toBeInTheDocument();
  });

  test('renders email link with correct href', () => {
    render(<ContactForm />);
    const emailLink = screen.getByText('contact@lensandlight.com');
    expect(emailLink).toHaveAttribute('href', 'mailto:contact@lensandlight.com');
  });

  test('renders social media links', () => {
    render(<ContactForm />);
    
    const links = screen.getAllByRole('link');
    // Should have email + 2 social media links
    expect(links.length).toBeGreaterThanOrEqual(3);
  });

  test('renders contact form with input fields', () => {
    render(<ContactForm />);
    
    expect(screen.getByPlaceholderText('Your Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Your Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Your Message')).toBeInTheDocument();
  });

  test('updates form input values on change', () => {
    render(<ContactForm />);
    
    const nameInput = screen.getByPlaceholderText('Your Name');
    const emailInput = screen.getByPlaceholderText('Your Email');
    
    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
    
    expect(nameInput.value).toBe('John Doe');
    expect(emailInput.value).toBe('john@example.com');
  });

  test('clears form after submission', () => {
    render(<ContactForm />);
    
    const nameInput = screen.getByPlaceholderText('Your Name');
    const emailInput = screen.getByPlaceholderText('Your Email');
    const messageInput = screen.getByPlaceholderText('Your Message');
    const submitButton = screen.getByRole('button', { name: /send message/i });
    
    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
    fireEvent.change(messageInput, { target: { value: 'Hello!' } });
    
    fireEvent.click(submitButton);
    
    expect(nameInput.value).toBe('');
    expect(emailInput.value).toBe('');
    expect(messageInput.value).toBe('');
  });

  test('shows confirmation alert on form submission', () => {
    render(<ContactForm />);
    
    const nameInput = screen.getByPlaceholderText('Your Name');
    const emailInput = screen.getByPlaceholderText('Your Email');
    const messageInput = screen.getByPlaceholderText('Your Message');
    const submitButton = screen.getByRole('button', { name: /send message/i });
    
    fireEvent.change(nameInput, { target: { value: 'John' } });
    fireEvent.change(emailInput, { target: { value: 'john@test.com' } });
    fireEvent.change(messageInput, { target: { value: 'Test message' } });
    
    fireEvent.click(submitButton);
    
    expect(global.alert).toHaveBeenCalledWith(
      'Thank you for your message! I will get back to you soon.'
    );
  });

  test('renders submit button', () => {
    render(<ContactForm />);
    expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument();
  });

  test('applies correct styling classes', () => {
    const { container } = render(<ContactForm />);
    const section = container.querySelector('section');
    
    expect(section).toHaveClass('bg-neutral-800');
    expect(section).toHaveClass('py-20');
  });
});
