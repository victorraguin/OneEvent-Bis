import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, User, Eye, EyeOff } from 'lucide-react';
import { supabase } from '../../lib/supabase';

const AdminLogin: React.FC = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Vérifier si Supabase est configuré
    if (!supabase) {
      setError('Supabase n\'est pas configuré. Veuillez cliquer sur "Connect to Supabase" en haut à droite pour configurer votre projet.');
      setIsLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: credentials.email,
        password: credentials.password,
      });

      if (error) {
        throw error;
      }

      if (data.user) {
        navigate('/admin/dashboard');
      }
    } catch (error: any) {
      setError(error.message || 'Erreur de connexion');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="bg-surface rounded-lg w-full max-w-md p-8 shadow-2xl">
        <button
          onClick={() => navigate('/')}
          className="mb-6 text-text-secondary hover:text-primary transition-colors"
        >
          ← Retour au site
        </button>
        
        <div className="text-center mb-8">
          <Lock className="mx-auto text-primary mb-4" size={48} />
          <h1 className="text-2xl font-bold">Administration</h1>
          <p className="text-text-secondary">Connectez-vous pour accéder au dashboard</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-text-secondary mb-2">Email</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" size={20} />
              <input
                type="email"
                value={credentials.email}
                onChange={(e) => setCredentials({...credentials, email: e.target.value})}
                className="w-full bg-background border border-gray-600 rounded-lg pl-10 pr-4 py-3 text-text-primary focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="admin@example.com"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-text-secondary mb-2">Mot de passe</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" size={20} />
              <input
                type={showPassword ? 'text' : 'password'}
                value={credentials.password}
                onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                className="w-full bg-background border border-gray-600 rounded-lg pl-10 pr-12 py-3 text-text-primary focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-secondary hover:text-primary"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {error && (
            <div className="bg-error/20 border border-error text-error px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 btn btn-primary"
            >
              {isLoading ? 'Connexion...' : 'Se connecter'}
            </button>
          </div>
        </form>

        <div className="mt-6 text-center text-sm text-text-secondary">
          <p>Connectez-vous avec votre compte administrateur</p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;