'use client';

import { useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { resolveImageUrl } from '@/lib/image';
import type { WorkVideo } from '@/types/pages';

export default function VideoCard({ video }: { video: WorkVideo }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(true);
  const [hovered, setHovered] = useState(false);

  function togglePlay() {
    const el = videoRef.current;
    if (!el) return;
    if (el.paused) {
      el.play();
      setPlaying(true);
    } else {
      el.pause();
      setPlaying(false);
    }
  }

  function toggleMute(e: React.MouseEvent) {
    e.stopPropagation(); // don't trigger play/pause
    const el = videoRef.current;
    if (!el) return;
    el.muted = !el.muted;
    setMuted(el.muted);
  }

  return (
    <div
      className="rounded-2xl overflow-hidden flex flex-col bg-white border h-full border-slate-200 shadow-sm"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Video wrapper */}
      <div
        className="relative w-full aspect-[9/16] bg-black cursor-pointer"
        onClick={togglePlay}
      >
        <video
          ref={videoRef}
          src={resolveImageUrl(video.video, 'work_videos')}
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        />

        {/* Type badge */}
        <span className="absolute top-3 left-3 px-2 py-1 rounded-md text-xs font-bold bg-blue-500 text-white z-10">
          {video.type}
        </span>

        {/* Mute/unmute — visible only on hover */}
        <button
          onClick={toggleMute}
          aria-label={muted ? 'Unmute' : 'Mute'}
          className={`absolute top-3 right-3 z-10 p-1.5 rounded-full bg-black/50 text-white transition-opacity duration-200 ${
            hovered ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
        </button>

        {/* Play/pause overlay — shown briefly when paused */}
        {!playing && (
          <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
            <div className="w-14 h-14 rounded-full bg-black/60 flex items-center justify-center">
              {/* Play triangle */}
              <svg
                viewBox="0 0 24 24"
                fill="white"
                className="w-7 h-7 translate-x-0.5"
              >
                <polygon points="5,3 19,12 5,21" />
              </svg>
            </div>
          </div>
        )}
      </div>

      {/* Caption */}
      <div className="py-4 px-4">
        <p className="text-sm font-bold text-slate-800">"{video.description}"</p>
        <p className="text-xs font-bold text-blue-600 mt-1 uppercase">{video.views}</p>
      </div>
    </div>
  );
}
