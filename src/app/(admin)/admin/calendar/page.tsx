"use client";

import { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { DateSelectArg, EventApi } from "@fullcalendar/core";
import axios from "axios";

interface BookingEvent {
  id: string;
  title: string;
  start: string;
  end: string;
  allDay: boolean;
}

export default function AdminCalendarPage() {
  const [events, setEvents] = useState<BookingEvent[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch all bookings
  const fetchBookings = async () => {
    try {
      const res = await axios.get("/api/admin/bookings/calender");
      const bookings = res.data;

      // Map bookings to calendar events
      const calendarEvents: BookingEvent[] = bookings.map((b: any) => ({
        id: b._id,
        title: `${b.user?.name || "Guest"} - ${b.room?.name || "Room"}`,
        start: new Date(b.fromDate).toISOString(),
        end: new Date(b.toDate).toISOString(),
        allDay: true,
      }));

      setEvents(calendarEvents);
    } catch (err) {
      console.error("Failed to load bookings:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  // Handle selecting a date range to reserve
  const handleDateSelect = async (selectInfo: DateSelectArg) => {
    const guestName = prompt("Enter guest name for reservation:");
    if (!guestName) return;

    const roomId = prompt("Enter room ID to reserve:"); // In real app, maybe a dropdown
    if (!roomId) return;

    try {
      const res = await axios.post("/api/bookings", {
        roomId,
        userId: "admin", // admin reserved, use a special ID
        fromDate: selectInfo.startStr,
        toDate: selectInfo.endStr,
        guests: 1,
        totalPrice: 0,
        status: "paid",
        paymentMethod: "admin",
      });

      // Add to calendar
      const newEvent: BookingEvent = {
        id: res.data._id,
        title: `${guestName} - Room ${roomId}`,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: true,
      };
      setEvents((prev) => [...prev, newEvent]);
      alert("Date reserved successfully!");
    } catch (err) {
      console.error("Failed to reserve date:", err);
      alert("Failed to reserve date.");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading calendar...</p>;

  return (
    <div className="max-w-5xl mx-auto mt-10 p-6 bg-white shadow rounded-xl text-black">
      <h1 className="text-2xl font-bold mb-6">Admin Calendar</h1>

      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        selectable={true}
        select={handleDateSelect}
        events={events}
        height="auto"
      />
    </div>
  );
}
