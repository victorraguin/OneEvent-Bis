import React, { useState } from 'react';
import { Save, X } from 'lucide-react';
import { GalleryItem } from '../../../lib/supabase';

interface GalleryFormProps {
  item?: GalleryItem;
  activeSite: 'wassa' | 'wanevent';
  onSave: (data: any, table: string, isEdit: boolean) => Promise<void>;
  onCancel: () => void;
}

const GalleryForm: React.FC<GalleryFormProps> = ({ item, activeSite, onSave, onCancel }) => {
  const [formData, setFormData] = useState(item || {
    site: activeSite,
    type: 'image',
    src: '',
    thumbnail: '',
    caption: '',
    order_index: 0
  });

  const handleSubmit = async () => {
    if (!formData.src || !formData.caption) {
      alert('Veuillez remplir tous les champs obligatoires');
      return;
    }
    await onSave(formData, 'gallery', !!item);
  };

  return (
    <div className="bg-surface p-6 rounded-lg mb-6">
      <h3 className="text-xl font-semibold mb-4">
        {item ? 'Modifier l\'élément' : 'Nouvel élément de galerie'}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <select
          value={formData.type}
          onChange={(e) => setFormData({...formData, type: e.target.value as 'image' | 'video'})}
          className="bg-background border border-gray-600 rounded px-3 py-2 text-text-primary"
        >
          <option value="image">Image</option>
          <option value="video">Vidéo</option>
        </select>
        <input
          type="number"
          placeholder="Ordre"
          value={formData.order_index}
          onChange={(e) => setFormData({...formData, order_index: parseInt(e.target.value)})}
          className="bg-background border border-gray-600 rounded px-3 py-2 text-text-primary"
        />
        <input
          type="url"
          placeholder="URL source"
          value={formData.src}
          onChange={(e) => setFormData({...formData, src: e.target.value})}
          className="bg-background border border-gray-600 rounded px-3 py-2 text-text-primary"
          required
        />
        <input
          type="url"
          placeholder="URL miniature (pour vidéos)"
          value={formData.thumbnail || ''}
          onChange={(e) => setFormData({...formData, thumbnail: e.target.value})}
          className="bg-background border border-gray-600 rounded px-3 py-2 text-text-primary"
        />
        <input
          type="text"
          placeholder="Légende"
          value={formData.caption}
          onChange={(e) => setFormData({...formData, caption: e.target.value})}
          className="bg-background border border-gray-600 rounded px-3 py-2 md:col-span-2 text-text-primary"
          required
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

export default GalleryForm;