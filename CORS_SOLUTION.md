# Solutions pour les problèmes CORS avec Supabase

## Problème identifié

Votre application rencontre des erreurs CORS lors de l'authentification Supabase. Ce n'est pas un problème d'Edge Functions mais de configuration Supabase.

## Solution 1 : Configuration Supabase Authentication (Recommandée)

### Étape 1 : Accéder aux paramètres Supabase

1. Connectez-vous à votre dashboard Supabase
2. Sélectionnez votre projet
3. Allez dans **Authentication** > **URL Configuration**

### Étape 2 : Configurer les URLs autorisées

Ajoutez ces URLs dans la section **Site URL** :

```
http://localhost:5173
http://localhost:3000
http://localhost:4173
https://votre-domaine.com (pour la production)
```

### Étape 3 : Configurer les Redirect URLs

Dans **Redirect URLs**, ajoutez :

```
http://localhost:5173/**
http://localhost:3000/**
http://localhost:4173/**
https://votre-domaine.com/** (pour la production)
```

## Solution 2 : Vérification des variables d'environnement

Assurez-vous que votre fichier `.env` contient :

```env
VITE_SUPABASE_URL=https://votre-projet.supabase.co
VITE_SUPABASE_ANON_KEY=votre-clé-anon
```

## Solution 3 : Configuration CORS côté serveur (si nécessaire)

Si vous avez besoin d'Edge Functions plus tard, créez un dossier `supabase/functions/_shared/` avec :

```typescript
// supabase/functions/_shared/cors.ts
export const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};
```

## Test de la solution

1. Redémarrez votre serveur de développement
2. Essayez de vous connecter via l'interface admin
3. Vérifiez les logs de la console pour confirmer l'absence d'erreurs CORS

## Notes importantes

- Les Edge Functions ne sont nécessaires que si vous créez des fonctions personnalisées
- Pour l'authentification et les requêtes de base de données, la configuration Supabase suffit
- Assurez-vous que votre URL de développement correspond exactement à celle configurée dans Supabase
