import { database } from '@/db/database';
import { Theme } from '@/models/Theme';

export class ThemeService {
  static async getAllThemes(): Promise<Theme[]> {
    return await database.get('themes').query().fetch();
  }

  static async getThemeById(id: string): Promise<Theme | null> {
    try {
      return await database.get('themes').find(id);
    } catch {
      return null;
    }
  }

  static async createTheme(data: {
    name: string;
    color?: string;
    description?: string;
  }): Promise<Theme> {
    return await database.write(async () => {
      return await database.get('themes').create((t: any) => {
        t.name = data.name;
        t.color = data.color;
        t.description = data.description;
        t.createdAt = new Date();
        t.updatedAt = new Date();
      });
    });
  }

  static async updateTheme(
    id: string,
    data: Partial<{
      name: string;
      color: string;
      description: string;
    }>
  ): Promise<Theme> {
    return await database.write(async () => {
      const theme = await database.get('themes').find(id);

      await theme.update((t: any) => {
        if (data.name !== undefined) t.name = data.name;
        if (data.color !== undefined) t.color = data.color;
        if (data.description !== undefined) t.description = data.description;
        t.updatedAt = new Date();
      });

      return theme;
    });
  }

  static async deleteTheme(id: string): Promise<void> {
    return await database.write(async () => {
      const theme = await database.get('themes').find(id);
      await theme.destroyPermanently();
    });
  }
}
