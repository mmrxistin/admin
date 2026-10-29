// BismillahirRahmanirRahim
// El Hamdu Lillahi Rabbul Alemin
// Esselatu vesselamu ala rasulina Muhammedin .
// La ilahe ill Allah Muhammeden Rasulullah

// Bismillahirrahmanirahim
// Elhamdulillahirabbulalemin
// Es-selatu vesselamu ala rasulina Muhammedin 
// La havle ve la kuvvete illa billahil aliyyil azim
// Allah u Ekber
// La ilahe illallah Muhammedur Resulullah
// Subhanallah, Elhamdulillah, Allahu Ekber, La ilahe illallah
// Estağfirulllah El-Azim

import React from "react";
import { headers } from "next/headers";

async function getMessages() {
  const headersList = headers();
  const host = headersList.get("host");
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
  const baseUrl = `${protocol}://${host}`;
  const res = await fetch(`${baseUrl}/api/mmmpeyam`, { cache: "no-store" });
  if (!res.ok) return [];
  return res.json();
}

export default async function MessagesPage() {
  const messages = await getMessages();

  return (
    <div style={{ background:"white",maxWidth: 700, margin: "40px auto", padding: 24 }}>
      <h1 style={{ fontWeight: 700, fontSize: "2rem", marginBottom: 24, color: "#28a745" }}>
        Gelen Mesajlar
      </h1>
      {messages.length === 0 && <p>Hiç mesaj yok.</p>}
      <ul style={{ listStyle: "none", padding: 0 }}>
        {messages.map((msg: any) => (
          <li
            key={msg.id}
            style={{
              background: "#fff",
              border: "1px solid #e9ecef",
              borderRadius: 12,
              marginBottom: 18,
              padding: 18,
              boxShadow: "0 2px 8px rgba(40,167,69,0.06)",
            }}
          >
            <div style={{ fontWeight: 600, color: "#28a745" }}>{msg.name}</div>
            <div style={{ color: "#6c757d", fontSize: 14 }}>{msg.email}</div>
            <div style={{ marginTop: 8 }}>{msg.message}</div>
            <div style={{ marginTop: 8, fontSize: 12, color: "#adb5bd" }}>
              {msg.createdAt ? new Date(msg.createdAt).toLocaleString() : ""}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
