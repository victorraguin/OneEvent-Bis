import React, { useState, useRef } from 'react';
import { Mail, Phone, MapPin, Calendar } from 'lucide-react';
import { useInView } from '../hooks/useInView';

const Contact: React.FC = () => {
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { threshold: 0.1 });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    
    // Simulate form submission
    setTimeout(() => {
      setFormStatus('success');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
      
      // Reset form status after 3 seconds
      setTimeout(() => {
        setFormStatus('idle');
      }, 3000);
    }, 1500);
  };

  return (
    <section id="contact" ref={sectionRef} className="section bg-surface">
      <div className="container-custom">
        <h2 className="text-primary mb-4 relative inline-block">
          Contact Us
          <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-primary"></span>
        </h2>
        <p className="text-text-secondary mb-12 max-w-2xl">
          Interested in booking Wassa Percussion for your event or workshop? Get in touch with us.
        </p>
        
        <div className="grid md:grid-cols-2 gap-12">
          <div className={`transition-all duration-700 ${isInView ? 'opacity-100' : 'opacity-0 translate-y-10'}`}>
          <div className={`optimized-transition transition-all duration-300 ${isInView ? 'opacity-100' : 'opacity-0 translate-y-6'}`}>
            <div className="bg-background p-8 rounded-lg">
              <h3 className="text-xl font-semibold mb-6">Get In Touch</h3>
              
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="name" className="block text-text-secondary mb-2">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-surface border border-gray-700 rounded-lg px-4 py-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="email" className="block text-text-secondary mb-2">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-surface border border-gray-700 rounded-lg px-4 py-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="subject" className="block text-text-secondary mb-2">Subject</label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full bg-surface border border-gray-700 rounded-lg px-4 py-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="">Select an option</option>
                    <option value="booking">Performance Booking</option>
                    <option value="workshop">Workshop Inquiry</option>
                    <option value="collaboration">Collaboration</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="message" className="block text-text-secondary mb-2">Your Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full bg-surface border border-gray-700 rounded-lg px-4 py-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  disabled={formStatus === 'submitting'}
                  className="btn btn-primary w-full"
                >
                  {formStatus === 'submitting' ? 'Sending...' : 'Send Message'}
                </button>
                
                {formStatus === 'success' && (
                  <div className="mt-4 p-3 bg-success/20 border border-success text-text-primary rounded-lg">
                    Thank you for your message. We'll get back to you soon!
                  </div>
                )}
                
                {formStatus === 'error' && (
                  <div className="mt-4 p-3 bg-error/20 border border-error text-text-primary rounded-lg">
                    There was an error sending your message. Please try again.
                  </div>
                )}
              </form>
            </div>
          </div>
          
          <div className={`optimized-transition transition-all duration-300 delay-150 ${isInView ? 'opacity-100' : 'opacity-0 translate-y-6'}`}>
            <div className="h-full flex flex-col">
              <div className="bg-background p-8 rounded-lg mb-6 flex-1">
                <h3 className="text-xl font-semibold mb-6">Contact Information</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <Mail className="text-primary mr-4 flex-shrink-0" size={20} />
                    <div>
                      <div className="font-medium">Email</div>
                      <a href="mailto:info@wassapercussion.com" className="text-text-secondary hover:text-primary transition-colors">
                        info@wassapercussion.com
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Phone className="text-primary mr-4 flex-shrink-0" size={20} />
                    <div>
                      <div className="font-medium">Phone</div>
                      <a href="tel:+1234567890" className="text-text-secondary hover:text-primary transition-colors">
                        +1 (234) 567-890
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <MapPin className="text-primary mr-4 flex-shrink-0" size={20} />
                    <div>
                      <div className="font-medium">Location</div>
                      <div className="text-text-secondary">
                        Dakar, Senegal and touring worldwide
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Calendar className="text-primary mr-4 flex-shrink-0" size={20} />
                    <div>
                      <div className="font-medium">Availability</div>
                      <div className="text-text-secondary">
                        Available for bookings throughout 2025
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-background p-8 rounded-lg">
                <h3 className="text-xl font-semibold mb-6">Follow Us</h3>
                <div className="flex gap-4">
                  <a
                    href="#"
                    className="w-12 h-12 rounded-full bg-surface flex items-center justify-center hover:bg-primary transition-colors"
                    aria-label="Instagram"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                  </a>
                  <a
                    href="#"
                    className="w-12 h-12 rounded-full bg-surface flex items-center justify-center hover:bg-primary transition-colors"
                    aria-label="Facebook"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                  </a>
                  <a
                    href="#"
                    className="w-12 h-12 rounded-full bg-surface flex items-center justify-center hover:bg-primary transition-colors"
                    aria-label="Youtube"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><path d="m10 15 5-3-5-3z"/></svg>
                  </a>
                  <a
                    href="#"
                    className="w-12 h-12 rounded-full bg-surface flex items-center justify-center hover:bg-primary transition-colors"
                    aria-label="Twitter"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
  )
}