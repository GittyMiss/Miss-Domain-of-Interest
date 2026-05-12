import { Database } from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';
import { schema } from './schema';
import { Theme } from '@/models/Theme';
import { Tag } from '@/models/Tag';
import { Note } from '@/models/Note';
import { NoteTag } from '@/models/NoteTag';
import { Source } from '@/models/Source';
import { Annotation } from '@/models/Annotation';
import { ReviewCard } from '@/models/ReviewCard';
import { ReviewSession } from '@/models/ReviewSession';
import { CardProgress } from '@/models/CardProgress';

const adapter = new SQLiteAdapter({
  schema,
  dbName: 'missdomainofinterest',
  jsi: true,
  onSetUpError: (error) => {
    console.error('Database setup error:', error);
  },
});

export const database = new Database({
  adapter,
  modelClasses: [
    Theme,
    Tag,
    Note,
    NoteTag,
    Source,
    Annotation,
    ReviewCard,
    ReviewSession,
    CardProgress,
  ],
});

// ============================================
// INITIALIZATION & DEFAULT DATA
// ============================================

export async function initializeDatabase() {
  try {
    // Check if themes already exist
    const existingThemes = await database.get('themes').query().fetch();

    if (existingThemes.length === 0) {
      // Create default themes
      const defaultThemes = [
        { name: 'Articuler sa pensée', color: '#FF6B6B' },
        { name: 'Créativité', color: '#4ECDC4' },
        { name: 'Self actualisation business', color: '#45B7D1' },
        { name: 'Discipline', color: '#FFA502' },
        { name: 'Spiritualité', color: '#9B59B6' },
      ];

      await database.write(async () => {
        for (const theme of defaultThemes) {
          await database.get('themes').create((t) => {
            t.name = theme.name;
            t.color = theme.color;
            t.createdAt = new Date();
            t.updatedAt = new Date();
          });
        }
      });

      console.log('Default themes created');
    }
  } catch (error) {
    console.error('Error initializing database:', error);
  }
}
