import React from 'react';
import Marquee from 'react-fast-marquee';

const partners = [
  { name: "Société Générale", logo: "/OneEvent/logos/societe-generale.png" },
  { name: "BNP Paribas", logo: "/OneEvent/logos/bnp.png" },
  { name: "Orange", logo: "/OneEvent/logos/orange.png" },
  { name: "Decathlon", logo: "/OneEvent/logos/decathlon.png" },
  { name: "Carrefour", logo: "/OneEvent/logos/carrefour.png" },
  { name: "Total", logo: "/OneEvent/logos/total.png" }
];

const Partners: React.FC = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container-custom">
        <h2 className="text-primary mb-4 relative inline-block">
          Ils nous font confiance
          <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-primary"></span>
        </h2>
        <div className="mt-12">
          <Marquee
            gradient={true}
            gradientColor={[18, 18, 18]}
            speed={40}
            pauseOnHover={true}
          >
            {partners.map((partner, index) => (
              <div key={index} className="mx-8">
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="h-12 w-auto grayscale hover:grayscale-0 transition-all duration-300"
                />
              </div>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
};

export default Partners;