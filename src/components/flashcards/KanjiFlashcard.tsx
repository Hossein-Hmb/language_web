"use client";

import { useState } from "react";
import { Kanji } from "@/types/database";

interface KanjiFlashcardProps {
  kanji: Kanji;
  onAnswer: (isCorrect: boolean) => void;
  showAnswer?: boolean;
}

export function KanjiFlashcard({
  kanji,
  onAnswer,
  showAnswer = false,
}: KanjiFlashcardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleAnswer = (isCorrect: boolean) => {
    onAnswer(isCorrect);
    setIsFlipped(false);
    setShowHint(false);
  };

  return (
    <div className="w-full max-w-lg mx-auto">
      <div
        className={`relative h-[500px] cursor-pointer transition-transform duration-500 transform-style-preserve-3d ${
          isFlipped ? "rotate-y-180" : ""
        }`}
        onClick={handleFlip}>
        {/* Front of card */}
        <div
          className={`absolute w-full h-full backface-hidden ${
            isFlipped ? "opacity-0" : "opacity-100"
          }`}>
          <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl shadow-[0_0_0_1px_rgba(255,255,255,0.06)] p-8 h-full flex flex-col items-center justify-center hover:border-[#9B5CF6]/30 transition-all duration-200">
            <div className="text-9xl font-bold text-white mb-6 select-none">
              {kanji.character}
            </div>
            <div className="text-[#A3A7B7] mb-6">Click to reveal</div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowHint(!showHint);
              }}
              className="rounded-full px-6 py-2 border border-white/15 text-white/90 hover:bg-white/5 transition-colors duration-200">
              {showHint ? "Hide" : "Show"} Hint
            </button>
            {showHint && (
              <div className="mt-6 text-center backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-4">
                <div className="text-lg font-semibold text-white mb-2">
                  Strokes: {kanji.stroke_count}
                </div>
                {kanji.radicals && kanji.radicals.length > 0 && (
                  <div className="text-sm text-[#A3A7B7]">
                    Radicals: {kanji.radicals.join(", ")}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Back of card */}
        <div
          className={`absolute w-full h-full backface-hidden rotate-y-180 ${
            isFlipped ? "opacity-100" : "opacity-0"
          }`}>
          <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl shadow-[0_0_0_1px_rgba(255,255,255,0.06)] p-8 h-full flex flex-col justify-between">
            <div>
              <div className="text-center mb-8">
                <div className="text-6xl font-bold text-white mb-4">
                  {kanji.character}
                </div>
                <div className="text-2xl font-semibold bg-gradient-to-r from-[#9B5CF6] to-[#FF73B9] bg-clip-text text-transparent">
                  {kanji.meaning}
                </div>
              </div>

              <div className="space-y-6">
                {kanji.kun_yomi && kanji.kun_yomi.length > 0 && (
                  <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-4">
                    <div className="text-sm font-medium text-[#A3A7B7] mb-2">
                      Kun-yomi:
                    </div>
                    <div className="text-lg text-white">
                      {kanji.kun_yomi.join(", ")}
                    </div>
                  </div>
                )}

                {kanji.on_yomi && kanji.on_yomi.length > 0 && (
                  <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-4">
                    <div className="text-sm font-medium text-[#A3A7B7] mb-2">
                      On-yomi:
                    </div>
                    <div className="text-lg text-white">
                      {kanji.on_yomi.join(", ")}
                    </div>
                  </div>
                )}

                {kanji.examples &&
                  Array.isArray(kanji.examples) &&
                  kanji.examples.length > 0 && (
                    <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-4">
                      <div className="text-sm font-medium text-[#A3A7B7] mb-3">
                        Examples:
                      </div>
                      <div className="space-y-2">
                        {(kanji.examples as string[])
                          .slice(0, 3)
                          .map((example: string, index: number) => (
                            <div
                              key={index}
                              className="flex items-center gap-2">
                              <div className="w-1 h-1 bg-[#9B5CF6] rounded-full"></div>
                              <div className="text-white text-sm">
                                {example}
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  )}
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleAnswer(false);
                }}
                className="flex-1 rounded-full px-6 py-3 border border-red-500/30 text-red-400 hover:bg-red-500/10 transition-colors duration-200">
                Need Review
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleAnswer(true);
                }}
                className="flex-1 rounded-full px-6 py-3 font-semibold text-white bg-gradient-to-r from-[#9B5CF6] to-[#FF73B9] hover:opacity-95 transition-all duration-200">
                Got It!
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
