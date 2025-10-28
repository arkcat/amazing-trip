"use client";

import { useState } from "react";
import RecommendationDisplay from "./RecommendationDisplay";

export default function SurveyForm() {
  const [answers, setAnswers] = useState({
    destination: "", // New destination field
    purpose: "",
    type: "",
    budget: "",
    company: "",
    duration: "",
    priority: "",
  });
  const [recommendation, setRecommendation] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setAnswers({
      ...answers,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setRecommendation(null);

    try {
      const response = await fetch("/api/recommendation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(answers),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to fetch recommendation");
      }

      const data = await response.json();
      setRecommendation(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center flex flex-col items-center justify-center p-10">
        <div className="relative w-24 h-24 mb-4 animate-spin">
          <div className="absolute inset-0 border-4 border-dashed border-gray-300 rounded-full"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <svg className="w-12 h-12 text-blue-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
            </svg>
          </div>
        </div>
        <p className="text-xl font-semibold text-gray-700">추천을 생성 중입니다...</p>
        <p className="text-gray-500">최적의 여행지를 찾고 있어요!</p>
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500 text-xl">오류: {error}</div>;
  }

  if (recommendation) {
    return <RecommendationDisplay recommendation={recommendation} />;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Destination Input */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">0. 희망하는 여행 목적지가 있다면 알려주세요 (선택 사항):</h3>
        <input
          type="text"
          name="destination"
          value={answers.destination}
          onChange={handleChange}
          placeholder="예: 파리, 제주도"
          className="border p-2 rounded w-full"
        />
      </div>

      {/* Travel Purpose */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">1. 여행의 목적은 무엇인가요?</h3>
        <div className="flex gap-4">
          <label><input type="radio" name="purpose" value="relaxation" onChange={handleChange} checked={answers.purpose === "relaxation"} /> 휴식</label>
          <label><input type="radio" name="purpose" value="adventure" onChange={handleChange} checked={answers.purpose === "adventure"} /> 모험</label>
          <label><input type="radio" name="purpose" value="culture" onChange={handleChange} checked={answers.purpose === "culture"} /> 문화탐방</label>
          <label><input type="radio" name="purpose" value="shopping" onChange={handleChange} checked={answers.purpose === "shopping"} /> 쇼핑</label>
        </div>
      </div>

      {/* Travel Type */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">2. 어떤 종류의 여행을 선호하시나요?</h3>
        <div className="flex gap-4">
          <label><input type="radio" name="type" value="city" onChange={handleChange} checked={answers.type === "city"} /> 도시</label>
          <label><input type="radio" name="type" value="nature" onChange={handleChange} checked={answers.type === "nature"} /> 자연</label>
          <label><input type="radio" name="type" value="resort" onChange={handleChange} checked={answers.type === "resort"} /> 휴양지</label>
        </div>
      </div>

      {/* Budget */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">3. 예산은 어느 정도로 생각하시나요? (1인 기준)</h3>
        <select name="budget" onChange={handleChange} value={answers.budget} className="block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 appearance-none cursor-pointer transition duration-150 ease-in-out hover:border-gray-400">
          <option value="">선택하세요</option>
          <option value="low">50만원 이하</option>
          <option value="medium">50만원 - 150만원</option>
          <option value="high">150만원 이상</option>
        </select>
      </div>

      {/* Company */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">4. 누구와 함께 여행하시나요?</h3>
        <div className="flex gap-4">
          <label><input type="radio" name="company" value="solo" onChange={handleChange} checked={answers.company === "solo"} /> 혼자</label>
          <label><input type="radio" name="company" value="partner" onChange={handleChange} checked={answers.company === "partner"} /> 연인</label>
          <label><input type="radio" name="company" value="family" onChange={handleChange} checked={answers.company === "family"} /> 가족</label>
          <label><input type="radio" name="company" value="friends" onChange={handleChange} checked={answers.company === "friends"} /> 친구</label>
        </div>
      </div>

      {/* Duration */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">5. 여행 기간은 어느 정도를 계획하시나요?</h3>
        <select name="duration" onChange={handleChange} value={answers.duration} className="block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 appearance-none cursor-pointer transition duration-150 ease-in-out hover:border-gray-400">
          <option value="">선택하세요</option>
          <option value="short">3일 이하</option>
          <option value="medium">4일 - 7일</option>
          <option value="long">8일 이상</option>
        </select>
      </div>

      {/* Priority */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">6. 여행에서 가장 중요하게 생각하는 것은 무엇인가요?</h3>
        <div className="flex gap-4">
          <label><input type="radio" name="priority" value="food" onChange={handleChange} checked={answers.priority === "food"} /> 음식</label>
          <label><input type="radio" name="priority" value="sights" onChange={handleChange} checked={answers.priority === "sights"} /> 볼거리</label>
          <label><input type="radio" name="priority" value="activities" onChange={handleChange} checked={answers.priority === "activities"} /> 액티비티</label>
          <label><input type="radio" name="priority" value="cost" onChange={handleChange} checked={answers.priority === "cost"} /> 가성비</label>
        </div>
      </div>

      <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
        추천 받기
      </button>
    </form>
  );
}
