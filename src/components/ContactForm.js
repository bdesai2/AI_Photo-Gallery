import React, { useState } from 'react';
import { Mail, Instagram, Facebook } from 'lucide-react';

// ContactForm: controlled form with simple validation. Parent can pass
// `onSubmit(formData)` to integrate with a backend; otherwise a local
// alert is shown (demo behaviour).
export default function ContactForm({ onSubmit }) {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = () => {
    if (formData.name && formData.email && formData.message) {
      if (onSubmit) onSubmit(formData);
      else alert('Thank you for your message! I will get back to you soon.');
      setFormData({ name: '', email: '', message: '' });
    } else {
      alert('Please fill in all fields.');
    }
  };

  return (
    <section className="py-20 px-4 md:px-8 bg-neutral-800">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-light text-white mb-12 text-center tracking-wide">Get In Touch</h2>
        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact details / profile */}
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
                </a>
              </div>
            </div>
          </div>

          {/* Contact form inputs */}
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
            <button onClick={handleSubmit} className="w-full py-3 bg-white text-neutral-900 rounded-lg font-medium hover:bg-neutral-200 transition-colors">
              Send Message
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
