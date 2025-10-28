interface RecommendationDisplayProps {
  recommendation: {
    destination: string;
    description: string;
    itinerary: {
      day: string;
      activities: {
        time: string;
        description: string;
        link: string;
      }[];
    }[];
  };
}

export default function RecommendationDisplay({ recommendation }: RecommendationDisplayProps) {
  return (
    <div className="bg-gray-50 p-6 sm:p-8 rounded-2xl shadow-2xl max-w-3xl mx-auto my-8 border border-gray-200 font-sans">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-extrabold text-gray-800">✨ 당신을 위한 여행 ✨</h2>
        <p className="text-gray-500 mt-2">AI가 추천하는 특별한 여행 계획을 확인해보세요.</p>
      </div>
      
      <div className="bg-white p-6 rounded-xl shadow-md mb-8">
        <h3 className="text-2xl font-bold text-blue-600 mb-3 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" /></svg>
          목적지: {recommendation.destination}
        </h3>
        <p className="text-gray-600 leading-relaxed pl-1">{recommendation.description}</p>
      </div>

      <div>
        <h3 className="text-2xl font-bold mb-4 text-gray-800">🗓️ 추천 일정</h3>
        <div className="space-y-6">
          {recommendation.itinerary.map((item, index) => (
            <div key={index} className="bg-white p-5 rounded-xl shadow-md">
              <h4 className="font-bold text-xl text-blue-500 mb-4 border-b border-blue-100 pb-2">{item.day}</h4>
              <ul className="space-y-3">
                {item.activities.map((activity, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="bg-blue-100 text-blue-800 font-semibold text-sm px-3 py-1 rounded-full mt-1 shrink-0">{activity.time}</div>
                    <p className="text-gray-700 flex-1">{activity.description}
                      <a href={activity.link} target="_blank" rel="noopener noreferrer" className="inline-block ml-2 text-blue-500 hover:text-blue-700 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" /><path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" /></svg>
                      </a>
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
