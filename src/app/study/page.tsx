import { Suspense } from "react";
import StudyClient from "./study-client";

export default function StudyPage() {
  return (
    <Suspense fallback={<div className="min-h-screen px-6 py-8">Loading…</div>}>
      <StudyClient />
    </Suspense>
  );
}
