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
  const [heroCardIndex, setHeroCardIndex] = useState(0);
  const [role, setRole] = useState<MemberGroup | "All">("All");
  const [query, setQuery] = useState("");

  const topMembers = topByYear[topYear];

  useEffect(() => {
    if (tab !== "members") return;

    setHeroCardIndex(0);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timer = window.setInterval(() => {
      setHeroCardIndex((current) => (current + 1) % rosters[year].length);
    }, 2000);

    return () => window.clearInterval(timer);
  }, [tab, year]);

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
    <main>
      <header className="site-header">
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
        <div role="tabpanel" className="page-enter">
          <section className="hero section-shell">
            <div className="hero-copy">
              <p className="eyebrow"><span /> Brothers &amp; Sisters · FPTU HCMC Campus</p>
              <h1>Grow together.<br /><em>Shine together.</em></h1>
              <p className="hero-lead">
                Faerie là một mái nhà nhỏ trong đại gia đình Brosis — nơi mỗi tân sinh viên
                đều có người đồng hành, một nhóm để thuộc về và thật nhiều ký ức để mang theo.
              </p>
              <div className="hero-actions">
                <button className="primary-button" onClick={() => switchTab("members")}>
                  Gặp nhà Faerie <span aria-hidden="true">↗</span>
                </button>
                <a href="#events" className="text-link">Xem sự kiện <span aria-hidden="true">↓</span></a>
              </div>
            </div>

            <div className="hero-art" aria-label="Ảnh tập thể nhà Faerie">
              <div className="spark spark-one">✦</div>
              <div className="spark spark-two">✦</div>
              <figure className="hero-photo-card">
                <img src="/images/faerie-banner.jpg" alt="Các thành viên nhà Faerie chụp ảnh cùng nhau tại FPTU HCMC" />
                <figcaption><span>FAERIE&apos;S HOUSE</span><strong>2026</strong></figcaption>
              </figure>
              <div className="round-stamp"><span>35</span>SOULS<br />ONE HOME</div>
            </div>
          </section>

          <section className="stats-strip" aria-label="Faerie highlights">
            <div><strong>03</strong><span>thế hệ tiếp nối</span></div>
            <div><strong>{totalMembers}</strong><span>mảnh ghép Faerie</span></div>
            <div><strong>02</strong><span>hoạt động năm 2026</span></div>
            <p>TOGETHER WE MAKE<br />ORDINARY DAYS MAGIC <b>✦</b></p>
          </section>

          <section className="events section-shell" id="events">
            <div className="section-heading">
              <div>
                <p className="eyebrow"><span /> What's happening</p>
                <h2>Chuyện nhà <em>Faerie</em></h2>
              </div>
              <p>Những cột mốc nhỏ được lưu lại<br />qua từng thế hệ nhà Faerie.</p>
            </div>

            <div className="event-year-tabs" aria-label="Chọn năm sự kiện" role="tablist">
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
              <div className="event-grid two-events">
                {eventsByYear[eventYear].map((event, index) => (
                  <article className="event-card" key={`${eventYear}-${event.title}`}>
                    <div className={`event-visual ${event.tone} ${event.images ? "has-photos" : ""}`}>
                      <span className="event-number">0{index + 1}</span>
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
                        <div className="event-symbol" aria-hidden="true">{index === 0 ? "✦" : "∞"}</div>
                      )}
                      <span className="event-tag">{event.tag}</span>
                    </div>
                    <div className="event-content">
                      <div className="event-date"><strong>{event.date}</strong><span>{event.year}</span></div>
                      <div>
                        <h3>{event.title}</h3>
                        <p>{event.description}</p>
                        <small><span aria-hidden="true">◎</span> {event.location}</small>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="empty-state event-empty">
                <span>✦</span>
                <h3>Chuyện năm {eventYear} đang được viết</h3>
                <p>Những kỷ niệm của thế hệ này sẽ sớm xuất hiện tại đây.</p>
              </div>
            )}
          </section>

          <section className="about section-shell">
            <div className="about-label">
              <span>02 / OUR STORY</span>
              <div className="mini-orbit">F<br /><i>✦</i></div>
            </div>
            <div className="about-copy">
              <p className="eyebrow"><span /> More than a mentoring program</p>
              <h2>Đi cùng nhau,<br />lớn lên <em>cùng nhau.</em></h2>
              <div className="about-columns">
                <p>
                  Brothers &amp; Sisters là chương trình đồng hành sinh viên tại Đại học FPT campus TP.HCM,
                  kết nối những người đi trước với các tân sinh viên trong những ngày đầu còn nhiều bỡ ngỡ.
                </p>
                <p>
                  Ở Faerie, sự đồng hành không dừng ở lời chỉ dẫn. Đó là những bữa ăn cùng nhau,
                  tin nhắn hỏi thăm, buổi học nhóm và một cộng đồng luôn sẵn sàng lắng nghe.
                </p>
              </div>
              <div className="values-row">
                <span><b>01</b> Belonging</span>
                <span><b>02</b> Growth</span>
                <span><b>03</b> Kindness</span>
                <span><b>04</b> Legacy</span>
              </div>
            </div>
          </section>

          <section className="quote-band">
            <span className="quote-mark">“</span>
            <blockquote>Không chỉ là người dẫn đường.<br />Chúng mình là <em>gia đình.</em></blockquote>
            <span className="quote-spark">✦ FAERIE / 2026</span>
          </section>
        </div>
      ) : tab === "members" ? (
        <div role="tabpanel" className="members-page page-enter">
          <section className="members-hero section-shell">
            <div>
              <p className="eyebrow"><span /> The people behind the magic</p>
              <h1>Meet the<br /><em>Faerie family.</em></h1>
            </div>
            <div className="members-intro">
              <p>
                Mỗi thế hệ là một màu sắc riêng, cùng góp lại thành câu chuyện Faerie.
                Tìm những gương mặt đã đồng hành với ngôi nhà qua từng năm.
              </p>
              <div className="members-stat"><strong>{totalMembers}</strong><span>members<br />&amp; growing</span></div>
            </div>

            <div className="member-hero-deck" aria-label={`Toàn bộ thành viên Faerie Roster ${year}`}>
              {rosters[year].map((person, index, roster) => {
                const position = index / Math.max(roster.length - 1, 1);

                return (
                <article
                  className={`hero-member-card ${index === heroCardIndex ? "auto-active" : ""}`}
                  key={`hero-${year}-${person.name}`}
                  style={{ left: `${position * 100}%`, transform: `translateX(-${position * 100}%)` }}
                >
                  <button
                    type="button"
                    className="hero-member-card-button"
                    aria-label={`Xem vai trò của ${person.name}: ${person.title}`}
                  >
                    <div className="hero-member-card-inner">
                      <div className={`hero-member-card-face hero-member-card-front ${memberPhoto(year, person.name) ? "has-photo" : avatarTones[index % avatarTones.length]}`}>
                        {memberPhoto(year, person.name) ? (
                          <img src={memberPhoto(year, person.name)} alt={`Ảnh của ${person.name}`} loading="lazy" />
                        ) : (
                          <span className="hero-card-initials">{initials(person.name)}</span>
                        )}
                        <div className="hero-card-caption">
                          <strong>{person.name}</strong>
                          <small>Roster {year}</small>
                        </div>
                      </div>
                      <div className={`hero-member-card-face hero-member-card-back ${person.group.toLowerCase()}`}>
                        <span>ROLE</span>
                        <i aria-hidden="true">✦</i>
                        <strong>{person.title}</strong>
                        <small>{person.name}</small>
                      </div>
                    </div>
                  </button>
                </article>
                );
              })}
            </div>
          </section>

          <section className="directory section-shell">
            <div className="directory-toolbar">
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

            <div className="role-filter" aria-label="Lọc theo vai trò">
              <button className={role === "All" ? "active" : ""} onClick={() => setRole("All")}>
                Tất cả <span>{rosters[year].length}</span>
              </button>
              {groupOrder.map((item) => (
                <button key={item} className={role === item ? "active" : ""} onClick={() => setRole(item)}>
                  {groupLabels[item]} <span>{rosters[year].filter((person) => person.group === item).length}</span>
                </button>
              ))}
            </div>

            <div className="directory-title">
              <h2>Faerie class of <em>{year}</em></h2>
              <span>{members.length.toString().padStart(2, "0")} kết quả</span>
            </div>

            {members.length > 0 ? (
              <div className="member-grid">
                {members.map((person) => (
                  <article className="member-card" key={`${year}-${person.name}`}>
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
        <div role="tabpanel" className="top-page page-enter">
          <section className="top-hero section-shell">
            <div className="top-hero-copy">
              <p className="eyebrow"><span /> Faerie outstanding brosis · {topYear}</p>
              <h1>Top <em>{topMembers.length}</em><br />shining souls.</h1>
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
            <div className="champion-card">
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

          <section className="leaderboard section-shell">
            <div className="leaderboard-heading">
              <div>
                <p className="eyebrow"><span /> Faerie Hall of Fame · {topYear}</p>
                <h2>Brosis xuất sắc <em>{topYear}</em></h2>
              </div>
              <p>{topMembers.length} gương mặt nổi bật · Faerie Gen {topYear}</p>
            </div>

            <div className="leaderboard-table" role="table" aria-label={`Top ${topMembers.length} brosis xuất sắc năm ${topYear}`}>
              <div className="leaderboard-row leaderboard-labels" role="row">
                <span>Hạng</span><span>Thành viên</span>
              </div>
              {topMembers.map((person, index) => (
                <article className={`leaderboard-row ${index < 3 ? "podium" : ""}`} role="row" key={`${topYear}-${person.name}`}>
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

      <footer>
        <div className="footer-brand"><span><img src="/images/faerie-icon.png" alt="" /></span><strong>FAERIE</strong></div>
        <p>Brothers &amp; Sisters · FPT University<br />TP.HCM Campus</p>
        <p className="footer-note">MADE WITH KINDNESS<br />FOR EVERY NEW CHAPTER.</p>
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>Lên đầu trang ↑</button>
      </footer>
    </main>
  );
}
