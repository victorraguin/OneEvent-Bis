import React from 'react';
import Marquee from 'react-fast-marquee';
import { supabase, Partner } from '../../lib/supabase';

const Partners: React.FC = () => {
  const [partners, setPartners] = React.useState<Partner[]>([]);

  React.useEffect(() => {
    const loadPartners = async () => {
      if (!supabase) return;
      
      try {
        const { data } = await supabase
          .from('partners')
          .select('*')
          .order('order_index', { ascending: true });
        
        if (data) {
          setPartners(data);
        }
      } catch (error) {
        console.error('Error loading partners:', error);
      }
    };

    loadPartners();
  }, []);

  // Fallback data if Supabase not configured
  const defaultPartners = [
    { 
      id: '1',
      name: "Société Générale", 
      logo_url: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=200&h=100&fit=crop",
      website_url: "https://www.societegenerale.com",
      order_index: 1,
      created_at: new Date().toISOString()
    },
    { 
      id: '2',
      name: "BNP Paribas", 
      logo_url: "https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=200&h=100&fit=crop",
      website_url: "https://www.bnpparibas.com",
      order_index: 2,
      created_at: new Date().toISOString()
    },
    { 
      id: '3',
      name: "Orange", 
      logo_url: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=200&h=100&fit=crop",
      website_url: "https://www.orange.com",
      order_index: 3,
      created_at: new Date().toISOString()
    },
    { 
      id: '4',
      name: "Decathlon", 
      logo_url: "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=200&h=100&fit=crop",
      website_url: "https://www.decathlon.com",
      order_index: 4,
      created_at: new Date().toISOString()
    }
  ];

  const partnersToShow = partners.length > 0 ? partners : defaultPartners;

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
            {partnersToShow.map((partner, index) => (
              <div key={partner.id || index} className="mx-8">
                <img
                  src={partner.logo_url}
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