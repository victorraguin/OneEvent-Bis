/*
  # Add sample data for all tables

  1. Sample Data Added
    - Events: Sample events for both Wassa and Wan'Event
    - Gallery: Sample images and videos for both sites
    - Music: Sample music tracks for Wassa
    - Ensemble: Sample team members for Wassa
    - Services: Sample services for Wan'Event
    - Partners: Sample partners for Wan'Event

  2. Data Structure
    - All tables populated with realistic sample data
    - Proper order_index values for sorting
    - Mix of content types where applicable
*/

-- Sample Events
INSERT INTO events (site, title, date, time, location, description, image_url) VALUES
('wassa', 'Festival Global Rhythms', '2025-06-15', '19:00', 'Central Park, New York', 'Rejoignez-nous pour une soirée de rythmes pulsants et de danse au Festival Global Rhythms annuel.', 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=800'),
('wassa', 'Atelier d''Échange Culturel', '2025-07-22', '14:00', 'World Music Center, Londres', 'Un atelier interactif explorant les diverses traditions de percussion d''Afrique de l''Ouest.', 'https://images.pexels.com/photos/3721941/pexels-photo-3721941.jpeg?auto=compress&cs=tinysrgb&w=800'),
('wanevent', 'Team Building Entreprise', '2025-03-15', '14:00', 'Tech Hub, Paris', 'Atelier de rythme interactif pour équipes de startup', 'https://images.pexels.com/photos/1181396/pexels-photo-1181396.jpeg?auto=compress&cs=tinysrgb&w=800'),
('wanevent', 'Soirée Quiz Années 90', '2025-03-22', '20:00', 'Le Petit Café, Lyon', 'Testez vos connaissances des hits des années 90', 'https://images.pexels.com/photos/167636/pexels-photo-167636.jpeg?auto=compress&cs=tinysrgb&w=800');

-- Sample Gallery Items
INSERT INTO gallery (site, type, src, thumbnail, caption, order_index) VALUES
('wassa', 'image', 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=800', NULL, 'Wassa Percussion Live au Festival Global Rhythms', 1),
('wassa', 'video', 'https://player.vimeo.com/video/367752291', 'https://images.pexels.com/photos/3721941/pexels-photo-3721941.jpeg?auto=compress&cs=tinysrgb&w=400', 'Performance Traditionnelle de Djembé', 2),
('wassa', 'image', 'https://images.pexels.com/photos/3721941/pexels-photo-3721941.jpeg?auto=compress&cs=tinysrgb&w=800', NULL, 'Atelier Communautaire à Dakar', 3),
('wanevent', 'image', 'https://images.pexels.com/photos/1181396/pexels-photo-1181396.jpeg?auto=compress&cs=tinysrgb&w=800', NULL, 'Team Building Musical', 1),
('wanevent', 'image', 'https://images.pexels.com/photos/167636/pexels-photo-167636.jpeg?auto=compress&cs=tinysrgb&w=800', NULL, 'Quiz Musical Interactif', 2);

-- Sample Music Tracks
INSERT INTO music (title, artist, src, image, order_index) VALUES
('Rhythm of Senegal', 'Wassa Percussion', 'https://cdn.pixabay.com/download/audio/2023/04/21/audio_0624cb19aa.mp3?filename=african-percussion-141912.mp3', 'https://images.pexels.com/photos/2531728/pexels-photo-2531728.jpeg?auto=compress&cs=tinysrgb&w=600', 1),
('Djembe Fusion', 'Wassa Percussion', 'https://cdn.pixabay.com/download/audio/2022/11/17/audio_89ef77c9a3.mp3?filename=moroccan-desert-145307.mp3', 'https://images.pexels.com/photos/6884636/pexels-photo-6884636.jpeg?auto=compress&cs=tinysrgb&w=600', 2),
('Ancestral Beats', 'Wassa Percussion', 'https://cdn.pixabay.com/download/audio/2022/09/29/audio_1d3fc408d2.mp3?filename=arabic-139726.mp3', 'https://images.pexels.com/photos/2797369/pexels-photo-2797369.jpeg?auto=compress&cs=tinysrgb&w=600', 3);

-- Sample Ensemble Members
INSERT INTO ensemble (name, role, image_url, bio, order_index) VALUES
('Kofi Mensah', 'Percussionniste Principal', 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400', 'Maître percussionniste avec plus de 20 ans d''expérience dans les rythmes traditionnels ouest-africains.', 1),
('Ama Diop', 'Danseuse & Chanteuse', 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400', 'Artiste polyvalente spécialisée dans les danses traditionnelles et le chant africain.', 2),
('Kwame Osei', 'Percussion', 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=400', 'Percussionniste talentueux formé dans les traditions musicales du Ghana.', 3),
('Fatima Kamara', 'Danseuse', 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=400', 'Danseuse expressive qui apporte grâce et énergie à chaque performance.', 4);

-- Sample Services
INSERT INTO services (title, description, icon, order_index) VALUES
('Ateliers de Percussion', 'Cercles de tambours interactifs et ateliers de rythme pour tous niveaux', 'Music', 1),
('Quiz Musical & Blind Tests', 'Défis musicaux captivants et compétitions thématiques', 'Brain', 2),
('Team Building', 'Activités rythmiques pour événements d''entreprise et cohésion d''équipe', 'Users', 3),
('Animation d''Événements', 'Divertissement professionnel pour fêtes privées et événements d''entreprise', 'PartyPopper', 4);

-- Sample Partners
INSERT INTO partners (name, logo_url, website_url, order_index) VALUES
('Société Générale', 'https://images.pexels.com/photos/259027/pexels-photo-259027.jpeg?auto=compress&cs=tinysrgb&w=200', 'https://www.societegenerale.com', 1),
('BNP Paribas', 'https://images.pexels.com/photos/259027/pexels-photo-259027.jpeg?auto=compress&cs=tinysrgb&w=200', 'https://www.bnpparibas.com', 2),
('Orange', 'https://images.pexels.com/photos/259027/pexels-photo-259027.jpeg?auto=compress&cs=tinysrgb&w=200', 'https://www.orange.com', 3),
('Decathlon', 'https://images.pexels.com/photos/259027/pexels-photo-259027.jpeg?auto=compress&cs=tinysrgb&w=200', 'https://www.decathlon.com', 4);