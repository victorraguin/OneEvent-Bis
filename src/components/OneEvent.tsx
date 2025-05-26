import React, { useRef } from 'react';
import { Calendar, MapPin, Phone, Mail, Music, Users, Brain, PartyPopper } from 'lucide-react';
import { useInView } from '../hooks/useInView';

const OneEvent: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { threshold: 0.1 });

  const services = [
    {
      icon: Music,
      title: "Percussion Workshops",
      description: "Interactive drum circles and rhythm workshops for all levels"
    },
    {
      icon: Brain,
      title: "Music Quiz & Blind Tests",
      description: "Engaging musical challenges and themed competitions"
    },
    {
      icon: Users,
      title: "Team Building",
      description: "Rhythm-based activities for corporate events and team bonding"
    },
    {
      icon: PartyPopper,
      title: "Event Animation",
      description: "Professional entertainment for private parties and corporate events"
    }
  ];

  const upcomingEvents = [
    {
      date: "Mar 15, 2024",
      title: "Corporate Team Building",
      location: "Tech Hub, Paris",
      description: "Interactive rhythm workshop for startup teams"
    },
    {
      date: "Mar 22, 2024",
      title: "90s Music Quiz Night",
      location: "Le Petit Café, Lyon",
      description: "Test your knowledge of 90s hits"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        className="relative h-screen flex items-center justify-center"
        style={{
          backgroundImage: 'url(https://images.pexels.com/photos/2747449/pexels-photo-2747449.jpeg?auto=compress&cs=tinysrgb&w=1920)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-5xl md:text-7xl font-display mb-6">
            ONE EVENT
          </h1>
          <p className="text-xl md:text-2xl text-text-secondary mb-8 max-w-2xl mx-auto">
            Creating Unforgettable Entertainment Experiences
          </p>
          <a href="#contact" className="btn btn-primary">
            Book an Event
          </a>
        </div>
      </section>

      {/* Services Section */}
      <section ref={sectionRef} className="py-20 bg-surface">
        <div className="container-custom">
          <h2 className="text-primary mb-4 relative inline-block">
            Our Services
            <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-primary"></span>
          </h2>
          <p className="text-text-secondary mb-12 max-w-2xl">
            From interactive workshops to engaging entertainment, we create memorable experiences for any occasion.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div 
                key={index}
                className={`bg-background p-6 rounded-lg transition-all duration-700 delay-${index * 100} ${
                  isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
              >
                <service.icon className="text-primary mb-4" size={32} />
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-text-secondary">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Marco Section */}
      <section className="py-20 bg-background">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src="https://images.pexels.com/photos/7520935/pexels-photo-7520935.jpeg?auto=compress&cs=tinysrgb&w=1200" 
                alt="Marco" 
                className="rounded-lg w-full h-[500px] object-cover"
              />
            </div>
            <div>
              <h2 className="text-primary mb-4 relative inline-block">
                Meet Marco
                <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-primary"></span>
              </h2>
              <p className="text-text-secondary mb-6">
                With over 15 years of experience in event entertainment and music education, Marco brings passion and expertise to every event. Specializing in interactive music experiences, team building, and cultural workshops, he creates engaging and memorable moments for all participants.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <Phone className="text-primary" size={20} />
                  <a href="tel:+33123456789" className="text-text-secondary hover:text-primary transition-colors">
                    +33 1 23 45 67 89
                  </a>
                </div>
                <div className="flex items-center gap-4">
                  <Mail className="text-primary" size={20} />
                  <a href="mailto:marco@oneevent.com" className="text-text-secondary hover:text-primary transition-colors">
                    marco@oneevent.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="py-20 bg-surface">
        <div className="container-custom">
          <h2 className="text-primary mb-4 relative inline-block">
            Upcoming Events
            <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-primary"></span>
          </h2>
          <div className="grid md:grid-cols-2 gap-8 mt-12">
            {upcomingEvents.map((event, index) => (
              <div 
                key={index}
                className="bg-background rounded-lg overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <Calendar className="text-primary" size={24} />
                    <span className="text-lg font-medium">{event.date}</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                  <div className="flex items-center text-text-secondary mb-4">
                    <MapPin size={16} className="mr-2" />
                    <span>{event.location}</span>
                  </div>
                  <p className="text-text-secondary">{event.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-background">
        <div className="container-custom">
          <h2 className="text-primary mb-4 relative inline-block">
            Book an Event
            <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-primary"></span>
          </h2>
          <div className="grid md:grid-cols-2 gap-12 mt-12">
            <div>
              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-text-secondary mb-2">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    className="w-full bg-surface border border-gray-700 rounded-lg px-4 py-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-text-secondary mb-2">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    className="w-full bg-surface border border-gray-700 rounded-lg px-4 py-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label htmlFor="event-type" className="block text-text-secondary mb-2">Event Type</label>
                  <select
                    id="event-type"
                    className="w-full bg-surface border border-gray-700 rounded-lg px-4 py-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="">Select an event type</option>
                    <option value="workshop">Percussion Workshop</option>
                    <option value="quiz">Music Quiz</option>
                    <option value="team-building">Team Building</option>
                    <option value="private">Private Event</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="message" className="block text-text-secondary mb-2">Message</label>
                  <textarea
                    id="message"
                    rows={5}
                    className="w-full bg-surface border border-gray-700 rounded-lg px-4 py-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  ></textarea>
                </div>
                <button type="submit" className="btn btn-primary w-full">
                  Send Message
                </button>
              </form>
            </div>
            <div>
              <div className="bg-surface p-8 rounded-lg">
                <h3 className="text-xl font-semibold mb-6">Contact Information</h3>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <Phone className="text-primary mr-4 flex-shrink-0" size={20} />
                    <div>
                      <div className="font-medium">Phone</div>
                      <a href="tel:+33123456789" className="text-text-secondary hover:text-primary transition-colors">
                        +33 1 23 45 67 89
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Mail className="text-primary mr-4 flex-shrink-0" size={20} />
                    <div>
                      <div className="font-medium">Email</div>
                      <a href="mailto:marco@oneevent.com" className="text-text-secondary hover:text-primary transition-colors">
                        marco@oneevent.com
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <MapPin className="text-primary mr-4 flex-shrink-0" size={20} />
                    <div>
                      <div className="font-medium">Location</div>
                      <div className="text-text-secondary">
                        Based in Lyon, France<br />
                        Available for events nationwide
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OneEvent;