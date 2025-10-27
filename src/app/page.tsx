import SurveyForm from "@/components/SurveyForm";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold mb-8">여행 추천 서비스</h1>
      <SurveyForm />
    </main>
  );
}
