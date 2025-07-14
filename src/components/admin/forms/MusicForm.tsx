import React, { useState } from 'react';
import { Save, X } from 'lucide-react';
import { MusicTrack } from '../../../lib/supabase';

interface MusicFormProps {
  track?: MusicTrack;
  onSave: (data: any, table: string, isEdit: boolean) => Promise<void>;
  onCancel: () => void;
}

const MusicForm: React.FC<MusicFormProps> = ({ track, onSave, onCancel }) => {
  const [formData, setFormData] = useState(track || {
    title: '',
    artist: '',
    src: '',
    image: '',
    order_index: 0
  });

  const handleSubmit = async () => {
    if (!formData.title || !formData.artist || !formData.src) {
      alert('Veuillez remplir tous les champs obligatoires');
      return;
    }
    await onSave(formData, 'music', !!track);
  };

  return (
    <div className="bg-surface p-6 rounded-lg mb-6">
      <h3 className="text-xl font-semibold mb-4">
        {track ? 'Modifier la piste' : 'Nouvelle piste musicale'}
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
          type="text"
          placeholder="Artiste"
          value={formData.artist}
          onChange={(e) => setFormData({...formData, artist: e.target.value})}
          className="bg-background border border-gray-600 rounded px-3 py-2 text-text-primary"
          required
        />
        <input
          type="url"
          placeholder="URL audio"
          value={formData.src}
          onChange={(e) => setFormData({...formData, src: e.target.value})}
          className="bg-background border border-gray-600 rounded px-3 py-2 text-text-primary"
          required
        />
        <input
          type="url"
          placeholder="URL image"
          value={formData.image || ''}
          onChange={(e) => setFormData({...formData, image: e.target.value})}
          className="bg-background border border-gray-600 rounded px-3 py-2 text-text-primary"
        />
        <input
          type="number"
          placeholder="Ordre"
          value={formData.order_index}
          onChange={(e) => setFormData({...formData, order_index: parseInt(e.target.value)})}
          className="bg-background border border-gray-600 rounded px-3 py-2 md:col-span-2 text-text-primary"
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

export default MusicForm;