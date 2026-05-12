// ============================================
// NOTES & CONTENT TYPES
// ============================================

export interface Theme {
  id: string;
  name: string; // "Articuler sa pensée", "Créativité", etc.
  color?: string; // hex color
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Tag {
  id: string;
  name: string;
  color?: string;
}

export interface Note {
  id: string;
  title: string;
  content: string; // Markdown format
  type: 'learning' | 'essay' | 'reflection'; // Types de notes
  themeId: string; // Thème principal
  tags: Tag[]; // Tags additionnels pour flexibilité
  linkedNoteIds: string[]; // IDs des notes liées
  sourceIds: string[]; // References à des sources (PDFs, etc.)
  createdAt: Date;
  updatedAt: Date;
  isFavorite: boolean;
}

// ============================================
// SOURCES & ANNOTATIONS
// ============================================

export interface Source {
  id: string;
  type: 'pdf' | 'image' | 'article' | 'book' | 'other';
  title: string;
  filePath?: string; // Chemin local du fichier
  url?: string; // URL si c'est en ligne
  author?: string;
  publishDate?: string;
  createdAt: Date;
  addedAt: Date;
}

export interface Annotation {
  id: string;
  sourceId: string;
  pageNumber?: number;
  text: string; // Le texte annoté
  note?: string; // Notes personnelles sur cette annotation
  highlight?: string; // Color du highlight
  createdAt: Date;
  updatedAt: Date;
}

// ============================================
// SPACED REPETITION & LEARNING
// ============================================

export interface ReviewCard {
  id: string;
  noteId: string;
  question: string; // Question ou rappel
  answerType: 'open' | 'quiz'; // Type de réponse attendue
  correctAnswers?: string[]; // Pour les quiz
  explanation?: string; // Explication après la réponse
}

export interface ReviewSession {
  id: string;
  cardId: string;
  responseQuality: 0 | 1 | 2 | 3 | 4 | 5; // SM-2: 0-5 (0=fail, 5=perfect)
  response?: string; // Réponse donnée par l'utilisateur
  isCorrect?: boolean;
  reviewedAt: Date;
}

export interface CardProgress {
  id: string;
  cardId: string;
  interval: number; // Jours jusqu'à la prochaine révision
  easeFactor: number; // SM-2: 1.3 - 2.5
  repetitions: number; // Nombre de fois révisé
  nextReviewDate: Date;
  lastReviewDate: Date;
  dueDate: Date; // Quand la carte est due pour révision
}

// ============================================
// EXPORT & BACKUP
// ============================================

export interface ExportOptions {
  format: 'json' | 'pdf' | 'csv' | 'markdown';
  filterByTheme?: string;
  filterByType?: 'learning' | 'essay' | 'reflection';
  includeLinkedNotes?: boolean;
  includeSources?: boolean;
}

export interface BackupData {
  version: string;
  exportedAt: Date;
  notes: Note[];
  themes: Theme[];
  tags: Tag[];
  sources: Source[];
  annotations: Annotation[];
  reviewCards: ReviewCard[];
  reviewSessions: ReviewSession[];
  cardProgress: CardProgress[];
}

// ============================================
// UI & COMPONENT TYPES
// ============================================

export interface ScreenProps {
  navigation: any;
  route: any;
}

export interface NavigationParams {
  noteId?: string;
  themeId?: string;
  sourceId?: string;
}
