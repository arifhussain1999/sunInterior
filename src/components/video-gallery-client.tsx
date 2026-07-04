"use client";

import { videos } from "@/data/catalog";

export function VideoGalleryClient() {
  return (
    <div className="flex flex-wrap justify-center gap-8">
      {videos.map((vid) => (
        <div 
          key={vid.id}
          className="w-full max-w-[360px] overflow-hidden rounded-[28px] bg-white border border-gray-100 shadow-xl hover:shadow-2xl transition-all"
          style={{ aspectRatio: "328/480", minHeight: "520px" }}
        >
          <iframe
            src={`https://www.instagram.com/reel/${vid.reelId}/embed/`}
            className="w-full h-full border-none block"
            allowFullScreen
            scrolling="no"
          ></iframe>
        </div>
      ))}
    </div>
  );
}
