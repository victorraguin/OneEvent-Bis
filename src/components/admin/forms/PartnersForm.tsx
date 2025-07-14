import React, { useState } from 'react';
import { Save, X } from 'lucide-react';
import { Partner } from '../../../lib/supabase';

interface PartnersFormProps {
  partner?: Partner;
  onSave: (data: any, table: string, isEdit: boolean) => Promise<void>;
  onCancel: () => void;
}

const PartnersForm: React.FC<PartnersFormProps> = ({ partner, onSave, onCancel }) => {
  const [formData, setFormData] = useState(partner || {
    name: '',
    logo_url: '',
    website_url: '',
    order_index: 0
  });

  const handleSubmit = async () => {
    if (!formData.name || !formData.logo_url) {
      alert('Veuillez remplir tous les champs obligatoires');
      return;
    }
    await onSave(formData, 'partners', !!partner);
  };

  return (
    <div className="bg-surface p-6 rounded-lg mb-6">
      <h3 className="text-xl font-semibold mb-4">
        {partner ? 'Modifier le partenaire' : 'Nouveau partenaire'}
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
          type="url"
          placeholder="URL du logo"
          value={formData.logo_url}
          onChange={(e) => setFormData({...formData, logo_url: e.target.value})}
          className="bg-background border border-gray-600 rounded px-3 py-2 text-text-primary"
          required
        />
        <input
          type="url"
          placeholder="URL du site web"
          value={formData.website_url || ''}
          onChange={(e) => setFormData({...formData, website_url: e.target.value})}
          className="bg-background border border-gray-600 rounded px-3 py-2 text-text-primary"
        />
        <input
          type="number"
          placeholder="Ordre"
          value={formData.order_index}
          onChange={(e) => setFormData({...formData, order_index: parseInt(e.target.value)})}
          className="bg-background border border-gray-600 rounded px-3 py-2 text-text-primary"
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

export default PartnersForm;