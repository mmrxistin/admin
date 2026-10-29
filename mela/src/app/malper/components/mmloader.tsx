// BismillahirRahmanirRahim
// El Hamdu Lillahi Rabbul Alemin
// Esselatu vesselamu ala rasulina Muhammedin .
// La ilahe ill Allah Muhammeden Rasulullah

// Bismillahirrahmanirrahim
// Elhamdulillahirabbulalemin
// Ve salatu ve selamu ala resulina Muhammedin
// Allah U Ekber, Allah U Ekber, Allah U Ekber, La ilahe illAllah
// SubhanAllah, Elhamdulillah, Allahu Ekber

"use client";

import React from "react";

/**
 * Modern yazarlık sitesi loader'ı:
 * - Üstte akan kırmızı yükleme çubuğu (progress)
 * - Shimmer (parlama) efektli yazı iskeletleri
 * - Kademeli (staggered) fade-in animasyonu
 */
export function NewsLoader() {
  return (
    <div className="mm-loader-wrap" aria-busy="true" role="status">
      {/* Akan progress çubuğu */}
      <div className="mm-loader-bar" />

      <div className="mm-skel-grid">
        {/* Ana yazı iskeleti */}
        <div className="mm-skel mm-skel-hero">
          <div className="mm-shimmer mm-shimmer-img" />
          <div className="mm-shimmer mm-shimmer-badge" />
          <div className="mm-shimmer mm-shimmer-line" style={{ width: "85%" }} />
          <div className="mm-shimmer mm-shimmer-line" style={{ width: "60%" }} />
        </div>

        {/* Yan yazı iskeletleri */}
        <div className="mm-skel-col">
          {[0, 1].map((i) => (
            <div className="mm-skel mm-skel-side" key={i} style={{ animationDelay: `${0.15 * (i + 1)}s` }}>
              <div className="mm-shimmer mm-shimmer-thumb" />
              <div className="mm-skel-lines">
                <div className="mm-shimmer mm-shimmer-badge" />
                <div className="mm-shimmer mm-shimmer-line" style={{ width: "90%" }} />
                <div className="mm-shimmer mm-shimmer-line" style={{ width: "55%" }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mm-loader-label">
        <span className="mm-dot" />
        <span className="mm-dot" style={{ animationDelay: "0.15s" }} />
        <span className="mm-dot" style={{ animationDelay: "0.3s" }} />
        <span className="mm-loader-text">İçerik yükleniyor…</span>
      </div>
    </div>
  );
}

export default NewsLoader;
