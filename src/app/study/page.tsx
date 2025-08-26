"use client";

import { useMemo, useState } from "react";
import { FlashcardStudySession } from "@/components/flashcards/FlashcardStudySession";
import { LearnMode } from "@/components/flashcards/LearnMode";
import { useSearchParams } from "next/navigation";

interface StudyResult {
  kanjiId: string;
  isCorrect: boolean;
  timeSpent: number;
}

export default function StudyPage() {
  const [selectedLevel, setSelectedLevel] = useState<string>("N5");
  const [isStudying, setIsStudying] = useState(false);
  const [studyResults, setStudyResults] = useState<StudyResult[]>([]);
  const searchParams = useSearchParams();
  const mode = useMemo(() => {
    const m = searchParams.get("mode");
    return m === "review" ? "review" : "learn";
  }, [searchParams]);

  const handleStartStudy = () => {
    setIsStudying(true);
    setStudyResults([]);
  };

  const handleStudyComplete = (results?: StudyResult[]) => {
    setStudyResults(results ?? []);
    setIsStudying(false);
  };

  const handleRetry = () => {
    setIsStudying(true);
    setStudyResults([]);
  };

  if (isStudying) {
    return (
      <div className="min-h-screen px-6 py-8">
        {mode === "learn" ? (
          <LearnMode
            jlptLevel={selectedLevel}
            onComplete={handleStudyComplete as any}
          />
        ) : (
          <FlashcardStudySession
            jlptLevel={selectedLevel}
            onComplete={handleStudyComplete}
          />
        )}
      </div>
    );
  }

  if (studyResults.length > 0) {
    const correctAnswers = studyResults.filter((r) => r.isCorrect).length;
    const accuracy = Math.round((correctAnswers / studyResults.length) * 100);
    const totalTime = Math.round(
      studyResults.reduce((sum, r) => sum + r.timeSpent, 0) / 1000
    );

    return (
      <div className="min-h-screen px-6 py-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-8">
            <span className="bg-gradient-to-r from-[#9B5CF6] to-[#FF73B9] bg-clip-text text-transparent">
              Study Session Complete!
            </span>
          </h1>

          <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-8 shadow-[0_0_0_1px_rgba(255,255,255,0.06)] mb-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
              <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-6">
                <div className="text-3xl font-bold text-white mb-2">
                  {studyResults.length}
                </div>
                <div className="text-[#A3A7B7]">Total Kanji</div>
              </div>
              <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-6">
                <div className="text-3xl font-bold bg-gradient-to-r from-[#9B5CF6] to-[#FF73B9] bg-clip-text text-transparent mb-2">
                  {correctAnswers}
                </div>
                <div className="text-[#A3A7B7]">Correct</div>
              </div>
              <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-6">
                <div className="text-3xl font-bold bg-gradient-to-r from-[#6BE4FF] to-[#9B5CF6] bg-clip-text text-transparent mb-2">
                  {accuracy}%
                </div>
                <div className="text-[#A3A7B7]">Accuracy</div>
              </div>
            </div>

            <div className="text-center space-y-2">
              <div className="text-lg text-white">
                Time: <span className="font-semibold">{totalTime}</span> seconds
              </div>
              <div className="text-lg text-[#A3A7B7]">
                Average:{" "}
                <span className="text-white font-semibold">
                  {Math.round(totalTime / studyResults.length)}s
                </span>{" "}
                per kanji
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleRetry}
              className="rounded-full px-8 py-4 font-semibold text-white bg-gradient-to-r from-[#9B5CF6] to-[#FF73B9] hover:opacity-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9B5CF6] transition-all duration-200">
              Study Again
            </button>
            <button
              onClick={() => {
                setStudyResults([]);
                setSelectedLevel("N5");
              }}
              className="rounded-full px-8 py-4 border border-white/15 text-white/90 hover:bg-white/5 transition-colors duration-200">
              Choose Level
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-6 py-8">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4">
          <span className="bg-gradient-to-r from-[#9B5CF6] to-[#FF73B9] bg-clip-text text-transparent">
            Choose Your Study Level
          </span>
        </h1>
        <p className="text-[#A3A7B7] mb-12 text-xl">
          Select the JLPT level that matches your current ability
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {["N5", "N4", "N3"].map((level) => (
            <button
              key={level}
              onClick={() => setSelectedLevel(level)}
              className={`group backdrop-blur-md border rounded-2xl p-8 transition-all duration-200 ${
                selectedLevel === level
                  ? "bg-gradient-to-br from-[#9B5CF6]/10 to-[#FF73B9]/10 border-[#9B5CF6]/50 shadow-lg shadow-[#9B5CF6]/20"
                  : "bg-white/5 border-white/10 hover:border-[#9B5CF6]/30 hover:bg-white/10"
              }`}>
              <div className="text-3xl font-bold mb-3 text-white">{level}</div>
              <div className="text-[#A3A7B7] leading-relaxed">
                {level === "N5" && "Basic (100 kanji)"}
                {level === "N4" && "Elementary (300 kanji)"}
                {level === "N3" && "Intermediate (650 kanji)"}
              </div>
              {selectedLevel === level && (
                <div className="mt-4 inline-flex items-center gap-2 text-sm bg-gradient-to-r from-[#9B5CF6] to-[#FF73B9] text-white px-3 py-1 rounded-full">
                  ✓ Selected
                </div>
              )}
            </button>
          ))}
        </div>

        <button
          onClick={handleStartStudy}
          className="rounded-full px-8 py-4 font-semibold text-lg text-white bg-gradient-to-r from-[#9B5CF6] to-[#FF73B9] hover:opacity-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9B5CF6] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!selectedLevel}>
          Start Studying {selectedLevel}
        </button>
      </div>
    </div>
  );
}
