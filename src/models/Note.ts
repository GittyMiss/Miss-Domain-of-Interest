import { Model } from '@nozbe/watermelondb';
import { field, relation, date, readonly } from '@nozbe/watermelondb/decorators';

export class Note extends Model {
  static table = 'notes';
  static associations = {
    themes: { type: 'belongs_to', key: 'theme_id' },
  };

  @field('title') title!: string;
  @field('content') content!: string;
  @field('type') type!: 'learning' | 'essay' | 'reflection';
  @field('theme_id') themeId!: string;
  @field('is_favorite') isFavorite!: boolean;

  // JSON stringified arrays
  @field('linked_note_ids') linkedNoteIds?: string;
  @field('source_ids') sourceIds?: string;

  @readonly @date('created_at') createdAt!: Date;
  @readonly @date('updated_at') updatedAt!: Date;

  // Relationships
  @relation('themes', 'theme_id') theme!: any;

  getLinkedNoteIds(): string[] {
    return this.linkedNoteIds ? JSON.parse(this.linkedNoteIds) : [];
  }

  getSourceIds(): string[] {
    return this.sourceIds ? JSON.parse(this.sourceIds) : [];
  }
}
