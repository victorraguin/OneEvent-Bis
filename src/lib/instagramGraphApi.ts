// Instagram Graph API - Solution mise à jour pour 2025
export interface InstagramMedia {
  id: string;
  media_type: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  media_url: string;
  thumbnail_url?: string;
  caption?: string;
  permalink: string;
  timestamp: string;
  like_count?: number;
  comments_count?: number;
}

export interface InstagramConfig {
  accessToken: string;
  instagramBusinessAccountId: string;
}

class InstagramGraphService {
  private baseUrl = "https://graph.facebook.com/v18.0";

  /**
   * Récupère les médias d'un compte Instagram Business/Creator
   * @param config Configuration avec token d'accès et ID du compte business
   * @param limit Nombre de médias à récupérer (max 25)
   */
  async getUserMedia(
    config: InstagramConfig,
    limit: number = 12
  ): Promise<InstagramMedia[]> {
    try {
      const fields =
        "id,media_type,media_url,thumbnail_url,caption,permalink,timestamp,like_count,comments_count";
      const url = `${this.baseUrl}/${config.instagramBusinessAccountId}/media?fields=${fields}&limit=${limit}&access_token=${config.accessToken}`;

      const response = await fetch(url);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          `Instagram Graph API Error: ${response.status} - ${
            errorData.error?.message || response.statusText
          }`
        );
      }

      const data = await response.json();
      return data.data || [];
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des médias Instagram:",
        error
      );
      throw error;
    }
  }

  /**
   * Récupère les informations du compte Instagram Business
   */
  async getAccountInfo(config: InstagramConfig): Promise<any> {
    try {
      const fields =
        "id,username,name,profile_picture_url,followers_count,media_count";
      const url = `${this.baseUrl}/${config.instagramBusinessAccountId}?fields=${fields}&access_token=${config.accessToken}`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Instagram API Error: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Erreur récupération info compte:", error);
      throw error;
    }
  }

  /**
   * Valide un token d'accès et récupère les comptes Instagram Business liés
   */
  async validateTokenAndGetAccounts(accessToken: string): Promise<any[]> {
    try {
      // D'abord, récupérer les pages Facebook de l'utilisateur
      const pagesUrl = `${this.baseUrl}/me/accounts?fields=id,name,instagram_business_account&access_token=${accessToken}`;
      const pagesResponse = await fetch(pagesUrl);

      if (!pagesResponse.ok) {
        throw new Error("Token invalide ou permissions insuffisantes");
      }

      const pagesData = await pagesResponse.json();

      // Filtrer les pages qui ont un compte Instagram Business connecté
      const instagramAccounts =
        pagesData.data?.filter(
          (page: any) => page.instagram_business_account
        ) || [];

      return instagramAccounts.map((page: any) => ({
        pageId: page.id,
        pageName: page.name,
        instagramBusinessAccountId: page.instagram_business_account.id,
      }));
    } catch (error) {
      console.error("Erreur validation token:", error);
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
      "instagram_basic",
      "instagram_content_publish",
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
      console.error("Erreur échange token:", error);
      throw error;
    }
  }
}

export const instagramGraphService = new InstagramGraphService();
