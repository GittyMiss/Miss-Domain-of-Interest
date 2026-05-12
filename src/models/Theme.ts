import { Model } from '@nozbe/watermelondb';
import { field, date, readonly } from '@nozbe/watermelondb/decorators';

export class Theme extends Model {
  static table = 'themes';

  @field('name') name!: string;
  @field('color') color?: string;
  @field('description') description?: string;

  @readonly @date('created_at') createdAt!: Date;
  @readonly @date('updated_at') updatedAt!: Date;
}
