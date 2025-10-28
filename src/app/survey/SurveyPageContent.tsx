"use client";

import SurveyForm from "@/components/survey/SurveyForm";
import { useSearchParams } from "next/navigation";

export default function SurveyPageContent() {
  const searchParams = useSearchParams();
  const destination = searchParams.get("destination") || "";
  const startDate = searchParams.get("startDate") || "";
  const endDate = searchParams.get("endDate") || "";
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">여행 추천 서비스</h1>
      <SurveyForm destination={destination} startDate={startDate} endDate={endDate} />
    </main>
  );
}
