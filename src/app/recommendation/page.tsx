"use client";

import { useState } from "react";
import RecommendationDisplay, { Recommendation } from "@/components/recommendation/RecommendationDisplay";

function getInitialRecommendation(): Recommendation | null {
  if (typeof window === "undefined") {
    return null;
  }
  const storedRecommendation = sessionStorage.getItem("recommendation");
  if (storedRecommendation) {
    try {
      return JSON.parse(storedRecommendation);
    } catch (error) {
      console.error("Failed to parse recommendation from sessionStorage", error);
      return null;
    }
  }
  return null;
}

export default function RecommendationPage() {
  const [recommendation] = useState<Recommendation | null>(
    getInitialRecommendation
  );

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 sm:p-12 md:p-24">
      <RecommendationDisplay recommendation={recommendation} />
    </main>
  );
}