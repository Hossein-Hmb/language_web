import { Kanji, KanjiSearchFilters, KanjiLevel } from '@/types/kanji';

// Import kanji data
import n5KanjiData from '@/data/n5_kanji.json';
// You can add more levels later:
// import n4KanjiData from '@/data/n4_kanji.json';
// import n3KanjiData from '@/data/n3_kanji.json';
// import n2KanjiData from '@/data/n2_kanji.json';
// import n1KanjiData from '@/data/n1_kanji.json';

/**
 * Get all kanji data for a specific level
 */
export function getKanjiByLevel(level: KanjiLevel): Kanji[] {
  switch (level) {
    case 'N5':
      return n5KanjiData as Kanji[];
    // Add more cases as you create more data files
    default:
      return [];
  }
}

/**
 * Get all available kanji data
 */
export function getAllKanji(): Kanji[] {
  const allKanji: Kanji[] = [
    ...n5KanjiData as Kanji[],
    // Add more data sources as they become available
  ];
  return allKanji;
}

/**
 * Search kanji by character
 */
export function findKanjiByCharacter(character: string): Kanji | undefined {
  const allKanji = getAllKanji();
  return allKanji.find(kanji => kanji.character === character);
}

/**
 * Search kanji by ID
 */
export function findKanjiById(id: string): Kanji | undefined {
  const allKanji = getAllKanji();
  return allKanji.find(kanji => kanji.id === id);
}

/**
 * Filter kanji based on search criteria
 */
export function filterKanji(filters: KanjiSearchFilters): Kanji[] {
  let results = getAllKanji();

  if (filters.level) {
    results = results.filter(kanji => kanji.level === filters.level);
  }

  if (filters.tags && filters.tags.length > 0) {
    results = results.filter(kanji => 
      filters.tags!.some(tag => kanji.tags.includes(tag))
    );
  }

  if (filters.difficulty !== undefined) {
    results = results.filter(kanji => kanji.difficulty <= filters.difficulty!);
  }

  if (filters.strokeCount !== undefined) {
    results = results.filter(kanji => kanji.strokeCount === filters.strokeCount);
  }

  if (filters.frequency !== undefined) {
    results = results.filter(kanji => kanji.frequency <= filters.frequency!);
  }

  return results;
}

/**
 * Get kanji by tags
 */
export function getKanjiByTags(tags: string[]): Kanji[] {
  return filterKanji({ tags });
}

/**
 * Get all unique tags from kanji data
 */
export function getAllTags(): string[] {
  const allKanji = getAllKanji();
  const tagSet = new Set<string>();
  
  allKanji.forEach(kanji => {
    kanji.tags.forEach(tag => tagSet.add(tag));
  });

  return Array.from(tagSet).sort();
}

/**
 * Get kanji statistics
 */
export function getKanjiStats() {
  const allKanji = getAllKanji();
  
  const stats = {
    total: allKanji.length,
    byLevel: {} as Record<KanjiLevel, number>,
    byDifficulty: {} as Record<number, number>,
    averageStrokes: 0,
    totalTags: getAllTags().length
  };

  // Count by level
  allKanji.forEach(kanji => {
    stats.byLevel[kanji.level] = (stats.byLevel[kanji.level] || 0) + 1;
    stats.byDifficulty[kanji.difficulty] = (stats.byDifficulty[kanji.difficulty] || 0) + 1;
  });

  // Calculate average strokes
  const totalStrokes = allKanji.reduce((sum, kanji) => sum + kanji.strokeCount, 0);
  stats.averageStrokes = Math.round(totalStrokes / allKanji.length * 100) / 100;

  return stats;
}

/**
 * Get random kanji from a specific level or all levels
 */
export function getRandomKanji(level?: KanjiLevel, count: number = 1): Kanji[] {
  const sourceKanji = level ? getKanjiByLevel(level) : getAllKanji();
  const shuffled = [...sourceKanji].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

/**
 * Validate kanji data structure
 */
export function validateKanjiData(kanji: any): kanji is Kanji {
  return (
    typeof kanji.id === 'string' &&
    typeof kanji.character === 'string' &&
    Array.isArray(kanji.onyomi) &&
    Array.isArray(kanji.kunyomi) &&
    typeof kanji.meaning === 'string' &&
    ['N5', 'N4', 'N3', 'N2', 'N1'].includes(kanji.level) &&
    typeof kanji.strokeCount === 'number' &&
    typeof kanji.frequency === 'number' &&
    typeof kanji.difficulty === 'number' &&
    Array.isArray(kanji.radicals) &&
    Array.isArray(kanji.tags) &&
    Array.isArray(kanji.examples) &&
    typeof kanji.mnemonics === 'string' &&
    typeof kanji.usageNotes === 'string' &&
    Array.isArray(kanji.relatedKanji) &&
    (kanji.audioUrl === null || typeof kanji.audioUrl === 'string') &&
    typeof kanji.createdAt === 'string' &&
    typeof kanji.updatedAt === 'string'
  );
}