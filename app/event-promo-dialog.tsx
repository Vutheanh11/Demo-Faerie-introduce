"use client";

import { useEffect, useRef, useState } from "react";

type PromoEvent = {
  title: string;
  description: string;
  date: string;
  year: string;
  location: string;
  tag: string;
  images?: string[];
};

export type PromoSettings = {
  enabled: boolean;
  title: string;
  description: string;
  image: string;
  facebookUrl: string;
};

function facebookLink(value?: string) {
  if (!value) return null;
  try {
    const url = new URL(value);
    const host = url.hostname.toLowerCase();
    return url.protocol === "https:" && (host === "facebook.com" || host.endsWith(".facebook.com") || host === "fb.com" || host === "fb.me") ? url.href : null;
  } catch { return null; }
}

export default function EventPromoDialog({
  event,
  settings,
  onRead,
  onDismiss,
}: {
  event: PromoEvent;
  settings?: PromoSettings | null;
  onRead: () => void;
  onDismiss: () => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [secondsLeft, setSecondsLeft] = useState(3);
  const canDismiss = secondsLeft === 0;
  const title = settings?.title.trim() || event.title;
  const description = settings?.description.trim() || event.description;
  const image = settings ? settings.image : event.images?.[0];
  const facebook = facebookLink(settings?.facebookUrl);
  const sameEvent = title === event.title;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    dialog.showModal();
    return () => {
      if (dialog.open) dialog.close();
      if (previousFocus?.isConnected) previousFocus.focus({ preventScroll: true });
    };
  }, []);

  useEffect(() => {
    if (secondsLeft === 0) return;
    const timer = window.setTimeout(() => setSecondsLeft((seconds) => Math.max(0, seconds - 1)), 1000);
    return () => window.clearTimeout(timer);
  }, [secondsLeft]);

  return (
    <dialog
      ref={dialogRef}
      className="event-promo-dialog"
      aria-labelledby="event-promo-title"
      aria-describedby="event-promo-description"
      onCancel={(event) => {
        event.preventDefault();
        if (canDismiss) onDismiss();
      }}
    >
      <div className="event-promo-layout">
        <div className="event-promo-visual">
          {image ? <img src={image} alt={`Khoảnh khắc từ ${title}`} decoding="async" /> : <span aria-hidden="true">✦</span>}
          <span className="event-promo-image-label">FAERIE / EVENT FILE</span>
        </div>
        <div className="event-promo-content">
          <button
            className="event-promo-close"
            type="button"
            disabled={!canDismiss}
            onClick={onDismiss}
            aria-label={canDismiss ? "Đóng giới thiệu sự kiện" : `Có thể đóng sau ${secondsLeft} giây`}
          >
            {canDismiss ? "Đóng ×" : `Đóng sau ${secondsLeft}s`}
          </button>
          <p className="event-promo-kicker"><span>✦</span> CÂU CHUYỆN FAERIE</p>
          <p className="event-promo-tag">{sameEvent ? <>{event.tag}{" // "}{event.date.replace(".", "/")}/{event.year}</> : "FAERIE // EVENT"}</p>
          <h2 id="event-promo-title">{title}</h2>
          <p id="event-promo-description">{description}</p>
          <div className="event-promo-bottom">
            <span>{sameEvent ? event.location : "FAERIE HOUSE"}</span>
            {facebook ? (
              <a href={facebook} target="_blank" rel="noopener noreferrer">Xem sự kiện trên Facebook <span aria-hidden="true">↗</span></a>
            ) : (
              <button type="button" onClick={onRead}>Xem sự kiện <span aria-hidden="true">↗</span></button>
            )}
          </div>
        </div>
      </div>
    </dialog>
  );
}
