"use client";

import { useEffect, useState, useRef } from "react";
import axios from "axios";
import Link from "next/link";

type DayAvailability = {
  booked: number;
  available: number;
};

export default function UserCalendarAvailability() {
  const today = new Date();

  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth()); // 0-11
  const [data, setData] = useState<Record<string, DayAvailability>>({});
  const [loading, setLoading] = useState(false);

  const calendarRef = useRef<HTMLDivElement>(null);
  const dragStartX = useRef<number | null>(null);

  const fetchAvailability = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `/api/admin/calendar-availability?year=${year}&month=${month}`
      );
      setData(res.data);
    } catch (err) {
      console.error("Failed to load availability", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchAvailability();
  }, [year, month]);

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay(); // 0 = Sun

  const getStatusColor = (available: number, day: number) => {
    if (available <= 0) return "text-red-500";
    if (available <= 5) return "text-yellow-500";
    return "text-black";
  };

  // Month navigation
  const prevMonth = () => {
    if (month === 0) {
      setMonth(11);
      setYear((y) => y - 1);
    } else {
      setMonth((m) => m - 1);
    }
  };

  const nextMonth = () => {
    if (month === 11) {
      setMonth(0);
      setYear((y) => y + 1);
    } else {
      setMonth((m) => m + 1);
    }
  };

  // Drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    dragStartX.current = e.clientX;
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (dragStartX.current !== null) {
      const diff = e.clientX - dragStartX.current;
      if (diff > 50) prevMonth(); // dragged right
      if (diff < -50) nextMonth(); // dragged left
    }
    dragStartX.current = null;
  };

  return (
    <div className="max-w-6xl mx-auto p-6 shadow-i">
      

      {/* Month Controls with arrows */}
      <div className="flex items-center justify-center gap-4 mb-6 font-dm">
        <button
          onClick={prevMonth}
          className="p-2 rounded bg-white hover:bg-gray-300"
        >
          ◀
        </button>
<h1 className="text-xl font-bold text-black text-center">
        {new Date(year, month).toLocaleString("default", {
          month: "long",
          year: "numeric",
        })}
      </h1>

        <button
          onClick={nextMonth}
          className="p-2 rounded bg-white hover:bg-gray-300"
        >
          ▶
        </button>
      </div>

      {/* Calendar */}
      {loading ? (
        <p>Loading availability...</p>
      ) : (
        <div
          ref={calendarRef}
          className="grid grid-cols-7 gap-2 text-center select-none font-dm"
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
        >
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
            <div key={d} className="font-semibold text-black">
              {d}
            </div>
          ))}

          {/* Empty cells */}
          {Array.from({ length: firstDay }).map((_, i) => (
            <div key={`empty-${i}`} />
          ))}

          {/* Days */}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1;
            const dateKey = `${year}-${String(month + 1).padStart(
              2,
              "0"
            )}-${String(day).padStart(2, "0")}`;
            const info = data[dateKey];

            return (
              <div
                key={dateKey}
                className={`rounded-lg p-3 text-black shadow ${getStatusColor(
                  info?.available ?? 0,
                  day
                )}`}
              >
                <div className="font-bold text-shadow-sm">{day}</div>
              </div>
            );
          })}
        </div>
      )}

      {/* Legend */}
      <div className="mt-8 flex gap-6 text-sm text-black font-dm">
        <div className="flex items-center gap-2">
          <span className="w-4 h-4 bg-green-500 rounded"></span>
          Available
        </div>
        <div className="flex items-center gap-2">
          <span className="w-4 h-4 bg-yellow-400 rounded"></span>
          Limited
        </div>
        <div className="flex items-center gap-2">
          <span className="w-4 h-4 bg-red-500 rounded"></span>
          Fully Booked
        </div>
      </div>
    </div>
  );
}
