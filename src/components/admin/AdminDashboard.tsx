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
  Save,
  X,
  Eye,
  EyeOff
} from 'lucide-react';
import { supabase, Event, GalleryItem, MusicTrack, EnsembleMember, Service, Partner } from '../../lib/supabase';

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
    // Vérifier si l'utilisateur est connecté
    const checkAuth = async () => {
      if (!supabase) {
        navigate('/admin');
        return;
      }
      
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate('/admin');
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

  const renderEventForm = (event?: Event) => {
    const [formData, setFormData] = useState(event || {
      site: activeSite,
      title: '',
      date: '',
      time: '',
      location: '',
      description: '',
      image_url: ''
    });

    return (
      <div className="bg-surface p-6 rounded-lg mb-6">
        <h3 className="text-xl font-semibold mb-4">
          {event ? 'Modifier l\'événement' : 'Nouvel événement'}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Titre"
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            className="bg-background border border-gray-600 rounded px-3 py-2 text-text-primary"
            required
          />
          <input
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({...formData, date: e.target.value})}
            className="bg-background border border-gray-600 rounded px-3 py-2 text-text-primary"
            required
          />
          <input
            type="time"
            value={formData.time || ''}
            onChange={(e) => setFormData({...formData, time: e.target.value})}
            className="bg-background border border-gray-600 rounded px-3 py-2 text-text-primary"
          />
          <input
            type="text"
            placeholder="Lieu"
            value={formData.location}
            onChange={(e) => setFormData({...formData, location: e.target.value})}
            className="bg-background border border-gray-600 rounded px-3 py-2 text-text-primary"
            required
          />
          <input
            type="url"
            placeholder="URL de l'image"
            value={formData.image_url || ''}
            onChange={(e) => setFormData({...formData, image_url: e.target.value})}
            className="bg-background border border-gray-600 rounded px-3 py-2 text-text-primary"
          />
          <textarea
            placeholder="Description"
            value={formData.description || ''}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            className="bg-background border border-gray-600 rounded px-3 py-2 md:col-span-2 text-text-primary"
            rows={3}
          />
        </div>
        <div className="flex gap-2 mt-4">
          <button
            onClick={async () => {
              if (!formData.title || !formData.date || !formData.location) {
                alert('Veuillez remplir tous les champs obligatoires');
                return;
              }
              await handleSave(formData, 'events', !!event);
            }}
            className="btn btn-primary"
          >
            <Save size={16} className="mr-2" />
            Sauvegarder
          </button>
          <button
            onClick={() => {
              setEditingItem(null);
              setShowAddForm(false);
            }}
            className="btn btn-outline"
          >
            <X size={16} className="mr-2" />
            Annuler
          </button>
        </div>
      </div>
    );
  };

  const renderEventsTab = () => (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Gestion des Événements - {activeSite === 'wassa' ? 'Wassa Percussion' : "Wan'Event"}</h2>
        <button
          onClick={() => setShowAddForm(true)}
          className="btn btn-primary"
        >
          <Plus size={16} className="mr-2" />
          Nouvel événement
        </button>
      </div>

      {showAddForm && renderEventForm()}
      {editingItem && renderEventForm(editingItem)}

      <div className="space-y-4">
        {events.map((event) => (
          <div key={event.id} className="bg-surface p-4 rounded-lg">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold">{event.title}</h3>
                <p className="text-text-secondary">{event.date} {event.time && `- ${event.time}`}</p>
                <p className="text-text-secondary">{event.location}</p>
                {event.description && (
                  <p className="text-text-secondary mt-2">{event.description}</p>
                )}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setEditingItem(event)}
                  className="text-primary hover:text-primary/80"
                >
                  <Edit size={16} />
                </button>
                <button
                  onClick={() => handleDelete(event.id, 'events')}
                  className="text-error hover:text-error/80"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const tabs = [
    { id: 'events', label: 'Événements', icon: Calendar },
    { id: 'gallery', label: 'Galerie', icon: Image },
    { id: 'music', label: 'Musique', icon: Music, wassaOnly: true },
    { id: 'ensemble', label: 'Ensemble', icon: Users, wassaOnly: true },
    { id: 'services', label: 'Services', icon: Settings, waneventOnly: true },
    { id: 'partners', label: 'Partenaires', icon: Users, waneventOnly: true },
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
              <button
                onClick={() => navigate('/')}
                className="btn btn-outline mr-2"
              >
                Retour au site
              </button>
              <button
                onClick={handleLogout}
                className="btn btn-outline"
              >
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
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <div className="text-text-secondary">Chargement...</div>
              </div>
            ) : (
              <>
                {activeTab === 'events' && renderEventsTab()}
                {/* Autres onglets à implémenter selon les besoins */}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;