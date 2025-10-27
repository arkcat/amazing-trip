interface RecommendationDisplayProps {
  recommendation: {
    destination: string;
    description: string;
    itinerary: { day: string; activities: string[] }[];
  };
}

export default function RecommendationDisplay({ recommendation }: RecommendationDisplayProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-xl max-w-2xl mx-auto my-8 border border-gray-200">
      <h2 className="text-3xl font-bold mb-4 text-gray-800 border-b pb-2">✨ 여행 추천 결과 ✨</h2>
      
      <div className="mb-6">
        <h3 className="text-2xl font-semibold text-blue-700 mb-2">🌍 목적지: {recommendation.destination}</h3>
        <p className="text-gray-700 leading-relaxed">{recommendation.description}</p>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-3 text-gray-700 border-b pb-2">🗓️ 추천 일정:</h3>
        <div className="space-y-4">
          {recommendation.itinerary.map((item, index) => (
            <div key={index} className="bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-100">
              <h4 className="font-bold text-lg text-gray-800 mb-2">{item.day}</h4>
              <ul className="list-disc list-inside space-y-1 text-gray-600">
                {item.activities.map((activity, idx) => (
                  <li key={idx}>{activity}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
