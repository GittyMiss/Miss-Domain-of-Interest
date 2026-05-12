import { Model } from '@nozbe/watermelondb';
import { field, date, readonly } from '@nozbe/watermelondb/decorators';

export class Annotation extends Model {
  static table = 'annotations';

  @field('source_id') sourceId!: string;
  @field('page_number') pageNumber?: number;
  @field('text') text!: string;
  @field('note') note?: string;
  @field('highlight') highlight?: string;

  @readonly @date('created_at') createdAt!: Date;
  @readonly @date('updated_at') updatedAt!: Date;
}
