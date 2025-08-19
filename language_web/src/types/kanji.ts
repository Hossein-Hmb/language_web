export interface KanjiExample {
  word: string;
  reading: string;
  meaning: string;
}

export interface Kanji {
  id: string;
  character: string;
  onyomi: string[];
  kunyomi: string[];
  meaning: string;
  level: 'N5' | 'N4' | 'N3' | 'N2' | 'N1';
  strokeCount: number;
  frequency: number;
  difficulty: number;
  radicals: string[];
  tags: string[];
  examples: KanjiExample[];
  mnemonics: string;
  usageNotes: string;
  relatedKanji: string[];
  audioUrl: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface KanjiSearchFilters {
  level?: string;
  tags?: string[];
  difficulty?: number;
  strokeCount?: number;
  frequency?: number;
}

export interface KanjiLearningProgress {
  kanjiId: string;
  userId: string;
  masteryLevel: 'new' | 'learning' | 'review' | 'mastered';
  correctAnswers: number;
  totalAttempts: number;
  lastReviewed: string;
  nextReview: string;
  createdAt: string;
  updatedAt: string;
}

export type KanjiLevel = 'N5' | 'N4' | 'N3' | 'N2' | 'N1';
export type MasteryLevel = 'new' | 'learning' | 'review' | 'mastered';