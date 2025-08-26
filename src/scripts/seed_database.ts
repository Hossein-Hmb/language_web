import { supabase } from "@/lib/supabaseClient";
import n5Kanji from "@/data/n5_kanji.json";
import n4Kanji from "@/data/n4_kanji.json";
import n3Kanji from "@/data/n3_kanji.json";
import n2Kanji from "@/data/n2_kanji.json";
import n1Kanji from "@/data/n1_kanji.json";
// ... import other levels

async function seedKanji() {
  for (const kanji of n5Kanji) {
    const { error } = await supabase.from("kanji").upsert(
      {
        character: kanji.character,
        meaning: kanji.meaning,
        kun_yomi: kanji.kun_yomi,
        on_yomi: kanji.on_yomi,
        stroke_count: kanji.stroke_count,
        jlpt_level_id: 1, // N5
        radicals: kanji.radicals,
        examples: kanji.examples,
      },
      {
        onConflict: "character",
      }
    );

    if (error) console.error(`Error seeding ${kanji.character}:`, error);
  }
}

seedKanji();
