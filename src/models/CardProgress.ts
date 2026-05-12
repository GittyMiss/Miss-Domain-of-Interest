import { Model } from '@nozbe/watermelondb';
import { field, date, readonly } from '@nozbe/watermelondb/decorators';

export class CardProgress extends Model {
  static table = 'card_progress';

  @field('card_id') cardId!: string;
  @field('interval') interval!: number; // Jours
  @field('ease_factor') easeFactor!: number; // SM-2 (1.3 - 2.5)
  @field('repetitions') repetitions!: number;
  @field('next_review_date') nextReviewDate!: Date;
  @field('last_review_date') lastReviewDate!: Date;
  @field('due_date') dueDate!: Date;

  @readonly @date('updated_at') updatedAt!: Date;
}
