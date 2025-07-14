import React, { useState } from 'react';
import { Save, X } from 'lucide-react';
import { Event } from '../../../lib/supabase';

interface EventFormProps {
  event?: Event;
  activeSite: 'wassa' | 'wanevent';
  onSave: (data: any, table: string, isEdit: boolean) => Promise<void>;
  onCancel: () => void;
}

const EventForm: React.FC<EventFormProps> = ({ event, activeSite, onSave, onCancel }) => {
  const [formData, setFormData] = useState(event || {
    site: activeSite,
    title: '',
    date: '',
    time: '',
    location: '',
    description: '',
    image_url: ''
  });

  const handleSubmit = async () => {
    if (!formData.title || !formData.date || !formData.location) {
      alert('Veuillez remplir tous les champs obligatoires');
      return;
    }
    await onSave(formData, 'events', !!event);
  };

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
        <button onClick={handleSubmit} className="btn btn-primary">
          <Save size={16} className="mr-2" />
          Sauvegarder
        </button>
        <button onClick={onCancel} className="btn btn-outline">
          <X size={16} className="mr-2" />
          Annuler
        </button>
      </div>
    </div>
  );
};

export default EventForm;