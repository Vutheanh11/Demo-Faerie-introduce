"use client";

import { useEffect, useRef, useState } from "react";

export type MemberDetails = {
  name: string;
  fullName?: string;
  title: string;
  facebookUrl?: string;
  introduction?: string;
  birthDate?: string;
  interests?: string;
  message?: string;
};

function facebookLink(value?: string) {
  if (!value) return null;
  try {
    const url = new URL(value);
    const host = url.hostname.toLowerCase();
    return url.protocol === "https:" &&
      (host === "facebook.com" || host.endsWith(".facebook.com") || host === "fb.com" || host === "fb.me")
      ? url.href
      : null;
  } catch {
    return null;
  }
}

export default function MemberProfileDialog({
  member,
  photo,
  year,
  onDismiss,
}: {
  member: MemberDetails;
  photo?: string;
  year: number;
  onDismiss: () => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const backdropPressed = useRef(false);
  const [isClosing, setIsClosing] = useState(false);
  const fullName = member.fullName || member.name;
  const facebook = facebookLink(member.facebookUrl);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const trigger = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const originalOverflow = document.body.style.overflow;
    const originalPadding = document.body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${parseFloat(getComputedStyle(document.body).paddingRight) + scrollbarWidth}px`;
    }
    dialog.showModal();
    closeButtonRef.current?.focus({ preventScroll: true });

    return () => {
      dialog.close();
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPadding;
      if (trigger?.isConnected) trigger.focus({ preventScroll: true });
    };
  }, []);

  useEffect(() => {
    if (!isClosing) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timeout = window.setTimeout(onDismiss, reducedMotion ? 0 : 220);
    return () => window.clearTimeout(timeout);
  }, [isClosing, onDismiss]);

  return (
    <dialog
      ref={dialogRef}
      className={`member-profile-dialog${isClosing ? " is-closing" : ""}`}
      aria-labelledby="member-profile-name"
      onKeyDown={(event) => {
        if (event.key !== "Tab") return;
        const controls = Array.from(event.currentTarget.querySelectorAll<HTMLElement>(
          'button:not([disabled]), a[href], [tabindex="0"]',
        ));
        const first = controls[0];
        const last = controls[controls.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus({ preventScroll: true });
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus({ preventScroll: true });
        }
      }}
      onCancel={(event) => {
        event.preventDefault();
        setIsClosing(true);
      }}
      onPointerDown={(event) => {
        backdropPressed.current = event.target === event.currentTarget;
      }}
      onPointerUp={(event) => {
        if (backdropPressed.current && event.target === event.currentTarget) setIsClosing(true);
        backdropPressed.current = false;
      }}
    >
      <div className="member-profile-panel">
        <button
          ref={closeButtonRef}
          type="button"
          className="member-profile-close"
          aria-label="Đóng hồ sơ thành viên"
          onClick={() => setIsClosing(true)}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="m6 6 12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.8" />
          </svg>
        </button>

        <div className="member-profile-portrait">
          {photo ? (
            <img src={photo} alt={`Ảnh của ${fullName}`} />
          ) : (
            <span className="member-profile-initials" aria-hidden="true">
              {fullName.split(" ").slice(-2).map((part) => part[0]).join("")}
            </span>
          )}
          <span className="member-profile-year">FAERIE / {year}</span>
        </div>

        <div className="member-profile-info">
          <p className="member-profile-kicker">MEET THE FAMILY <span aria-hidden="true">✦</span></p>
          <h2 id="member-profile-name">{fullName}</h2>
          <p className="member-profile-role">{member.title}</p>

          <section className="member-profile-section" aria-labelledby="member-profile-intro-heading">
            <h3 id="member-profile-intro-heading">Giới thiệu</h3>
            <p className={!member.introduction?.trim() ? "member-profile-pending" : undefined}>
              {member.introduction?.trim() || "Đang cập nhật"}
            </p>
          </section>

          <div className="member-profile-details">
            <section className="member-profile-section" aria-labelledby="member-profile-birth-heading">
              <h3 id="member-profile-birth-heading">Ngày sinh</h3>
              <p className={!member.birthDate?.trim() ? "member-profile-pending" : undefined}>{member.birthDate?.trim() || "Đang cập nhật"}</p>
            </section>
            <section className="member-profile-section" aria-labelledby="member-profile-interests-heading">
              <h3 id="member-profile-interests-heading">Sở thích</h3>
              <p className={!member.interests?.trim() ? "member-profile-pending" : undefined}>{member.interests?.trim() || "Đang cập nhật"}</p>
            </section>
          </div>

          <section className="member-profile-section" aria-labelledby="member-profile-message-heading">
            <h3 id="member-profile-message-heading">Thông điệp</h3>
            <p className={!member.message?.trim() ? "member-profile-pending" : undefined}>{member.message?.trim() || "Đang cập nhật"}</p>
          </section>

          <section className="member-profile-section" aria-labelledby="member-profile-facebook-heading">
            <h3 id="member-profile-facebook-heading">Facebook</h3>
            {facebook ? (
              <a className="member-profile-facebook" href={facebook} target="_blank" rel="noopener noreferrer">
                Xem trang cá nhân <span aria-hidden="true">↗</span>
                <span className="sr-only"> của {fullName} (mở trong tab mới)</span>
              </a>
            ) : (
              <p className="member-profile-pending">Đang cập nhật</p>
            )}
          </section>
        </div>
      </div>
    </dialog>
  );
}
