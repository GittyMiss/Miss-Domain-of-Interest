import { Model } from '@nozbe/watermelondb';
import { field } from '@nozbe/watermelondb/decorators';

export class NoteTag extends Model {
  static table = 'note_tags';

  @field('note_id') noteId!: string;
  @field('tag_id') tagId!: string;
}
