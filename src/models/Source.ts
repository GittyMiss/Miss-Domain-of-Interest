import { Model } from '@nozbe/watermelondb';
import { field, date, readonly } from '@nozbe/watermelondb/decorators';

export class Source extends Model {
  static table = 'sources';

  @field('type') type!: 'pdf' | 'image' | 'article' | 'book' | 'other';
  @field('title') title!: string;
  @field('file_path') filePath?: string;
  @field('url') url?: string;
  @field('author') author?: string;
  @field('publish_date') publishDate?: string;

  @readonly @date('created_at') createdAt!: Date;
  @readonly @date('added_at') addedAt!: Date;
}
