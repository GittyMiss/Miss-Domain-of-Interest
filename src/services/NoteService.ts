import { database } from '@/db/database';
import { Note } from '@/models/Note';

export class NoteService {
  // ============================================
  // CREATE
  // ============================================

  static async createNote(data: {
    title: string;
    content: string;
    type: 'learning' | 'essay' | 'reflection';
    themeId: string;
  }): Promise<Note> {
    return await database.write(async () => {
      const note = await database.get('notes').create((n: any) => {
        n.title = data.title;
        n.content = data.content;
        n.type = data.type;
        n.themeId = data.themeId;
        n.isFavorite = false;
        n.createdAt = new Date();
        n.updatedAt = new Date();
      });
      return note;
    });
  }

  // ============================================
  // READ
  // ============================================

  static async getAllNotes(): Promise<Note[]> {
    return await database.get('notes').query().fetch();
  }

  static async getNoteById(id: string): Promise<Note | null> {
    try {
      return await database.get('notes').find(id);
    } catch (error) {
      console.error('Note not found:', id);
      return null;
    }
  }

  static async getNotesByTheme(themeId: string): Promise<Note[]> {
    return await database
      .get('notes')
      .query(require('@nozbe/watermelondb').Q.where('theme_id', themeId))
      .fetch();
  }

  static async getNotesByType(
    type: 'learning' | 'essay' | 'reflection'
  ): Promise<Note[]> {
    return await database
      .get('notes')
      .query(require('@nozbe/watermelondb').Q.where('type', type))
      .fetch();
  }

  static async getFavoriteNotes(): Promise<Note[]> {
    return await database
      .get('notes')
      .query(require('@nozbe/watermelondb').Q.where('is_favorite', true))
      .fetch();
  }

  static async searchNotes(query: string): Promise<Note[]> {
    const Q = require('@nozbe/watermelondb').Q;
    return await database
      .get('notes')
      .query(
        Q.or(
          Q.where('title', Q.like(`%${query}%`)),
          Q.where('content', Q.like(`%${query}%`))
        )
      )
      .fetch();
  }

  // ============================================
  // UPDATE
  // ============================================

  static async updateNote(
    id: string,
    data: Partial<{
      title: string;
      content: string;
      type: 'learning' | 'essay' | 'reflection';
      themeId: string;
      isFavorite: boolean;
    }>
  ): Promise<Note> {
    return await database.write(async () => {
      const note = await database.get('notes').find(id);

      await note.update((n: any) => {
        if (data.title !== undefined) n.title = data.title;
        if (data.content !== undefined) n.content = data.content;
        if (data.type !== undefined) n.type = data.type;
        if (data.themeId !== undefined) n.themeId = data.themeId;
        if (data.isFavorite !== undefined) n.isFavorite = data.isFavorite;
        n.updatedAt = new Date();
      });

      return note;
    });
  }

  static async toggleFavorite(id: string): Promise<Note> {
    const note = await this.getNoteById(id);
    if (!note) throw new Error('Note not found');

    return await this.updateNote(id, { isFavorite: !note.isFavorite });
  }

  // ============================================
  // DELETE
  // ============================================

  static async deleteNote(id: string): Promise<void> {
    return await database.write(async () => {
      const note = await database.get('notes').find(id);
      await note.destroyPermanently();
    });
  }

  // ============================================
  // LINKING NOTES
  // ============================================

  static async linkNotes(noteId: string, linkedNoteId: string): Promise<Note> {
    const note = await this.getNoteById(noteId);
    if (!note) throw new Error('Note not found');

    const currentLinks = note.getLinkedNoteIds();
    if (!currentLinks.includes(linkedNoteId)) {
      currentLinks.push(linkedNoteId);
    }

    return await database.write(async () => {
      await note.update((n: any) => {
        n.linkedNoteIds = JSON.stringify(currentLinks);
        n.updatedAt = new Date();
      });
      return note;
    });
  }

  static async unlinkNotes(noteId: string, linkedNoteId: string): Promise<Note> {
    const note = await this.getNoteById(noteId);
    if (!note) throw new Error('Note not found');

    const currentLinks = note.getLinkedNoteIds().filter((id) => id !== linkedNoteId);

    return await database.write(async () => {
      await note.update((n: any) => {
        n.linkedNoteIds = JSON.stringify(currentLinks);
        n.updatedAt = new Date();
      });
      return note;
    });
  }

  // ============================================
  // STATISTICS
  // ============================================

  static async getStats() {
    const allNotes = await this.getAllNotes();
    const learningNotes = allNotes.filter((n) => n.type === 'learning').length;
    const essayNotes = allNotes.filter((n) => n.type === 'essay').length;
    const reflectionNotes = allNotes.filter((n) => n.type === 'reflection').length;
    const favoriteNotes = allNotes.filter((n) => n.isFavorite).length;

    return {
      total: allNotes.length,
      learning: learningNotes,
      essay: essayNotes,
      reflection: reflectionNotes,
      favorites: favoriteNotes,
    };
  }
}
