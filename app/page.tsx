"use client";

import { useEffect, useMemo, useState } from "react";

type Tab = "Introduce" | "members" | "top20";
type EventYear = 2024 | 2025 | 2026;
type RosterYear = 2023 | 2024 | 2025 | 2026;
type TopYear = 2023 | 2024 | 2025;
type MemberGroup = "Mentor" | "Supporter" | "Leadership" | "Member";

type MemberProfile = {
  name: string;
  title: string;
  group: MemberGroup;
};

const eventsByYear: Record<EventYear, Array<{
  date: string;
  year: string;
  title: string;
  description: string;
  tag: string;
  location: string;
  tone: string;
  images?: string[];
}>> = {
  2024: [],
  2025: [],
  2026: [
    {
      date: "02.07",
      year: "2026",
      title: "Kick Off",
      description:
        "Cột mốc mở đầu hành trình Faerie 2026 — gặp gỡ đội ngũ điều hành, thống nhất tinh thần và cùng nhau viết chương đầu tiên.",
      tag: "Opening",
      location: "FPTU HCMC Campus",
      tone: "mint",
      images: [
        "/images/events/2026/kickoff/KickOff2026.jpg",
        "/images/events/2026/kickoff/KickOff2026_1.jpg",
        "/images/events/2026/kickoff/KickOff2026_2.jpg",
        "/images/events/2026/kickoff/KickOff2026_3.jpg",
        "/images/events/2026/kickoff/KickOff2026_4.jpg",
        "/images/events/2026/kickoff/KickOff2026_5.jpg",
        "/images/events/2026/kickoff/KickOff2026_6.jpg",
      ],
    },
    {
      date: "15.07",
      year: "2026",
      title: "Họp Offline lần đầu",
      description:
        "Buổi gặp mặt trực tiếp đầu tiên của cả nhà, nơi những cái tên trên màn hình trở thành bạn bè và những kế hoạch bắt đầu thành hình.",
      tag: "Meet up",
      location: "TP.HCM",
      tone: "fern",
    },
  ],
};

const roster2023: MemberProfile[] = [
  { name: "Nguyễn Thành Phát", title: "Mentor", group: "Mentor" },
  { name: "Lý Quốc Lâm", title: "Supporter", group: "Supporter" },
  { name: "Trần Mai", title: "Leader Nhà", group: "Leadership" },
  { name: "Vũ Thế Anh", title: "Sub Leader Nhà", group: "Leadership" },
  { name: "Trần Văn Quỳnh", title: "Sub Leader Ban Văn Hóa", group: "Leadership" },
  { name: "Cao Minh Thư", title: "Sub Leader Ban Văn Hóa", group: "Leadership" },
  { name: "Trần Thu Anh", title: "Leader Ban Media", group: "Leadership" },
  { name: "Trịnh Hoàng Khang", title: "Leader Ban Kỹ Thuật", group: "Leadership" },
  { name: "Lê Thùy Dương", title: "Leader Ban Nghệ Thuật", group: "Leadership" },
  { name: "Vương Nguyễn Hồng Linh", title: "Sub Leader Ban Event", group: "Leadership" },
  { name: "Dương Nguyễn Đông Quân", title: "Member", group: "Member" },
  { name: "Lê Ngọc Trang", title: "Member", group: "Member" },
  { name: "Nguyễn Ngọc Huy", title: "Member", group: "Member" },
  { name: "Lưu Trí Tâm", title: "Member", group: "Member" },
  { name: "Nguyễn Quốc Huy", title: "Member", group: "Member" },
  { name: "Huỳnh Như Ý", title: "Member", group: "Member" },
  { name: "Triệu Trần Như Huỳnh", title: "Member", group: "Member" },
  { name: "Huỳnh Thị Trang Tường", title: "Member", group: "Member" },
  { name: "Đồng Thành Đạt", title: "Member", group: "Member" },
  { name: "Trương Thảo Vi", title: "Member", group: "Member" },
  { name: "Phạm Thị Thu Hằng", title: "Member", group: "Member" },
  { name: "Nguyễn Gia Linh", title: "Member", group: "Member" },
  { name: "Nguyễn Võ Gia Hiếu", title: "Member", group: "Member" },
  { name: "Lê Võ Gia Bảo", title: "Member", group: "Member" },
  { name: "Võ Khôi Nguyên", title: "Member", group: "Member" },
  { name: "Huỳnh Quốc Bảo", title: "Member", group: "Member" },
  { name: "Đặng Tiến Hưng", title: "Member", group: "Member" },
  { name: "Hoàng Văn Đức Nhân", title: "Member", group: "Member" },
  { name: "Nguyễn Thanh Nhật Tân", title: "Member", group: "Member" },
  { name: "Nguyễn Thành Nhân", title: "Member", group: "Member" },
  { name: "Phou Mảu Quang", title: "Member", group: "Member" },
  { name: "Hoàng Thị Quỳnh Lan", title: "Member", group: "Member" },
  { name: "Trần Nhất Huy", title: "Member", group: "Member" },
  { name: "Lê Hoàng Phước", title: "Member", group: "Member" },
  { name: "Nguyễn Hoàng Bảo Oanh", title: "Member", group: "Member" },
];

const roster2024: MemberProfile[] = [
  { name: "Hoàng Đinh Anh Quốc", title: "Mentor", group: "Mentor" },
  { name: "Nguyễn Hoàng Đức Phương", title: "Supporter", group: "Supporter" },
  { name: "Trần Mai", title: "Leader Nhà", group: "Leadership" },
  { name: "Vũ Thế Anh", title: "Sub Leader Nhà", group: "Leadership" },
  { name: "Trần Văn Quỳnh", title: "Sub Leader Ban Văn Hóa", group: "Leadership" },
  { name: "Cao Minh Thư", title: "Sub Leader Ban Văn Hóa", group: "Leadership" },
  { name: "Trần Thu Anh", title: "Leader Ban Media", group: "Leadership" },
  { name: "Trịnh Hoàng Khang", title: "Leader Ban Kỹ Thuật", group: "Leadership" },
  { name: "Lê Thùy Dương", title: "Leader Ban Nghệ Thuật", group: "Leadership" },
  { name: "Vương Nguyễn Hồng Linh", title: "Sub Leader Ban Event", group: "Leadership" },
  { name: "Dương Nguyễn Đông Quân", title: "Member", group: "Member" },
  { name: "Lê Ngọc Trang", title: "Member", group: "Member" },
  { name: "Nguyễn Ngọc Huy", title: "Member", group: "Member" },
  { name: "Lưu Trí Tâm", title: "Member", group: "Member" },
  { name: "Nguyễn Quốc Huy", title: "Member", group: "Member" },
  { name: "Huỳnh Như Ý", title: "Member", group: "Member" },
  { name: "Triệu Trần Như Huỳnh", title: "Member", group: "Member" },
  { name: "Huỳnh Thị Trang Tường", title: "Member", group: "Member" },
  { name: "Đồng Thành Đạt", title: "Member", group: "Member" },
  { name: "Trương Thảo Vi", title: "Member", group: "Member" },
  { name: "Phạm Thị Thu Hằng", title: "Member", group: "Member" },
  { name: "Nguyễn Gia Linh", title: "Member", group: "Member" },
  { name: "Nguyễn Võ Gia Hiếu", title: "Member", group: "Member" },
  { name: "Lê Võ Gia Bảo", title: "Member", group: "Member" },
  { name: "Võ Khôi Nguyên", title: "Member", group: "Member" },
  { name: "Huỳnh Quốc Bảo", title: "Member", group: "Member" },
  { name: "Đặng Tiến Hưng", title: "Member", group: "Member" },
  { name: "Hoàng Văn Đức Nhân", title: "Member", group: "Member" },
  { name: "Nguyễn Thanh Nhật Tân", title: "Member", group: "Member" },
  { name: "Nguyễn Thành Nhân", title: "Member", group: "Member" },
  { name: "Phou Mảu Quang", title: "Member", group: "Member" },
  { name: "Hoàng Thị Quỳnh Lan", title: "Member", group: "Member" },
  { name: "Trần Nhất Huy", title: "Member", group: "Member" },
  { name: "Lê Hoàng Phước", title: "Member", group: "Member" },
  { name: "Nguyễn Hoàng Bảo Oanh", title: "Member", group: "Member" },
];


const roster2025: MemberProfile[] = [
  { name: "Phùng Duy Tuấn", title: "Mentor", group: "Mentor" },
  { name: "Hạ My", title: "Supporter", group: "Supporter" },
  { name: "Lê Thị Khánh Linh", title: "Leader Nhà", group: "Leadership" },
  { name: "Yến Khoa", title: "Leader Event", group: "Leadership" },
  { name: "Bảo Anh", title: "Member", group: "Leadership" },
  { name: "Thành Hoàng", title: "Member", group: "Leadership" },
  { name: "Thanh Tú", title: "Leader Ban Nghệ thuật", group: "Leadership" },
  { name: "Thanh Diệu", title: "Member", group: "Leadership" },
  { name: "Lê Thùy Dương", title: "Leader Ban Nghệ Thuật", group: "Leadership" },
  { name: "Nguyễn Quang Tâm", title: "Member", group: "Leadership" },
  { name: "Mai Văn Trân", title: "Member", group: "Member" },
  { name: "Nguyễn Kim Ngọc", title: "Member", group: "Member" },
  { name: "Quang Giáp", title: "Member", group: "Member" },
  { name: "Nguyễn Giang", title: "Member", group: "Member" },
  { name: "Phùng Minh Phan", title: "Member", group: "Member" },
  { name: "Trương Thảo Vi", title: "Member", group: "Member" },
  { name: "Nguyễn Vũ Ánh Hồng", title: "Member", group: "Member" },
  { name: "Adela Nguyễn", title: "Member", group: "Member" },
  { name: "Nguyễn Thế Trường", title: "Member", group: "Member" },
  { name: "Phan Nguyễn LyNa", title: "Member", group: "Member" },
  { name: "Nguyễn Hồ Tú Quyên", title: "Member", group: "Member" },
  { name: "Nhật Minh", title: "Member", group: "Member" },
  { name: "Phạm Chiến", title: "Member", group: "Member" },
  { name: "Minh Ánh", title: "Member", group: "Member" },
  { name: "Trần Khánh Như", title: "Member", group: "Member" },
  { name: "Khoai Lang", title: "Member", group: "Member" },
  { name: "Nguyễn Hồ Hải Anh", title: "Member", group: "Member" },
  { name: "Nguyễn Trọng Thuận", title: "Member", group: "Member" },
  { name: "Nguyễn Hoàng", title: "Member", group: "Member" },
  { name: "Nguyễn Thành Nhân", title: "Member", group: "Member" },
  { name: "Phou Mảu Quang", title: "Member", group: "Member" },
  { name: "Hoàng Thị Quỳnh Lan", title: "Member", group: "Member" },
  { name: "Trần Nhất Huy", title: "Member", group: "Member" },
  { name: "Lê Hoàng Phước", title: "Member", group: "Member" },
  { name: "Nguyễn Hoàng Bảo Oanh", title: "Member", group: "Member" },
];


function makeMockRoster(names: string[]): MemberProfile[] {
  return names.map((name, index) => {
    if (index === 0) return { name, title: "Mentor", group: "Mentor" };
    if (index === 1) return { name, title: "Supporter", group: "Supporter" };
    if (index === 2) return { name, title: "Leader Nhà", group: "Leadership" };
    return { name, title: "Member", group: "Member" };
  });
}

const roster2026: MemberProfile[] = [
  { name: "Việt Phương", title: "Mentor", group: "Mentor" },
  { name: "Hạ My", title: "Supporter", group: "Supporter" },
  { name: "Phạm Lê Ý Linh", title: "Leader Nhà", group: "Leadership" },
  { name: "Vũ Thế Anh", title: "Sub Leader Nhà", group: "Leadership" },
  { name: "Trần Văn Quỳnh", title: "Sub Leader Ban Văn Hóa", group: "Leadership" },
  { name: "Cao Minh Thư", title: "Sub Leader Ban Văn Hóa", group: "Leadership" },
  { name: "Trần Thu Anh", title: "Leader Ban Media", group: "Leadership" },
  { name: "Trịnh Hoàng Khang", title: "Leader Ban Kỹ Thuật", group: "Leadership" },
  { name: "Lê Thùy Dương", title: "Leader Ban Nghệ Thuật", group: "Leadership" },
  { name: "Vương Nguyễn Hồng Linh", title: "Sub Leader Ban Event", group: "Leadership" },
  { name: "Dương Nguyễn Đông Quân", title: "Member", group: "Member" },
  { name: "Lê Ngọc Trang", title: "Member", group: "Member" },
  { name: "Nguyễn Ngọc Huy", title: "Member", group: "Member" },
  { name: "Lưu Trí Tâm", title: "Member", group: "Member" },
  { name: "Nguyễn Quốc Huy", title: "Member", group: "Member" },
  { name: "Huỳnh Như Ý", title: "Member", group: "Member" },
  { name: "Triệu Trần Như Huỳnh", title: "Member", group: "Member" },
  { name: "Huỳnh Thị Trang Tường", title: "Member", group: "Member" },
  { name: "Đồng Thành Đạt", title: "Member", group: "Member" },
  { name: "Trương Thảo Vi", title: "Member", group: "Member" },
  { name: "Phạm Thị Thu Hằng", title: "Member", group: "Member" },
  { name: "Nguyễn Gia Linh", title: "Member", group: "Member" },
  { name: "Nguyễn Võ Gia Hiếu", title: "Member", group: "Member" },
  { name: "Lê Võ Gia Bảo", title: "Member", group: "Member" },
  { name: "Võ Khôi Nguyên", title: "Member", group: "Member" },
  { name: "Huỳnh Quốc Bảo", title: "Member", group: "Member" },
  { name: "Đặng Tiến Hưng", title: "Member", group: "Member" },
  { name: "Hoàng Văn Đức Nhân", title: "Member", group: "Member" },
  { name: "Nguyễn Thanh Nhật Tân", title: "Member", group: "Member" },
  { name: "Nguyễn Thành Nhân", title: "Member", group: "Member" },
  { name: "Phou Mảu Quang", title: "Member", group: "Member" },
  { name: "Hoàng Thị Quỳnh Lan", title: "Member", group: "Member" },
  { name: "Trần Nhất Huy", title: "Member", group: "Member" },
  { name: "Lê Hoàng Phước", title: "Member", group: "Member" },
  { name: "Nguyễn Hoàng Bảo Oanh", title: "Member", group: "Member" },
];

const rosters: Record<RosterYear, MemberProfile[]> = {
  2023: roster2023,
  2024: roster2024,
  2025: roster2025,
  2026: roster2026,
};

const totalMembers = Object.values(rosters).reduce((total, roster) => total + roster.length, 0);

const groupOrder: MemberGroup[] = ["Mentor", "Supporter", "Leadership", "Member"];
const groupLabels: Record<MemberGroup, string> = {
  Mentor: "Mentor",
  Supporter: "Supporter",
  Leadership: "Ban điều hành",
  Member: "Member",
};

function makeRanking(roster: MemberProfile[], limit: number) {
  return roster.slice(0, limit).map((person, index) => ({
    ...person,
    rank: index + 1,
  }));
}

const topByYear = {
  2023: makeRanking(roster2023, 20),
  2024: makeRanking(roster2024, 12),
  2025: makeRanking(roster2025, 8),
} satisfies Record<TopYear, ReturnType<typeof makeRanking>>;

const memberPhotos: Partial<Record<RosterYear, Record<string, string>>> = {
  2025: {
    "Phùng Duy Tuấn": "/images/members/2025/PhungDinhTuan.jpg",
    "Hạ My": "/images/members/2025/HaMy.jpg",
    "Thành Hoàng": "/images/members/2025/ThanhHoang.jpg",
    "Nguyễn Quang Tâm": "/images/members/2025/NguyenQuangTam.jpg",
    "Mai Văn Trân": "/images/members/2025/MaiVanTran.jpg",
  },
  2026: {
    "Việt Phương": "/images/members/2026/VietPhuong.jpg",
    "Hạ My": "/images/members/2026/HaMy.jpg",
  },
};

function memberPhoto(year: RosterYear, name: string) {
  return memberPhotos[year]?.[name];
}

function initials(name: string) {
  const parts = String(name ?? "").trim().split(" ");
  return `${parts[parts.length - 2]?.[0] ?? ""}${parts[parts.length - 1]?.[0] ?? ""}`;
}

const avatarTones = ["sage", "sun", "sky", "lilac", "coral", "lime"];

export default function Home() {
  const [tab, setTab] = useState<Tab>("Introduce");
  const [year, setYear] = useState<RosterYear>(2026);
  const [eventYear, setEventYear] = useState<EventYear>(2026);
  const [topYear, setTopYear] = useState<TopYear>(2025);
  const [role, setRole] = useState<MemberGroup | "All">("All");
  const [query, setQuery] = useState("");
  const [scrollProgress, setScrollProgress] = useState(0);

  const topMembers = topByYear[topYear];

  useEffect(() => {
    let frame = 0;

    const updateProgress = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        const scrollable = document.documentElement.scrollHeight - window.innerHeight;
        setScrollProgress(scrollable > 0 ? Math.min(1, window.scrollY / scrollable) : 0);
      });
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, [tab]);

  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      nodes.forEach((node) => node.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -6%" },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [tab, eventYear, year, role, query, topYear]);

  const members = useMemo(
    () =>
      rosters[year]
        .map((person, index) => ({ ...person, index }))
        .filter((person) => role === "All" || person.group === role)
        .filter((person) =>
          String(person.name ?? "").toLocaleLowerCase("vi").includes(query.trim().toLocaleLowerCase("vi")),
        ),
    [year, role, query],
  );

  const switchTab = (nextTab: Tab) => {
    setTab(nextTab);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className={`app-shell tab-${tab.toLowerCase()}`}>
      <header className="site-header is-tactical">
        <span className="site-progress" style={{ transform: `scaleX(${scrollProgress})` }} aria-hidden="true" />
        <button className="brand" onClick={() => switchTab("Introduce")} aria-label="Faerie home">
          <span className="brand-mark" aria-hidden="true"><img src="/images/faerie-icon.png" alt="" /></span>
          <span>
            <strong>FAERIE</strong>
            <small>BROSIS · FPTU</small>
          </span>
        </button>

        <nav className="main-nav" aria-label="Điều hướng chính" role="tablist">
          <button
            role="tab"
            aria-selected={tab === "Introduce"}
            className={tab === "Introduce" ? "active" : ""}
            onClick={() => switchTab("Introduce")}
          >
            Introduce <span>02</span>
          </button>
          <button
            role="tab"
            aria-selected={tab === "members"}
            className={tab === "members" ? "active" : ""}
            onClick={() => switchTab("members")}
          >
            Members <span>95</span>
          </button>
          <button
            role="tab"
            aria-selected={tab === "top20"}
            className={tab === "top20" ? "active" : ""}
            onClick={() => switchTab("top20")}
          >
            Top 20 <span>★</span>
          </button>
        </nav>

        <div className="header-note">EST. 2024 · TP.HCM</div>
      </header>

      {tab === "Introduce" ? (
        <div role="tabpanel" className="valorant-intro page-enter">
          <section className="v-hero" aria-labelledby="faerie-hero-title">
            <img
              className="v-hero-background"
              src="/images/faerie-banner.jpg"
              alt="Các thành viên nhà Faerie chụp ảnh cùng nhau tại FPTU HCMC"
            />
            <div className="v-hero-wash" aria-hidden="true" />
            <div className="v-grid" aria-hidden="true" />
            <span className="v-coordinate v-coordinate-top" aria-hidden="true">10°50&apos;N / 106°40&apos;E</span>
            <span className="v-coordinate v-coordinate-side" aria-hidden="true">FAERIE // FPTU HCMC // 2026</span>

            <div className="v-hero-content section-shell">
              <p className="v-kicker"><span>01</span> Brothers &amp; Sisters · FPTU HCMC</p>
              <h1 id="faerie-hero-title">
                <span>FIND</span>
                <span className="v-title-accent">YOUR</span>
                <span>PEOPLE.</span>
              </h1>
              <div className="v-hero-bottom">
                <p>
                  Faerie là nơi mỗi tân sinh viên tìm thấy một người đồng hành,
                  một đội để sát cánh và một mái nhà để luôn muốn quay về.
                </p>
                <div className="v-actions">
                  <button className="v-button" onClick={() => switchTab("members")}>
                    <span>Gặp nhà Faerie</span><b aria-hidden="true">↗</b>
                  </button>
                  <a className="v-text-link" href="#events">Khám phá hành trình <span aria-hidden="true">↓</span></a>
                </div>
              </div>
            </div>

            <div className="v-hero-wordmark" aria-hidden="true">FAERIE</div>
            <a className="v-scroll-cue" href="#mission" aria-label="Cuộn đến câu chuyện Faerie">
              <span>SCROLL TO DISCOVER</span><i aria-hidden="true" />
            </a>
          </section>

          <section className="v-signal" id="mission" aria-label="Những con số của Faerie">
            <div className="v-signal-lead"><span aria-hidden="true">✦</span> ONE HOUSE. MANY STORIES.</div>
            <div><small>THẾ HỆ</small><strong>03</strong><span>tiếp nối</span></div>
            <div><small>THÀNH VIÊN</small><strong>{totalMembers}</strong><span>mảnh ghép</span></div>
            <div><small>NĂM 2026</small><strong>02</strong><span>hoạt động</span></div>
          </section>

          <section className="v-events section-shell" id="events">
            <div className="v-section-index" aria-hidden="true"><span>02</span><i /></div>
            <div className="v-section-heading" data-reveal>
              <div>
                <p className="v-kicker"><span>STORIES</span> What&apos;s happening</p>
                <h2>FAERIE<br /><em>STORY</em></h2>
              </div>
              <p>
                Mỗi sự kiện là một tọa độ trong hành trình chung — nơi chúng mình gặp gỡ,
                thử sức và biến những ngày bình thường thành ký ức đáng nhớ.
              </p>
            </div>

            <div className="v-year-tabs" aria-label="Chọn năm sự kiện" role="tablist" data-reveal>
              {([2024, 2025, 2026] as EventYear[]).map((item) => (
                <button
                  key={item}
                  role="tab"
                  aria-selected={eventYear === item}
                  className={eventYear === item ? "active" : ""}
                  onClick={() => setEventYear(item)}
                >
                  <span>{item}</span>
                  <small>{eventsByYear[item].length.toString().padStart(2, "0")} stories</small>
                </button>
              ))}
            </div>

            {eventsByYear[eventYear].length > 0 ? (
              <div className="v-event-grid">
                {eventsByYear[eventYear].map((event, index) => (
                  <article
                    className={`v-event-card ${index === 0 ? "featured" : ""}`}
                    key={`${eventYear}-${event.title}`}
                    data-reveal
                    style={{ transitionDelay: `${index * 90}ms` }}
                  >
                    <div className={`v-event-media ${event.tone} ${event.images ? "has-photos" : ""}`}>
                      {event.images ? (
                        <div className="event-photo-gallery">
                          {event.images.map((image, imageIndex) => (
                            <img
                              key={image}
                              src={image}
                              alt={`Ảnh ${event.title} ${event.year} số ${imageIndex + 1}`}
                              loading={imageIndex === 0 ? "eager" : "lazy"}
                            />
                          ))}
                        </div>
                      ) : (
                        <div className="v-event-symbol" aria-hidden="true">{index === 0 ? "✦" : "∞"}</div>
                      )}
                      <span className="v-event-number">// 0{index + 1}</span>
                      <span className="v-event-tag">{event.tag}</span>
                      <span className="v-corner" aria-hidden="true" />
                    </div>
                    <div className="v-event-copy">
                      <div className="v-event-date"><strong>{event.date}</strong><span>{event.year}</span></div>
                      <div>
                        <h3>{event.title}</h3>
                        <p>{event.description}</p>
                        <small><span aria-hidden="true">⌖</span> {event.location}</small>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="v-event-empty">
                <span aria-hidden="true">// {eventYear}</span>
                <div><strong>MISSION NOT STARTED</strong><p>Chuyện năm {eventYear} đang được viết. Hẹn gặp bạn ở cột mốc tiếp theo.</p></div>
              </div>
            )}
          </section>

          <section className="v-about section-shell">
            <div className="v-about-word" aria-hidden="true">TOGETHER</div>
            <div className="v-about-copy" data-reveal>
              <p className="v-kicker"><span>03</span> Our mission</p>
              <h2>KHÔNG CHỈ<br />LÀ NGƯỜI<br /><em>DẪN ĐƯỜNG.</em></h2>
              <p className="v-about-lead">
                Brothers &amp; Sisters kết nối những người đi trước với tân sinh viên trong những ngày đầu tại FPTU.
                Ở Faerie, sự đồng hành đi xa hơn một lời chỉ dẫn: đó là học cùng, chơi cùng và lớn lên cùng nhau.
              </p>
            </div>

            <div className="v-about-visual" aria-label="Khoảnh khắc của các thành viên Faerie" data-reveal>
              <figure className="v-photo-main">
                <img src="/images/events/2026/kickoff/KickOff2026_1.jpg" alt="Thành viên Faerie tại sự kiện Kick Off 2026" loading="lazy" />
                <figcaption>FAERIE KICK OFF // 2026</figcaption>
              </figure>
              <figure className="v-photo-mini">
                <img src="/images/events/2026/kickoff/KickOff2026_4.jpg" alt="Khoảnh khắc kết nối của nhà Faerie" loading="lazy" />
              </figure>
              <span className="v-photo-code" aria-hidden="true">FÆ / 03 — 26</span>
            </div>

            <div className="v-values" aria-label="Giá trị của Faerie" data-reveal>
              <div><span>01</span><strong>BELONGING</strong><p>Một nơi để thuộc về.</p></div>
              <div><span>02</span><strong>GROWTH</strong><p>Cùng nhau tiến bộ.</p></div>
              <div><span>03</span><strong>KINDNESS</strong><p>Tử tế trong mọi kết nối.</p></div>
              <div><span>04</span><strong>LEGACY</strong><p>Tiếp nối điều tốt đẹp.</p></div>
            </div>
          </section>

          <section className="v-manifesto">
            <img src="/images/events/2026/kickoff/KickOff2026_6.jpg" alt="Các thành viên Faerie cùng nhau trong hoạt động năm 2026" loading="lazy" />
            <div className="v-manifesto-wash" aria-hidden="true" />
            <div className="v-manifesto-copy section-shell" data-reveal>
              <p className="v-kicker"><span>04</span> Ready for the next chapter?</p>
              <blockquote>GROW TOGETHER.<br /><em>SHINE TOGETHER.</em></blockquote>
              <button className="v-button v-button-light" onClick={() => switchTab("members")}>
                <span>Khám phá thành viên</span><b aria-hidden="true">→</b>
              </button>
            </div>
            <span className="v-manifesto-code" aria-hidden="true">FAERIE // BROSIS // FPTU HCMC</span>
          </section>
        </div>
      ) : tab === "members" ? (
        <div role="tabpanel" className="members-page tactical-page valorant-members page-enter">
          <section className="members-hero tactical-hero section-shell">
            <div className="tactical-grid" aria-hidden="true" />
            <div className="tactical-hero-word" aria-hidden="true">MEMBERS</div>
            <span className="tactical-coordinate" aria-hidden="true">03 // ROSTER DATABASE // FPTU HCMC</span>
            <div className="members-hero-copy">
              <p className="tactical-kicker"><span>01</span> The people behind the magic</p>
              <h1>MEET THE<br /><em>FAERIE FAMILY.</em></h1>
            </div>
            <div className="members-intro" data-reveal>
              <p>
                Mỗi thế hệ là một màu sắc riêng, cùng góp lại thành câu chuyện Faerie.
                Tìm những gương mặt đã đồng hành với ngôi nhà qua từng năm.
              </p>
              <div className="members-stat"><strong>{totalMembers}</strong><span>members<br />&amp; growing</span></div>
            </div>

          </section>

          <section className="directory tactical-directory section-shell">
            <div className="tactical-section-heading" data-reveal>
              <div>
                <p className="tactical-kicker"><span>02</span> Select your roster</p>
                <h2>CHOOSE YOUR<br /><em>CREW.</em></h2>
              </div>
              <p>Tìm kiếm từng gương mặt, vai trò và thế hệ đã cùng tạo nên hành trình Faerie.</p>
            </div>

            <div className="directory-toolbar" data-reveal>
              <div className="year-picker" aria-label="Chọn năm">
                {([2023, 2024, 2025, 2026] as RosterYear[]).map((item) => (
                  <button
                    key={item}
                    className={year === item ? "active" : ""}
                    onClick={() => { setYear(item); setRole("All"); }}
                    aria-pressed={year === item}
                  >
                    Roster {item} <span>{year === item ? "✦" : ""}</span>
                  </button>
                ))}
              </div>

              <label className="search-box">
                <span className="sr-only">Tìm thành viên</span>
                <span aria-hidden="true">⌕</span>
                <input
                  type="search"
                  placeholder="Tìm thành viên..."
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                />
              </label>
            </div>

            <div className="role-filter" aria-label="Lọc theo vai trò" data-reveal>
              <button className={role === "All" ? "active" : ""} onClick={() => setRole("All")}>
                Tất cả <span>{rosters[year].length}</span>
              </button>
              {groupOrder.map((item) => (
                <button key={item} className={role === item ? "active" : ""} onClick={() => setRole(item)}>
                  {groupLabels[item]} <span>{rosters[year].filter((person) => person.group === item).length}</span>
                </button>
              ))}
            </div>

            <div className="directory-title" data-reveal>
              <h2>Faerie class of <em>{year}</em></h2>
              <span>{members.length.toString().padStart(2, "0")} kết quả</span>
            </div>

            {members.length > 0 ? (
              <div className="member-grid">
                {members.map((person) => (
                  <article
                    className="member-card"
                    key={`${year}-${person.name}`}
                    data-reveal
                    style={{ transitionDelay: `${Math.min(person.index % 8, 7) * 45}ms` }}
                  >
                    <button
                      type="button"
                      className="member-card-button"
                      aria-label={`Xem vai trò của ${person.name}: ${person.title}`}
                    >
                      <div className="member-card-inner">
                        <div className="member-card-face member-card-front">
                          <div className={`avatar ${memberPhoto(year, person.name) ? "has-photo" : avatarTones[person.index % avatarTones.length]}`}>
                            {memberPhoto(year, person.name) ? (
                              <img src={memberPhoto(year, person.name)} alt={`Ảnh của ${person.name}`} loading="lazy" />
                            ) : (
                              <span>{initials(person.name)}</span>
                            )}
                            <small>{(person.index + 1).toString().padStart(2, "0")}</small>
                          </div>
                          <div className="member-front-info">
                            <strong>{person.name}</strong>
                            <span>Faerie · Roster {year} <i aria-hidden="true">↻</i></span>
                          </div>
                        </div>

                        <div className={`member-card-face member-card-back ${person.group.toLowerCase()}`}>
                          <span className="member-back-kicker">ROLE / {groupLabels[person.group]}</span>
                          <i aria-hidden="true">✦</i>
                          <strong className="member-back-role">{person.title}</strong>
                          <span className="member-back-name">{person.name}</span>
                          <small>FAERIE · {year}</small>
                        </div>
                      </div>
                    </button>
                  </article>
                ))}
              </div>
            ) : (
              <div className="empty-state"><span>✦</span><h3>Chưa tìm thấy thành viên</h3><p>Thử một tên hoặc vai trò khác nhé.</p></div>
            )}
          </section>
        </div>
      ) : (
        <div role="tabpanel" className="top-page tactical-page valorant-top page-enter">
          <section className="top-hero tactical-hero section-shell">
            <div className="tactical-grid" aria-hidden="true" />
            <div className="tactical-hero-word" aria-hidden="true">TOP {topMembers.length}</div>
            <span className="tactical-coordinate" aria-hidden="true">04 // HALL OF FAME // {topYear}</span>
            <div className="top-hero-copy">
              <p className="tactical-kicker"><span>01</span> Faerie outstanding brosis · {topYear}</p>
              <h1>TOP <em>{topMembers.length}</em><br />SHINING SOULS.</h1>
              <div className="top-year-tabs" role="tablist" aria-label="Chọn năm bảng thành viên xuất sắc">
                {([2023, 2024, 2025] as TopYear[]).map((item) => (
                  <button
                    key={item}
                    role="tab"
                    aria-selected={topYear === item}
                    className={topYear === item ? "active" : ""}
                    onClick={() => setTopYear(item)}
                  >
                    <strong>{item}</strong>
                    <span>Top {topByYear[item].length}</span>
                  </button>
                ))}
              </div>
              <p>
                Những gương mặt nổi bật trên hành trình kết nối, sẻ chia và tạo nên năng lượng
                cho nhà Faerie năm {topYear}, cùng nhau lan tỏa tinh thần Brothers &amp; Sisters tại FPTU HCMC.
              </p>
            </div>
            <div className="champion-card" data-reveal>
              <span className="champion-rank">#01</span>
              <div className={`champion-avatar ${memberPhoto(topYear, topMembers[0].name) ? "has-photo" : ""}`}>
                {memberPhoto(topYear, topMembers[0].name) ? (
                  <img src={memberPhoto(topYear, topMembers[0].name)} alt={`Ảnh của ${topMembers[0].name}`} />
                ) : initials(topMembers[0].name)}
              </div>
              <small>LEADING THE MAGIC</small>
              <h2>{topMembers[0].name}</h2>
              <p>{topMembers[0].title}</p>
            </div>
          </section>

          <section className="leaderboard tactical-leaderboard section-shell">
            <div className="leaderboard-heading" data-reveal>
              <div>
                <p className="tactical-kicker"><span>02</span> Faerie Hall of Fame · {topYear}</p>
                <h2>BROSIS XUẤT SẮC <em>{topYear}</em></h2>
              </div>
              <p>{topMembers.length} gương mặt nổi bật · Faerie Gen {topYear}</p>
            </div>

            <div className="leaderboard-table" role="table" aria-label={`Top ${topMembers.length} brosis xuất sắc năm ${topYear}`}>
              <div className="leaderboard-row leaderboard-labels" role="row">
                <span>Hạng</span><span>Thành viên</span>
              </div>
              {topMembers.map((person, index) => (
                <article
                  className={`leaderboard-row ${index < 3 ? "podium" : ""}`}
                  role="row"
                  key={`${topYear}-${person.name}`}
                  data-reveal
                  style={{ transitionDelay: `${Math.min(index, 9) * 55}ms` }}
                >
                  <div className="rank-number">{person.rank.toString().padStart(2, "0")}</div>
                  <div className="rank-person">
                    <span className={`rank-avatar ${memberPhoto(topYear, person.name) ? "has-photo" : avatarTones[index % avatarTones.length]}`}>
                      {memberPhoto(topYear, person.name) ? (
                        <img src={memberPhoto(topYear, person.name)} alt={`Ảnh của ${person.name}`} loading="lazy" />
                      ) : initials(person.name)}
                    </span>
                    <div><h3>{person.name}</h3><p>{person.title}</p></div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>
      )}

      <footer className="tactical-footer">
        <div className="footer-brand"><span><img src="/images/faerie-icon.png" alt="" /></span><strong>FAERIE</strong></div>
        <p>Brothers &amp; Sisters · FPT University<br />TP.HCM Campus</p>
        <p className="footer-note">MADE WITH KINDNESS<br />FOR EVERY NEW CHAPTER.</p>
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>Lên đầu trang ↑</button>
      </footer>
    </main>
  );
}
