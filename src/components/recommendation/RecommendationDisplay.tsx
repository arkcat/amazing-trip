import Link from "next/link";

export interface Recommendation {
  destination: string;
  description: string;
  itinerary: {
    day: string;
    activities: {
      time: string;
      description: string;
      link?: string;
    }[];
  }[];
}

interface RecommendationDisplayProps {
  recommendation: Recommendation | null;
}

export default function RecommendationDisplay({ recommendation }: RecommendationDisplayProps) {
  if (recommendation) {
    return <div className="bg-white/20 backdrop-blur-lg border border-gray-400/50 shadow-lg rounded-2xl p-8 max-w-2xl mx-auto my-8">
      <h2 className="text-3xl font-bold mb-4 text-gray-800 border-b pb-2">✨ 여행 추천 결과 ✨</h2>
      
      <div className="mb-6">
        <h3 className="text-2xl font-semibold text-blue-700 mb-2">🌍 목적지: {recommendation.destination}</h3>
        <p className="text-gray-700 leading-relaxed">{recommendation.description}</p>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-3 text-gray-700 border-b pb-2">🗓️ 추천 일정:</h3>
        <div className="space-y-4">
          {recommendation.itinerary.map((item, index) => ( 
            <div key={index} className="bg-white/30 backdrop-blur-sm p-4 rounded-lg border border-white/50 shadow-sm">
              <h4 className="font-bold text-lg text-gray-800 mb-2">{item.day}</h4>
              <ul className="space-y-3 text-gray-700">
                {item.activities.map((activity, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="bg-blue-100 text-blue-800 text-sm font-semibold mr-3 px-2.5 py-1 rounded-full">
                      {activity.time}
                    </span>
                    <div className="flex-1">
                      <p className="font-medium">{activity.description}</p>
                      {activity.link && (
                        <a
                          href={activity.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-blue-600 hover:underline"
                        >
                          자세히 보기
                        </a>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center mt-8">
        <Link
          href="/"
          className="bg-gradient-to-r from-purple-500 to-blue-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transform transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
        >
          처음으로 돌아가기
        </Link>
      </div>
    </div>;
  }

  return (
    <div className="text-center bg-white/20 backdrop-blur-lg border border-gray-400/50 shadow-lg rounded-2xl p-8 max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-gray-700 mb-4">결과를 찾을 수 없습니다</h2>
      <p className="text-gray-600 mb-8">죄송합니다. 추천 여행 정보를 불러오는 데 실패했거나, 아직 설문을 완료하지 않으셨습니다.</p>
      <Link
        href="/survey"
        className="bg-blue-600 text-white font-bold py-3 px-6 rounded-lg text-lg hover:bg-blue-700 transition-colors duration-300 shadow-md transform hover:scale-105 inline-block"
      >
        다시 설문하기
      </Link>
    </div>
  )
}