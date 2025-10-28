"use client";

import { useState } from "react";
import Link from "next/link";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import "./datepicker.css";

export default function Home() {
  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const formatDateForUrl = (date: Date | null) => {
    if (!date) return "";
    return date.toISOString().split('T')[0];
  };

  const handleStartDateChange = (date: Date | null) => {
    setStartDate(date);
    if (endDate && date && date > endDate) {
      setEndDate(null);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-extrabold text-gray-800 mb-4">
          여행 어때
        </h1>
        <p className="text-lg text-gray-600">
          AI와 함께 떠나는 놀라운 여행, 당신의 완벽한 여행을 계획해보세요!
        </p>
      </div>

      <div className="w-full max-w-md">
        <form className="bg-white/20 backdrop-blur-lg border border-gray-400/50 shadow-md rounded-2xl px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              여행지
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="예: 제주도"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              여행 시작 날짜
            </label>
            <DatePicker
              wrapperClassName="w-full"
              selected={startDate}
              onChange={handleStartDateChange}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              minDate={new Date()}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholderText="날짜를 선택하세요"
              dateFormat="yyyy/MM/dd"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              여행 종료 날짜
            </label>
            <DatePicker
              wrapperClassName="w-full"
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate || new Date()}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholderText="날짜를 선택하세요"
              dateFormat="yyyy/MM/dd"
            />
          </div>
          <div className="flex items-center justify-center">
            <Link
              href={`/survey?destination=${destination}&startDate=${formatDateForUrl(
                startDate
              )}&endDate=${formatDateForUrl(endDate)}`}
              className="bg-gradient-to-r from-purple-500 to-blue-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transform transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
            >
              여행 떠나기
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}
