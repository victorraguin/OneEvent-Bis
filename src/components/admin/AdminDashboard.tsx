import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Calendar, 
  Image, 
  Music, 
  Users, 
  Settings, 
  LogOut,
  Plus,
  Edit,
  Trash2,
  Briefcase,
  Handshake
} from 'lucide-react';
import { supabase, Event, GalleryItem, MusicTrack, EnsembleMember, Service, Partner } from '../../lib/supabase';
import EventForm from './forms/EventForm';
import GalleryForm from './forms/GalleryForm';
import MusicForm from './forms/MusicForm';
import EnsembleForm from './forms/EnsembleForm';
import ServicesForm from './forms/ServicesForm';
import PartnersForm from './forms/PartnersForm';

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('events');
  const [activeSite, setActiveSite] = useState<'wassa' | 'wanevent'>('wassa');
  const [isLoading, setIsLoading] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  
  // Data states
  const [events, setEvents] = useState<Event[]>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [music, setMusic] = useState<MusicTrack[]>([]);
  const [ensemble, setEnsemble] = useState<EnsembleMember[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [partners, setPartners] = useState<Partner[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      if (!supabase) return;
      
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          navigate('/admin');
        }
      } catch (error) {
        console.warn('Erreur lors de la vérification auth:', error);
      }
    };
    checkAuth();
  }, [navigate]);

  const handleLogout = async () => {
    if (!supabase) return;
    await supabase.auth.signOut();
    navigate('/admin');
  };

  const loadData = async () => {
    if (!supabase) {
      console.warn('Supabase non configuré');
      return;
    }
    
    setIsLoading(true);
    try {
      switch (activeTab) {
        case 'events':
          const { data: eventsData } = await supabase
            .from('events')
            .select('*')
            .eq('site', activeSite)
            .order('date', { ascending: true });
          setEvents(eventsData || []);
          break;
          
        case 'gallery':
          const { data: galleryData } = await supabase
            .from('gallery')
            .select('*')
            .eq('site', activeSite)
            .order('order_index', { ascending: true });
          setGallery(galleryData || []);
          break;
          
        case 'music':
          const { data: musicData } = await supabase
            .from('music')
            .select('*')
            .order('order_index', { ascending: true });
          setMusic(musicData || []);
          break;
          
        case 'ensemble':
          const { data: ensembleData } = await supabase
            .from('ensemble')
            .select('*')
            .order('order_index', { ascending: true });
          setEnsemble(ensembleData || []);
          break;
          
        case 'services':
          const { data: servicesData } = await supabase
            .from('services')
            .select('*')
            .order('order_index', { ascending: true });
          setServices(servicesData || []);
          break;
          
        case 'partners':
          const { data: partnersData } = await supabase
            .from('partners')
            .select('*')
            .order('order_index', { ascending: true });
          setPartners(partnersData || []);
          break;
      }
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [activeTab, activeSite]);

  const handleDelete = async (id: string, table: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cet élément ?')) return;
    if (!supabase) return;

    try {
      await supabase.from(table).delete().eq('id', id);
      loadData();
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const handleSave = async (data: any, table: string, isEdit: boolean = false) => {
    if (!supabase) return;
    
    try {
      if (isEdit) {
        await supabase.from(table).update(data).eq('id', data.id);
      } else {
        await supabase.from(table).insert([data]);
      }
      
      setEditingItem(null);
      setShowAddForm(false);
      loadData();
    } catch (error) {
      console.error('Error saving item:', error);
    }
  };

  const handleCancel = () => {
    setEditingItem(null);
    setShowAddForm(false);
  };

  // Render tabs content
  const renderTabContent = () => {
    if (isLoading) {
      return (
        <div className="flex justify-center items-center h-64">
          <div className="text-text-secondary">Chargement...</div>
        </div>
      );
    }

    switch (activeTab) {
      case 'events':
        return (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Gestion des Événements - {activeSite === 'wassa' ? 'Wassa Percussion' : "Wan'Event"}</h2>
              <button onClick={() => setShowAddForm(true)} className="btn btn-primary">
                <Plus size={16} className="mr-2" />
                Nouvel événement
              </button>
            </div>
            {showAddForm && (
              <EventForm
                activeSite={activeSite}
                onSave={handleSave}
                onCancel={handleCancel}
              />
            )}
            {editingItem && (
              <EventForm
                event={editingItem}
                activeSite={activeSite}
                onSave={handleSave}
                onCancel={handleCancel}
              />
            )}
            <div className="space-y-4">
              {events.map((event) => (
                <div key={event.id} className="bg-surface p-4 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold">{event.title}</h3>
                      <p className="text-text-secondary">{event.date} {event.time && `- ${event.time}`}</p>
                      <p className="text-text-secondary">{event.location}</p>
                      {event.description && <p className="text-text-secondary mt-2">{event.description}</p>}
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => setEditingItem(event)} className="text-primary hover:text-primary/80">
                        <Edit size={16} />
                      </button>
                      <button onClick={() => handleDelete(event.id, 'events')} className="text-error hover:text-error/80">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'gallery':
        return (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Gestion de la Galerie - {activeSite === 'wassa' ? 'Wassa Percussion' : "Wan'Event"}</h2>
              <button onClick={() => setShowAddForm(true)} className="btn btn-primary">
                <Plus size={16} className="mr-2" />
                Nouvel élément
              </button>
            </div>
            {showAddForm && (
              <GalleryForm
                activeSite={activeSite}
                onSave={handleSave}
                onCancel={handleCancel}
              />
            )}
            {editingItem && (
              <GalleryForm
                item={editingItem}
                activeSite={activeSite}
                onSave={handleSave}
                onCancel={handleCancel}
              />
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {gallery.map((item) => (
                <div key={item.id} className="bg-surface p-4 rounded-lg">
                  <img src={item.type === 'video' ? item.thumbnail : item.src} alt={item.caption} className="w-full h-32 object-cover rounded mb-2" />
                  <p className="text-sm font-medium">{item.caption}</p>
                  <p className="text-xs text-text-secondary">{item.type} - Ordre: {item.order_index}</p>
                  <div className="flex gap-2 mt-2">
                    <button onClick={() => setEditingItem(item)} className="text-primary hover:text-primary/80">
                      <Edit size={14} />
                    </button>
                    <button onClick={() => handleDelete(item.id, 'gallery')} className="text-error hover:text-error/80">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'music':
        return (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Gestion de la Musique</h2>
              <button onClick={() => setShowAddForm(true)} className="btn btn-primary">
                <Plus size={16} className="mr-2" />
                Nouvelle piste
              </button>
            </div>
            {showAddForm && (
              <MusicForm
                onSave={handleSave}
                onCancel={handleCancel}
              />
            )}
            {editingItem && (
              <MusicForm
                track={editingItem}
                onSave={handleSave}
                onCancel={handleCancel}
              />
            )}
            <div className="space-y-4">
              {music.map((track) => (
                <div key={track.id} className="bg-surface p-4 rounded-lg flex items-center gap-4">
                  {track.image && <img src={track.image} alt={track.title} className="w-16 h-16 object-cover rounded" />}
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold">{track.title}</h3>
                    <p className="text-text-secondary">{track.artist}</p>
                    <p className="text-xs text-text-secondary">Ordre: {track.order_index}</p>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => setEditingItem(track)} className="text-primary hover:text-primary/80">
                      <Edit size={16} />
                    </button>
                    <button onClick={() => handleDelete(track.id, 'music')} className="text-error hover:text-error/80">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'ensemble':
        return (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Gestion de l'Ensemble</h2>
              <button onClick={() => setShowAddForm(true)} className="btn btn-primary">
                <Plus size={16} className="mr-2" />
                Nouveau membre
              </button>
            </div>
            {showAddForm && (
              <EnsembleForm
                onSave={handleSave}
                onCancel={handleCancel}
              />
            )}
            {editingItem && (
              <EnsembleForm
                member={editingItem}
                onSave={handleSave}
                onCancel={handleCancel}
              />
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {ensemble.map((member) => (
                <div key={member.id} className="bg-surface p-4 rounded-lg">
                  {member.image_url && <img src={member.image_url} alt={member.name} className="w-full h-32 object-cover rounded mb-2" />}
                  <h3 className="text-lg font-semibold">{member.name}</h3>
                  <p className="text-text-secondary">{member.role}</p>
                  {member.bio && <p className="text-sm text-text-secondary mt-2">{member.bio}</p>}
                  <p className="text-xs text-text-secondary mt-2">Ordre: {member.order_index}</p>
                  <div className="flex gap-2 mt-2">
                    <button onClick={() => setEditingItem(member)} className="text-primary hover:text-primary/80">
                      <Edit size={14} />
                    </button>
                    <button onClick={() => handleDelete(member.id, 'ensemble')} className="text-error hover:text-error/80">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'services':
        return (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Gestion des Services</h2>
              <button onClick={() => setShowAddForm(true)} className="btn btn-primary">
                <Plus size={16} className="mr-2" />
                Nouveau service
              </button>
            </div>
            {showAddForm && (
              <ServicesForm
                onSave={handleSave}
                onCancel={handleCancel}
              />
            )}
            {editingItem && (
              <ServicesForm
                service={editingItem}
                onSave={handleSave}
                onCancel={handleCancel}
              />
            )}
            <div className="space-y-4">
              {services.map((service) => (
                <div key={service.id} className="bg-surface p-4 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold">{service.title}</h3>
                      <p className="text-text-secondary">{service.description}</p>
                      <p className="text-xs text-text-secondary mt-2">Icône: {service.icon} - Ordre: {service.order_index}</p>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => setEditingItem(service)} className="text-primary hover:text-primary/80">
                        <Edit size={16} />
                      </button>
                      <button onClick={() => handleDelete(service.id, 'services')} className="text-error hover:text-error/80">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'partners':
        return (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Gestion des Partenaires</h2>
              <button onClick={() => setShowAddForm(true)} className="btn btn-primary">
                <Plus size={16} className="mr-2" />
                Nouveau partenaire
              </button>
            </div>
            {showAddForm && (
              <PartnersForm
                onSave={handleSave}
                onCancel={handleCancel}
              />
            )}
            {editingItem && (
              <PartnersForm
                partner={editingItem}
                onSave={handleSave}
                onCancel={handleCancel}
              />
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {partners.map((partner) => (
                <div key={partner.id} className="bg-surface p-4 rounded-lg">
                  <img src={partner.logo_url} alt={partner.name} className="w-full h-20 object-contain rounded mb-2" />
                  <h3 className="text-lg font-semibold">{partner.name}</h3>
                  {partner.website_url && (
                    <a href={partner.website_url} target="_blank" rel="noopener noreferrer" className="text-primary text-sm hover:underline">
                      Visiter le site
                    </a>
                  )}
                  <p className="text-xs text-text-secondary mt-2">Ordre: {partner.order_index}</p>
                  <div className="flex gap-2 mt-2">
                    <button onClick={() => setEditingItem(partner)} className="text-primary hover:text-primary/80">
                      <Edit size={14} />
                    </button>
                    <button onClick={() => handleDelete(partner.id, 'partners')} className="text-error hover:text-error/80">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return <div>Sélectionnez un onglet</div>;
    }
  };

  const tabs = [
    { id: 'events', label: 'Événements', icon: Calendar },
    { id: 'gallery', label: 'Galerie', icon: Image },
    { id: 'music', label: 'Musique', icon: Music, wassaOnly: true },
    { id: 'ensemble', label: 'Ensemble', icon: Users, wassaOnly: true },
    { id: 'services', label: 'Services', icon: Briefcase, waneventOnly: true },
    { id: 'partners', label: 'Partenaires', icon: Handshake, waneventOnly: true },
  ];

  const filteredTabs = tabs.filter(tab => {
    if (tab.wassaOnly && activeSite !== 'wassa') return false;
    if (tab.waneventOnly && activeSite !== 'wanevent') return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="w-full h-screen flex flex-col">
        {/* Header */}
        <div className="bg-surface border-b border-gray-700 p-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-primary">Dashboard Admin</h1>
            <div className="flex items-center gap-4">
              <div className="flex bg-background rounded-lg p-1">
                <button
                  onClick={() => setActiveSite('wassa')}
                  className={`px-4 py-2 rounded ${
                    activeSite === 'wassa' ? 'bg-primary text-background' : 'text-text-secondary'
                  }`}
                >
                  Wassa
                </button>
                <button
                  onClick={() => setActiveSite('wanevent')}
                  className={`px-4 py-2 rounded ${
                    activeSite === 'wanevent' ? 'bg-primary text-background' : 'text-text-secondary'
                  }`}
                >
                  Wan'Event
                </button>
              </div>
              <button onClick={() => navigate('/')} className="btn btn-outline mr-2">
                Retour au site
              </button>
              <button onClick={handleLogout} className="btn btn-outline">
                <LogOut size={16} className="mr-2" />
                Déconnexion
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
          <div className="w-64 bg-surface border-r border-gray-700 p-4">
            <nav className="space-y-2">
              {filteredTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? 'bg-primary text-background'
                      : 'text-text-secondary hover:bg-background'
                  }`}
                >
                  <tab.icon size={20} />
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Main content */}
          <div className="flex-1 p-6 overflow-y-auto">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;