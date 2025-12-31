"use client";

import { useEffect, useState, useRef } from "react";
import axios from "axios";
import Link from "next/link";

type DayAvailability = {
  booked: number;
  available: number;
};

export default function CalendarAvailabilityPage() {
  const today = new Date();

  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth()); // 0-11
  const [data, setData] = useState<Record<string, DayAvailability>>({});
  const [loading, setLoading] = useState(false);

  const calendarRef = useRef<HTMLDivElement>(null);
  const dragStartX = useRef<number | null>(null);

  useEffect(() => {
    fetchAvailability();
  }, [year, month]);

  const fetchAvailability = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `/api/admin/calendar-availability?year=${year}&month=${month}`
      );
      setData(res.data);
      console.log("fixer 1");
      console.log(res.data);
      
    } catch (err) {
      console.error("Failed to load availability", err);
    }
    setLoading(false);
  };

  // ⚠️ Month structure stays LOCAL (UI only)
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay(); // 0 = Sun

  const getStatusColor = (available: number) => {
    if (available <= 0) return "bg-red-500";
    if (available <= 5) return "bg-yellow-400";
    return "bg-green-500";
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
      if (diff > 50) prevMonth();
      if (diff < -50) nextMonth();
    }
    dragStartX.current = null;
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-black mb-6 text-center">
        {new Date(year, month).toLocaleString("default", {
          month: "long",
          year: "numeric",
        })}
      </h1>

      {/* Month Controls */}
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={prevMonth}
          className="p-2 rounded bg-black hover:bg-gray-300"
        >
          ◀
        </button>

        <select
          value={month}
          onChange={(e) => setMonth(Number(e.target.value))}
          className="border rounded p-2 text-black"
        >
          {Array.from({ length: 12 }).map((_, i) => (
            <option key={i} value={i}>
              {new Date(0, i).toLocaleString("default", { month: "long" })}
            </option>
          ))}
        </select>

        <select
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
          className="border rounded p-2 text-black"
        >
          {Array.from({ length: 5 }).map((_, i) => (
            <option key={i} value={today.getFullYear() - 2 + i}>
              {today.getFullYear() - 2 + i}
            </option>
          ))}
        </select>

        <button
          onClick={nextMonth}
          className="p-2 rounded bg-black hover:bg-gray-300"
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
          className="grid grid-cols-7 gap-2 text-center select-none"
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
        >
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
            <div key={d} className="font-semibold text-gray-600">
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

            // ✅ UTC-safe key (MATCHES API)
            const date = new Date(Date.UTC(year, month, day));
            const dateKey = date.toISOString().split("T")[0];

            const info = data[dateKey];

            return (
              <Link
                href={`/admin/calendar-availability/${dateKey}`}
                key={dateKey}
                className={`rounded-lg p-3 text-white shadow ${getStatusColor(
                  info?.available ?? 0
                )}`}
              >
                <div className="font-bold">{day}</div>
                <p className="text-xs mt-1">Booked: {info?.booked ?? 0}</p>
                <p className="text-xs">
                  Available: {info?.available ?? 0}
                </p>
              </Link>
            );
          })}
        </div>
      )}

      {/* Legend */}
      <div className="mt-8 flex gap-6 text-sm">
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
          Fully Booked / Last Day
        </div>
      </div>
    </div>
  );
}
