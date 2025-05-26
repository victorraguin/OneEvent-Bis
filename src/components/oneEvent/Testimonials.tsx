import React, { useState, useEffect } from 'react';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: "Sophie Martin",
    company: "Tech Solutions",
    content: "Une expérience incroyable pour notre équipe ! Marco a su créer une ambiance unique et fédératrice.",
    rating: 5,
    image: "/OneEvent/testimonials/sophie.jpg"
  },
  {
    name: "Jean Dupont",
    company: "Startup Innovation",
    content: "Le blind test organisé par Marco était parfaitement adapté à notre soirée d'entreprise. Un vrai succès !",
    rating: 5,
    image: "/OneEvent/testimonials/jean.jpg"
  },
  {
    name: "Marie Lambert",
    company: "Creative Agency",
    content: "Les ateliers de percussion ont apporté une nouvelle dimension à notre team building. Merci Marco !",
    rating: 5,
    image: "/OneEvent/testimonials/marie.jpg"
  }
];

const Testimonials: React.FC = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section id="testimonials" className="py-20 bg-surface">
      <div className="container-custom">
        <h2 className="text-primary mb-4 relative inline-block">
          Témoignages
          <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-primary"></span>
        </h2>
        <div className="mt-12 relative">
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="w-full flex-shrink-0 px-4"
                >
                  <div className="bg-background p-8 rounded-lg max-w-2xl mx-auto">
                    <div className="flex gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          size={20}
                          className="text-primary fill-primary"
                        />
                      ))}
                    </div>
                    <p className="text-text-secondary mb-6 text-lg italic">"{testimonial.content}"</p>
                    <div className="flex items-center gap-4">
                      <div>
                        <p className="font-semibold">{testimonial.name}</p>
                        <p className="text-text-secondary text-sm">{testimonial.company}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-center mt-8 gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-colors ${
                  currentTestimonial === index ? 'bg-primary' : 'bg-gray-600'
                }`}
                onClick={() => setCurrentTestimonial(index)}
                aria-label={`Voir le témoignage ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;