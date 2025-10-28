"use client";

import { useEffect, useState } from "react";
import RecommendationDisplay, { Recommendation } from "@/components/recommendation/RecommendationDisplay";

export default function RecommendationPage() {
  const [recommendation, setRecommendation] = useState<Recommendation | null>( 
    null
  );

  useEffect(() => {
    const storedRecommendation = sessionStorage.getItem("recommendation");
    if (storedRecommendation) {
      try {
        setRecommendation(JSON.parse(storedRecommendation));
      } catch (error) {
        console.error("Failed to parse recommendation from sessionStorage", error);
      }
    }
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 sm:p-12 md:p-24">
      <RecommendationDisplay recommendation={recommendation} />
    </main>
  );
}