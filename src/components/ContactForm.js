import React, { useState } from 'react';
import { Mail, Instagram, Facebook } from 'lucide-react';

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
  };

  return (
    <section className="py-20 px-4 md:px-8 bg-neutral-800">
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
                </a>
              </div>
            </div>
          </div>

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
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
