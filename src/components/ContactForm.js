import React, { useState } from 'react';
import { Mail, Instagram, Facebook } from 'lucide-react';

<<<<<<< HEAD
const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    alert('Thank you for your message! I will get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
=======
// ContactForm: Contact section with profile card and email form inputs
// Accepts onSubmit handler prop for backend integration (currently uses local alert demo)
const ContactForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      if (onSubmit) {
        onSubmit(formData);
      }
      setFormData({ name: '', email: '', message: '' });
    } else {
      alert('Please fill in all fields.');
    }
>>>>>>> 7eaa6286336b021a2766dc51e2de6beddf8b655c
  };

  return (
    <section className="py-20 px-4 md:px-8 bg-neutral-800">
<<<<<<< HEAD
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-light text-white mb-12 text-center tracking-wide">
          Get In Touch
        </h2>
        <div className="grid md:grid-cols-2 gap-12">
          <div className="bg-neutral-700 rounded-lg p-8 flex flex-col items-center text-center">
            <div className="w-32 h-32 rounded-full overflow-hidden mb-6 border-4 border-neutral-600">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-2xl font-light text-white mb-4">John Anderson</h3>
            <div className="space-y-4 text-neutral-300">
              <a href="mailto:contact@lensandlight.com" className="flex items-center justify-center gap-2 hover:text-white transition-colors">
                <Mail className="w-5 h-5" />
                contact@lensandlight.com
              </a>
              <div className="flex gap-6 justify-center pt-4">
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  <Instagram className="w-6 h-6" />
                </a>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  <Facebook className="w-6 h-6" />
=======
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-light text-white mb-16 text-center tracking-wide">Get In Touch</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Profile Card */}
          <div className="flex flex-col justify-center">
            <div className="bg-neutral-900 rounded-lg p-8 shadow-lg">
              <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto mb-6"></div>
              <h3 className="text-2xl font-light text-white text-center mb-2">Alex Richardson</h3>
              <p className="text-neutral-400 text-center mb-6">Professional Photographer & Visual Storyteller</p>
              <p className="text-neutral-400 text-center text-sm mb-8 leading-relaxed">
                Capturing moments that tell stories. Specializing in portrait, landscape, and documentary photography.
              </p>
              <div className="flex justify-center gap-6">
                <a href="mailto:alex@example.com" className="text-neutral-400 hover:text-white transition-colors">
                  <Mail size={24} />
                </a>
                <a href="#" className="text-neutral-400 hover:text-white transition-colors">
                  <Instagram size={24} />
                </a>
                <a href="#" className="text-neutral-400 hover:text-white transition-colors">
                  <Facebook size={24} />
>>>>>>> 7eaa6286336b021a2766dc51e2de6beddf8b655c
                </a>
              </div>
            </div>
          </div>

<<<<<<< HEAD
          <div className="space-y-6">
            <input
              type="text"
              placeholder="Your Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 bg-neutral-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-500"
            />
            <input
              type="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 bg-neutral-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-500"
            />
            <textarea
              placeholder="Your Message"
              rows="6"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full px-4 py-3 bg-neutral-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-500 resize-none"
            />
            <button
              onClick={handleSubmit}
              className="w-full py-3 bg-white text-neutral-900 rounded-lg font-medium hover:bg-neutral-200 transition-colors"
            >
              Send Message
            </button>
=======
          {/* Contact Form */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-white text-sm font-medium mb-2">Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange}
                  className="w-full px-4 py-3 bg-neutral-900 text-white border border-neutral-700 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-white text-sm font-medium mb-2">Email</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange}
                  className="w-full px-4 py-3 bg-neutral-900 text-white border border-neutral-700 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="block text-white text-sm font-medium mb-2">Message</label>
                <textarea name="message" value={formData.message} onChange={handleChange} rows="5"
                  className="w-full px-4 py-3 bg-neutral-900 text-white border border-neutral-700 rounded-lg focus:outline-none focus:border-blue-500 transition-colors resize-none"
                  placeholder="Your message..."
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
              > Send Message </button>
            </form>
>>>>>>> 7eaa6286336b021a2766dc51e2de6beddf8b655c
          </div>
        </div>
      </div>
    </section>
  );
};

<<<<<<< HEAD
export default ContactForm;
=======
export default ContactForm;
>>>>>>> 7eaa6286336b021a2766dc51e2de6beddf8b655c
