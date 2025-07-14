import React, { useState } from 'react';
import { Save, X } from 'lucide-react';
import { EnsembleMember } from '../../../lib/supabase';

interface EnsembleFormProps {
  member?: EnsembleMember;
  onSave: (data: any, table: string, isEdit: boolean) => Promise<void>;
  onCancel: () => void;
}

const EnsembleForm: React.FC<EnsembleFormProps> = ({ member, onSave, onCancel }) => {
  const [formData, setFormData] = useState(member || {
    name: '',
    role: '',
    image_url: '',
    bio: '',
    order_index: 0
  });

  const handleSubmit = async () => {
    if (!formData.name || !formData.role) {
      alert('Veuillez remplir tous les champs obligatoires');
      return;
    }
    await onSave(formData, 'ensemble', !!member);
  };

  return (
    <div className="bg-surface p-6 rounded-lg mb-6">
      <h3 className="text-xl font-semibold mb-4">
        {member ? 'Modifier le membre' : 'Nouveau membre de l\'ensemble'}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Nom"
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
          className="bg-background border border-gray-600 rounded px-3 py-2 text-text-primary"
          required
        />
        <input
          type="text"
          placeholder="Rôle"
          value={formData.role}
          onChange={(e) => setFormData({...formData, role: e.target.value})}
          className="bg-background border border-gray-600 rounded px-3 py-2 text-text-primary"
          required
        />
        <input
          type="url"
          placeholder="URL image"
          value={formData.image_url || ''}
          onChange={(e) => setFormData({...formData, image_url: e.target.value})}
          className="bg-background border border-gray-600 rounded px-3 py-2 text-text-primary"
        />
        <input
          type="number"
          placeholder="Ordre"
          value={formData.order_index}
          onChange={(e) => setFormData({...formData, order_index: parseInt(e.target.value)})}
          className="bg-background border border-gray-600 rounded px-3 py-2 text-text-primary"
        />
        <textarea
          placeholder="Biographie"
          value={formData.bio || ''}
          onChange={(e) => setFormData({...formData, bio: e.target.value})}
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

export default EnsembleForm;