"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import RecommendationDisplay from "@/components/recommendation/RecommendationDisplay";

interface Answers {
  destination: string;
  purpose: string;
  type: string;
  budget: string;
  company: string;
  duration: string;
  priority: string[];
  startDate?: string;
  endDate?: string;
}

interface SurveyFormProps {
  destination: string;
  startDate: string;
  endDate: string;
}

const questions: {
  id: keyof Answers;
  text: string;
  type: string;
  required: boolean;
  placeholder?: string;
  options?: string[];
  values?: string[];
}[] = [
  {
    id: "purpose",
    text: "1. 여행의 목적은 무엇인가요?",
    type: "radio",
    options: ["휴식", "모험", "문화탐방", "쇼핑"],
    values: ["relaxation", "adventure", "culture", "shopping"],
    required: true,
  },
  {
    id: "type",
    text: "2. 어떤 종류의 여행을 선호하시나요?",
    type: "radio",
    options: ["도시", "자연", "휴양지"],
    values: ["city", "nature", "resort"],
    required: true,
  },
  {
    id: "budget",
    text: "3. 예산은 어느 정도로 생각하시나요? (1인 기준)",
    type: "select",
    options: ["50만원 이하", "50만원 - 150만원", "150만원 이상"],
    values: ["low", "medium", "high"],
    required: true,
  },
  {
    id: "company",
    text: "4. 누구와 함께 여행하시나요?",
    type: "radio",
    options: ["혼자", "연인", "가족", "친구"],
    values: ["solo", "partner", "family", "friends"],
    required: true,
  },
  {
    id: "priority",
    text: "5. 여행에서 가장 중요하게 생각하는 것은 무엇인가요? (2개 선택)",
    type: "checkbox",
    options: ["음식", "볼거리", "액티비티", "가성비"],
    values: ["food", "sights", "activities", "cost"],
    required: true,
  },
];

export default function SurveyForm({ destination, startDate, endDate }: SurveyFormProps) {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({
    destination: destination || "",
    purpose: "",
    type: "",
    budget: "",
    company: "",
    duration: "",
    priority: [],
    startDate: startDate || "",
    endDate: endDate || "",
  });
  const [recommendation, setRecommendation] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const totalSteps = questions.length;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name === "priority") {
      const currentPriorities = answers.priority;
      const isCurrentlyChecked = currentPriorities.includes(value);

      if (isCurrentlyChecked) {
        setAnswers((prev) => ({
          ...prev,
          priority: prev.priority.filter((p) => p !== value),
        }));
      } else {
        if (currentPriorities.length < 2) {
          setAnswers((prev) => ({
            ...prev,
            priority: [...prev.priority, value],
          }));
        }
      }
    } else {
      setAnswers((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const isNextDisabled = useMemo(() => {
    const currentQuestion = questions[currentStep];
    if (!currentQuestion.required) return false;

    const answer = answers[currentQuestion.id];
    if (Array.isArray(answer)) {
      return answer.length === 0;
    }
    return !answer;
  }, [currentStep, answers]);

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
      sessionStorage.setItem("recommendation", JSON.stringify(data));
      router.push("/recommendation");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex-grow flex flex-col items-center justify-center">
        <div className="text-center flex flex-col items-center justify-center p-10">

        <div className="relative w-24 h-24 mb-4 animate-spin">
          <div className="absolute inset-0 border-4 border-dashed border-gray-300 rounded-full"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <svg
              className="w-12 h-12 text-blue-500"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
            </svg>
          </div>
        </div>
        <p className="text-xl font-semibold text-gray-700">
          추천을 생성 중입니다...
        </p>
        <p className="text-gray-500">최적의 여행지를 찾고 있어요!</p>
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500 text-xl">오류: {error}</div>;
  }

  if (recommendation) {
    return <RecommendationDisplay recommendation={recommendation} />;
  }

  const currentQuestion = questions[currentStep];

  return (
    <div className="bg-blue-50 p-8 rounded-2xl shadow-lg max-w-2xl mx-auto w-full">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between mb-1">
          <span className="text-base font-medium text-blue-700">
            질문 {currentStep + 1}/{totalSteps}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
            style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Question Area */}
      <div className="p-6 bg-white rounded-lg border border-gray-200 min-h-[200px] flex flex-col justify-center">
        <h3 className="text-xl font-semibold mb-6 text-gray-800">
          {currentQuestion.text}
        </h3>
        {currentQuestion.type === "text" && (
          <input
            type="text"
            name={currentQuestion.id}
            value={answers[currentQuestion.id]}
            onChange={handleChange}
            placeholder={currentQuestion?.placeholder}
            className="mt-2 border p-3 rounded-md w-full focus:ring-blue-500 focus:border-blue-500"
          />
        )}
        {(currentQuestion.type === "radio" ||
          currentQuestion.type === "checkbox") && (
          <div className="mt-2 grid grid-cols-2 gap-4">
            {currentQuestion.options?.map((option, index) => {
              const value = currentQuestion.values![index];
              const answer = answers[currentQuestion.id];
              const isChecked = Array.isArray(answer)
                ? answer.includes(value)
                : answer === value;

              return (
                <label
                  key={option}
                  className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${
                    isChecked
                      ? "bg-blue-100 border-blue-500"
                      : "bg-white hover:bg-gray-50"
                  }`}
                >
                  <input
                    type={currentQuestion.type}
                    name={currentQuestion.id}
                    value={value}
                    onChange={handleChange}
                    checked={isChecked}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                  />
                  <span className="ml-3 text-md font-medium text-gray-900">
                    {option}
                  </span>
                </label>
              );
            })}
          </div>
        )}
        {currentQuestion.type === "select" && (
          <select
            name={currentQuestion.id}
            onChange={handleChange}
            value={answers[currentQuestion.id]}
            className="mt-2 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 appearance-none cursor-pointer transition duration-150 ease-in-out hover:border-gray-400"
          >
            <option value="">선택하세요</option>
            {currentQuestion.options?.map((option, index) => (
              <option key={option} value={currentQuestion.values![index]}>
                {option}
              </option>
            ))}
          </select>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-8">
        <button
          type="button"
          onClick={handlePrev}
          disabled={currentStep === 0}
          className="px-6 py-2 bg-gray-300 text-gray-800 font-bold rounded-lg hover:bg-gray-400 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors duration-300"
        >
          이전
        </button>

        {currentStep < totalSteps - 1 ? (
          <button
            type="button"
            onClick={handleNext}
            disabled={isNextDisabled}
            className="px-6 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed transition-colors duration-300"
          >
            다음
          </button>
        ) : (
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isNextDisabled}
            className="px-6 py-2 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 disabled:bg-green-300 disabled:cursor-not-allowed transition-colors duration-300"
          >
            추천 받기
          </button>
        )}
      </div>
    </div>
  );
}