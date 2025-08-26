"use client";

import { useState, useEffect } from "react";
import { KanjiFlashcard } from "./KanjiFlashcard";
import { Kanji } from "@/types/database";
import { getSupabaseBrowser } from "@/lib/supabaseBrowser";

interface FlashcardStudySessionProps {
  jlptLevel: string;
  onComplete: (results: StudyResult[]) => void;
}

interface StudyResult {
  kanjiId: string;
  isCorrect: boolean;
  timeSpent: number;
}

export function FlashcardStudySession({
  jlptLevel,
  onComplete,
}: FlashcardStudySessionProps) {
  const [kanjiList, setKanjiList] = useState<Kanji[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [results, setResults] = useState<StudyResult[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [startTime, setStartTime] = useState<number>(0);

  useEffect(() => {
    loadKanji();
  }, [jlptLevel]);

  useEffect(() => {
    if (kanjiList.length > 0) {
      setStartTime(Date.now());
    }
  }, [kanjiList]);

  const loadKanji = async () => {
    try {
      const supabase = getSupabaseBrowser();
      if (!supabase) {
        setIsLoading(false);
        return;
      }

      const jlptId = getJLPTLevelId(jlptLevel);
      const { data, error } = await supabase
        .from("kanji")
        .select("*")
        .eq("jlpt_level_id", jlptId)
        .limit(50);

      if (error) throw error;

      setKanjiList((data || []) as Kanji[]);
    } catch (error) {
      console.error("Error loading kanji from database:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getJLPTLevelId = (level: string): number => {
    const levelMap: { [key: string]: number } = {
      N5: 5,
      N4: 4,
      N3: 3,
      N2: 2,
      N1: 1,
    };
    return levelMap[level] || 5;
  };

  const handleAnswer = (isCorrect: boolean) => {
    const timeSpent = Date.now() - startTime;
    const currentKanji = kanjiList[currentIndex];

    const result: StudyResult = {
      kanjiId: currentKanji.id,
      isCorrect,
      timeSpent,
    };

    setResults([...results, result]);

    if (currentIndex < kanjiList.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setStartTime(Date.now());
    } else {
      // Session complete
      onComplete([...results, result]);
    }
  };

  const handleSkip = () => {
    handleAnswer(false);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-8 shadow-[0_0_0_1px_rgba(255,255,255,0.06)]">
          <div className="text-lg text-white">Loading kanji...</div>
        </div>
      </div>
    );
  }

  if (kanjiList.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-8 shadow-[0_0_0_1px_rgba(255,255,255,0.06)]">
          <div className="text-lg text-[#A3A7B7]">
            No kanji found for {jlptLevel}
          </div>
        </div>
      </div>
    );
  }

  const currentKanji = kanjiList[currentIndex];
  const progress = ((currentIndex + 1) / kanjiList.length) * 100;

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex justify-between text-sm text-[#A3A7B7] mb-3">
          <span>
            Progress:{" "}
            <span className="text-white font-semibold">{currentIndex + 1}</span>{" "}
            / {kanjiList.length}
          </span>
          <span className="text-white font-semibold">
            {Math.round(progress)}%
          </span>
        </div>
        <div className="w-full bg-white/10 rounded-full h-3">
          <div
            className="bg-gradient-to-r from-[#9B5CF6] to-[#FF73B9] h-3 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Flashcard */}
      <KanjiFlashcard kanji={currentKanji} onAnswer={handleAnswer} />

      {/* Navigation */}
      <div className="mt-8 flex justify-center gap-4">
        <button
          onClick={handleSkip}
          className="rounded-full px-8 py-3 border border-white/15 text-white/90 hover:bg-white/5 transition-colors duration-200">
          Skip
        </button>
      </div>
    </div>
  );
}
