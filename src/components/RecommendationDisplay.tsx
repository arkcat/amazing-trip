interface RecommendationDisplayProps {
  recommendation: {
    destination: string;
    itinerary: { day: number; activity: string }[];
    notes: string;
  };
}

export default function RecommendationDisplay({ recommendation }: RecommendationDisplayProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold mb-4 text-gray-800">여행 추천 결과</h2>
      <div className="mb-6">
        <h3 className="text-2xl font-semibold text-blue-600">목적지: {recommendation.destination}</h3>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-3 text-gray-700">추천 일정:</h3>
        <ul className="list-disc list-inside space-y-2 text-gray-600">
          {recommendation.itinerary.map((item) => (
            <li key={item.day}>
              <span className="font-medium">Day {item.day}:</span> {item.activity}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-3 text-gray-700">참고:</h3>
        <p className="text-gray-600">{recommendation.notes}</p>
      </div>
    </div>
  );
}
