import React, { useState } from 'react';
import { Save, X } from 'lucide-react';
import { Service } from '../../../lib/supabase';

interface ServicesFormProps {
  service?: Service;
  onSave: (data: any, table: string, isEdit: boolean) => Promise<void>;
  onCancel: () => void;
}

const ServicesForm: React.FC<ServicesFormProps> = ({ service, onSave, onCancel }) => {
  const [formData, setFormData] = useState(service || {
    title: '',
    description: '',
    icon: '',
    order_index: 0
  });

  const handleSubmit = async () => {
    if (!formData.title || !formData.description || !formData.icon) {
      alert('Veuillez remplir tous les champs obligatoires');
      return;
    }
    await onSave(formData, 'services', !!service);
  };

  return (
    <div className="bg-surface p-6 rounded-lg mb-6">
      <h3 className="text-xl font-semibold mb-4">
        {service ? 'Modifier le service' : 'Nouveau service'}
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
          placeholder="Icône (nom Lucide)"
          value={formData.icon}
          onChange={(e) => setFormData({...formData, icon: e.target.value})}
          className="bg-background border border-gray-600 rounded px-3 py-2 text-text-primary"
          required
        />
        <input
          type="number"
          placeholder="Ordre"
          value={formData.order_index}
          onChange={(e) => setFormData({...formData, order_index: parseInt(e.target.value)})}
          className="bg-background border border-gray-600 rounded px-3 py-2 text-text-primary"
        />
        <textarea
          placeholder="Description"
          value={formData.description}
          onChange={(e) => setFormData({...formData, description: e.target.value})}
          className="bg-background border border-gray-600 rounded px-3 py-2 md:col-span-2 text-text-primary"
          rows={3}
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

export default ServicesForm;