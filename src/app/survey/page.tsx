import SurveyForm from "@/components/survey/SurveyForm";

export default function SurveyPage({ searchParams, }: { searchParams: { [key: string]: string | string[] | undefined }; }) {
  const destination = searchParams.destination as string || "";
  const startDate = searchParams.startDate as string || "";
  const endDate = searchParams.endDate as string || "";

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold mb-8">여행 추천 서비스</h1>
      <SurveyForm destination={destination} startDate={startDate} endDate={endDate} />
    </main>
  );
}
