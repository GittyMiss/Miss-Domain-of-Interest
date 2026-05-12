import { Model } from '@nozbe/watermelondb';
import { field, date, readonly } from '@nozbe/watermelondb/decorators';

export class ReviewSession extends Model {
  static table = 'review_sessions';

  @field('card_id') cardId!: string;
  @field('response_quality') responseQuality!: 0 | 1 | 2 | 3 | 4 | 5;
  @field('response') response?: string;
  @field('is_correct') isCorrect?: boolean;

  @readonly @date('reviewed_at') reviewedAt!: Date;
}
