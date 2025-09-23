// Facebook Graph API pour les événements - Solution 2025
export interface FacebookEvent {
  id: string;
  name: string;
  description?: string;
  start_time: string;
  end_time?: string;
  place?: {
    name: string;
    location?: {
      city?: string;
      country?: string;
      latitude?: number;
      longitude?: number;
      street?: string;
      zip?: string;
    };
  };
  cover?: {
    source: string;
  };
  attending_count?: number;
  interested_count?: number;
  is_online?: boolean;
  online_event_format?: string;
  online_event_third_party_url?: string;
}

export interface FacebookConfig {
  accessToken: string;
  pageId: string;
}

class FacebookEventsService {
  private baseUrl = "https://graph.facebook.com/v18.0";

  /**
   * Récupère les événements d'une page Facebook
   * @param config Configuration avec token d'accès et ID de page
   * @param limit Nombre d'événements à récupérer
   */
  async getPageEvents(
    config: FacebookConfig,
    limit: number = 10
  ): Promise<FacebookEvent[]> {
    try {
      const fields = [
        "id",
        "name",
        "description",
        "start_time",
        "end_time",
        "place",
        "cover",
        "attending_count",
        "interested_count",
        "is_online",
        "online_event_format",
        "online_event_third_party_url",
      ].join(",");

      const url = `${this.baseUrl}/${config.pageId}/events?fields=${fields}&limit=${limit}&time_filter=upcoming&access_token=${config.accessToken}`;

      const response = await fetch(url);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          `Facebook API Error: ${response.status} - ${
            errorData.error?.message || response.statusText
          }`
        );
      }

      const data = await response.json();
      return data.data || [];
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des événements Facebook:",
        error
      );
      throw error;
    }
  }

  /**
   * Récupère les informations d'une page Facebook
   */
  async getPageInfo(config: FacebookConfig): Promise<any> {
    try {
      const fields = "id,name,about,category,cover,picture,fan_count";
      const url = `${this.baseUrl}/${config.pageId}?fields=${fields}&access_token=${config.accessToken}`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Facebook API Error: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Erreur récupération info page:", error);
      throw error;
    }
  }

  /**
   * Valide un token d'accès et récupère les pages gérées par l'utilisateur
   */
  async validateTokenAndGetPages(accessToken: string): Promise<any[]> {
    try {
      const url = `${this.baseUrl}/me/accounts?fields=id,name,access_token,category&access_token=${accessToken}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Token invalide ou permissions insuffisantes");
      }

      const data = await response.json();
      return data.data || [];
    } catch (error) {
      console.error("Erreur validation token Facebook:", error);
      throw error;
    }
  }

  /**
   * Génère l'URL d'autorisation Facebook pour obtenir un token
   */
  generateAuthUrl(appId: string, redirectUri: string): string {
    const scopes = [
      "pages_show_list",
      "pages_read_engagement",
      "pages_events",
    ].join(",");

    return `https://www.facebook.com/v18.0/dialog/oauth?client_id=${appId}&redirect_uri=${encodeURIComponent(
      redirectUri
    )}&scope=${scopes}&response_type=code`;
  }

  /**
   * Échange le code d'autorisation contre un token d'accès
   */
  async exchangeCodeForToken(
    code: string,
    appId: string,
    appSecret: string,
    redirectUri: string
  ): Promise<string> {
    try {
      const url = `${
        this.baseUrl
      }/oauth/access_token?client_id=${appId}&redirect_uri=${encodeURIComponent(
        redirectUri
      )}&client_secret=${appSecret}&code=${code}`;

      const response = await fetch(url, { method: "POST" });

      if (!response.ok) {
        throw new Error("Erreur échange code pour token");
      }

      const data = await response.json();
      return data.access_token;
    } catch (error) {
      console.error("Erreur échange token Facebook:", error);
      throw error;
    }
  }

  /**
   * Convertit un événement Facebook en format compatible avec votre base de données
   */
  convertToLocalEvent(fbEvent: FacebookEvent, site: "wassa" | "wanevent"): any {
    return {
      site,
      title: fbEvent.name,
      date: fbEvent.start_time.split("T")[0], // Extraire juste la date
      time: fbEvent.start_time.split("T")[1]?.substring(0, 5), // Extraire l'heure (HH:MM)
      location:
        fbEvent.place?.name ||
        (fbEvent.is_online ? "En ligne" : "Lieu à confirmer"),
      description: fbEvent.description || "",
      image_url: fbEvent.cover?.source,
      source: "facebook",
      external_id: fbEvent.id,
      facebook_url: `https://www.facebook.com/events/${fbEvent.id}`,
      attending_count: fbEvent.attending_count,
      interested_count: fbEvent.interested_count,
      is_online: fbEvent.is_online || false,
    };
  }
}

export const facebookEventsService = new FacebookEventsService();
