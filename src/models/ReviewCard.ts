import { Model } from '@nozbe/watermelondb';
import { field, date, readonly } from '@nozbe/watermelondb/decorators';

export class ReviewCard extends Model {
  static table = 'review_cards';

  @field('note_id') noteId!: string;
  @field('question') question!: string;
  @field('answer_type') answerType!: 'open' | 'quiz';
  @field('correct_answers') correctAnswers?: string; // JSON stringified
  @field('explanation') explanation?: string;

  @readonly @date('created_at') createdAt!: Date;

  getCorrectAnswers(): string[] {
    return this.correctAnswers ? JSON.parse(this.correctAnswers) : [];
  }
}
