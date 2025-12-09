"use client";
import { useEffect, useState } from "react";

export default function AdminMessages() {
  const [messages, setMessages] = useState([]);

  const loadMessages = async () => {
    const res = await fetch("/api/messages/all");
    const data = await res.json();
    setMessages(data.messages);
  };

  const markAsShown = async (id: string) => {
    await fetch("/api/messages/show", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    loadMessages(); // refresh list
  };

  useEffect(() => {
    loadMessages();
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Contact Messages</h2>

      {messages.map((msg: any) => (
        <div
          key={msg._id}
          onClick={() => markAsShown(msg._id)}
          className="border p-4 rounded-lg mb-3 cursor-pointer hover:bg-gray-50"
        >
          <div className="flex justify-between">
            <h3 className="text-lg font-semibold">{msg.name}</h3>

            {!msg.isShown && (
              <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">
                NEW
              </span>
            )}
          </div>

          <p>Email: {msg.email}</p>
          <p>Phone: {msg.phone}</p>
          <p className="mt-2 text-gray-700">{msg.message}</p>
        </div>
      ))}
    </div>
  );
}
