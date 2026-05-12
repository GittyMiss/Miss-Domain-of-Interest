import { appSchema, tableSchema } from '@nozbe/watermelondb';

export const schema = appSchema({
  version: 1,
  tables: [
    // ============================================
    // THEMES
    // ============================================
    tableSchema({
      name: 'themes',
      columns: [
        { name: 'name', type: 'string', isIndexed: true },
        { name: 'color', type: 'string', isOptional: true },
        { name: 'description', type: 'string', isOptional: true },
        { name: 'created_at', type: 'number' },
        { name: 'updated_at', type: 'number' },
      ],
    }),

    // ============================================
    // TAGS
    // ============================================
    tableSchema({
      name: 'tags',
      columns: [
        { name: 'name', type: 'string', isIndexed: true },
        { name: 'color', type: 'string', isOptional: true },
        { name: 'created_at', type: 'number' },
      ],
    }),

    // ============================================
    // NOTES
    // ============================================
    tableSchema({
      name: 'notes',
      columns: [
        { name: 'title', type: 'string', isIndexed: true },
        { name: 'content', type: 'string' },
        { name: 'type', type: 'string' }, // 'learning' | 'essay' | 'reflection'
        { name: 'theme_id', type: 'string', isIndexed: true },
        { name: 'is_favorite', type: 'boolean', isIndexed: true },
        { name: 'created_at', type: 'number', isIndexed: true },
        { name: 'updated_at', type: 'number' },
        { name: 'linked_note_ids', type: 'string', isOptional: true }, // JSON stringified
        { name: 'source_ids', type: 'string', isOptional: true }, // JSON stringified
      ],
    }),

    // ============================================
    // NOTE-TAG JUNCTION TABLE
    // ============================================
    tableSchema({
      name: 'note_tags',
      columns: [
        { name: 'note_id', type: 'string', isIndexed: true },
        { name: 'tag_id', type: 'string', isIndexed: true },
      ],
    }),

    // ============================================
    // SOURCES (PDFs, images, articles, etc.)
    // ============================================
    tableSchema({
      name: 'sources',
      columns: [
        { name: 'type', type: 'string' }, // 'pdf' | 'image' | 'article' | 'book' | 'other'
        { name: 'title', type: 'string', isIndexed: true },
        { name: 'file_path', type: 'string', isOptional: true },
        { name: 'url', type: 'string', isOptional: true },
        { name: 'author', type: 'string', isOptional: true },
        { name: 'publish_date', type: 'string', isOptional: true },
        { name: 'created_at', type: 'number' },
        { name: 'added_at', type: 'number' },
      ],
    }),

    // ============================================
    // ANNOTATIONS (sur sources/PDFs)
    // ============================================
    tableSchema({
      name: 'annotations',
      columns: [
        { name: 'source_id', type: 'string', isIndexed: true },
        { name: 'page_number', type: 'number', isOptional: true },
        { name: 'text', type: 'string' }, // Texte annoté
        { name: 'note', type: 'string', isOptional: true },
        { name: 'highlight', type: 'string', isOptional: true },
        { name: 'created_at', type: 'number' },
        { name: 'updated_at', type: 'number' },
      ],
    }),

    // ============================================
    // REVIEW CARDS (Questions/Quiz pour réviser)
    // ============================================
    tableSchema({
      name: 'review_cards',
      columns: [
        { name: 'note_id', type: 'string', isIndexed: true },
        { name: 'question', type: 'string' },
        { name: 'answer_type', type: 'string' }, // 'open' | 'quiz'
        { name: 'correct_answers', type: 'string', isOptional: true }, // JSON stringified
        { name: 'explanation', type: 'string', isOptional: true },
        { name: 'created_at', type: 'number' },
      ],
    }),

    // ============================================
    // REVIEW SESSIONS (Historique des révisions)
    // ============================================
    tableSchema({
      name: 'review_sessions',
      columns: [
        { name: 'card_id', type: 'string', isIndexed: true },
        { name: 'response_quality', type: 'number' }, // 0-5 SM-2
        { name: 'response', type: 'string', isOptional: true },
        { name: 'is_correct', type: 'boolean', isOptional: true },
        { name: 'reviewed_at', type: 'number' },
      ],
    }),

    // ============================================
    // CARD PROGRESS (SM-2 tracking)
    // ============================================
    tableSchema({
      name: 'card_progress',
      columns: [
        { name: 'card_id', type: 'string', isIndexed: true },
        { name: 'interval', type: 'number' }, // Jours
        { name: 'ease_factor', type: 'number' }, // SM-2
        { name: 'repetitions', type: 'number' },
        { name: 'next_review_date', type: 'number' },
        { name: 'last_review_date', type: 'number' },
        { name: 'due_date', type: 'number', isIndexed: true },
        { name: 'updated_at', type: 'number' },
      ],
    }),
  ],
});
