"use client";

import { useMemo, useState } from "react";

type Tab = "news" | "members" | "top20";
type Year = 2024 | 2025 | 2026;
type MemberGroup = "Mentor" | "Supporter" | "Leadership" | "Member";

type MemberProfile = {
  name: string;
  title: string;
  group: MemberGroup;
};

const eventsByYear: Record<Year, Array<{
  date: string;
  year: string;
  title: string;
  description: string;
  tag: string;
  location: string;
  tone: string;
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
    },
    {
      date: "15.07",
      year: "2026",
      title: "Họp Offline lần đầu",
      description:
        "Buổi gặp mặt trực tiếp đầu tiên của cả nhà, nơi những cái tên trên màn hình trở thành bạn bè và những kế hoạch bắt đầu thành hình.",
      tag: "Meet up",
      location: "TP.HCM",
      tone: "orange",
    },
  ],
};

const names2024 = [
  "Nguyễn Minh Anh", "Trần Gia Hân", "Lê Hoàng Nam", "Phạm Thuỳ Dương",
  "Đỗ Đức Anh", "Vũ Khánh Linh", "Bùi Minh Quân", "Hoàng Ngọc Mai",
  "Nguyễn Quốc Bảo", "Trần Phương Thảo", "Lê Anh Tuấn", "Phạm Gia Linh",
  "Đặng Hải Yến", "Ngô Nhật Minh", "Dương Quỳnh Anh", "Trịnh Đức Long",
  "Lý Thanh Huyền", "Mai Trung Kiên", "Võ Hà My", "Cao Quang Huy",
  "Tạ Bảo Ngọc", "Chu Minh Khang", "Đinh Thảo Vy", "Hà Tuấn Anh",
  "Ninh Khánh An", "Quách Hoài Nam", "Tô Diệu Linh", "Lương Việt Dũng",
  "Kiều Ngọc Anh", "La Thành Công",
];

const names2025 = [
  "Vũ Thanh Tâm", "Nguyễn Hà Phương", "Trần Đăng Khoa", "Lê Bảo Trâm",
  "Phạm Minh Đức", "Đỗ Ngọc Hân", "Bùi Hoàng Sơn", "Hoàng Thu Trang",
  "Nguyễn Tuấn Kiệt", "Trần Khánh Ly", "Lê Quốc Khánh", "Phạm Anh Thư",
  "Đặng Minh Châu", "Ngô Gia Huy", "Dương Linh Chi", "Trịnh Hoàng Anh",
  "Lý Đức Thịnh", "Mai Bảo Uyên", "Võ Minh Nhật", "Cao Thảo Nguyên",
  "Tạ Hải Đăng", "Chu Quỳnh Như", "Đinh Gia Bảo", "Hà Phương Linh",
  "Ninh Tuệ Minh", "Quách Đức Mạnh", "Tô Khánh Vy", "Lương Anh Khoa",
  "Kiều Mai Anh", "La Nhật Nam",
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

const rosters: Record<Year, MemberProfile[]> = {
  2024: makeMockRoster(names2024),
  2025: makeMockRoster(names2025),
  2026: roster2026,
};

const groupOrder: MemberGroup[] = ["Mentor", "Supporter", "Leadership", "Member"];
const groupLabels: Record<MemberGroup, string> = {
  Mentor: "Mentor",
  Supporter: "Supporter",
  Leadership: "Ban điều hành",
  Member: "Member",
};

const top20 = roster2026.slice(0, 20).map((person, index) => ({
  ...person,
  rank: index + 1,
  points: 980 - index * 23,
  activities: 8 - (index % 4),
  streak: 12 - (index % 5),
}));

function initials(name: string) {
  const parts = name.trim().split(" ");
  return `${parts[parts.length - 2]?.[0] ?? ""}${parts[parts.length - 1]?.[0] ?? ""}`;
}

const avatarTones = ["sage", "sun", "sky", "lilac", "coral", "lime"];

export default function Home() {
  const [tab, setTab] = useState<Tab>("news");
  const [year, setYear] = useState<Year>(2026);
  const [eventYear, setEventYear] = useState<Year>(2026);
  const [role, setRole] = useState<MemberGroup | "All">("All");
  const [query, setQuery] = useState("");

  const members = useMemo(
    () =>
      rosters[year]
        .map((person, index) => ({ ...person, index }))
        .filter((person) => role === "All" || person.group === role)
        .filter((person) =>
          person.name.toLocaleLowerCase("vi").includes(query.trim().toLocaleLowerCase("vi")),
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
        <button className="brand" onClick={() => switchTab("news")} aria-label="Faerie home">
          <span className="brand-mark" aria-hidden="true">✦</span>
          <span>
            <strong>FAERIE</strong>
            <small>BROSIS · FPTU</small>
          </span>
        </button>

        <nav className="main-nav" aria-label="Điều hướng chính" role="tablist">
          <button
            role="tab"
            aria-selected={tab === "news"}
            className={tab === "news" ? "active" : ""}
            onClick={() => switchTab("news")}
          >
            News <span>02</span>
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

      {tab === "news" ? (
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

            <div className="hero-art" aria-label="Faerie 2026 yearbook collage">
              <div className="spark spark-one">✦</div>
              <div className="spark spark-two">✦</div>
              <div className="year-card card-back">
                <span>FPTU</span>
                <strong>25</strong>
                <small>memories<br />made together</small>
              </div>
              <div className="year-card card-front">
                <div className="card-ribbon">NEW CHAPTER</div>
                <span className="tiny-label">FAERIE YEARBOOK</span>
                <strong>2026</strong>
                <div className="portrait-cluster" aria-hidden="true">
                  <i>HA</i><i>MT</i><i>DD</i><i>NL</i>
                </div>
                <small>THE MAGIC IS<br />IN THE PEOPLE.</small>
              </div>
              <div className="round-stamp"><span>35</span>SOULS<br />ONE HOME</div>
            </div>
          </section>

          <section className="stats-strip" aria-label="Faerie highlights">
            <div><strong>03</strong><span>thế hệ tiếp nối</span></div>
            <div><strong>95+</strong><span>mảnh ghép Faerie</span></div>
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
              {([2024, 2025, 2026] as Year[]).map((item) => (
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
                    <div className={`event-visual ${event.tone}`}>
                      <span className="event-number">0{index + 1}</span>
                      <div className="event-symbol" aria-hidden="true">{index === 0 ? "✦" : "∞"}</div>
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
              <div className="members-stat"><strong>95</strong><span>members<br />&amp; growing</span></div>
            </div>
          </section>

          <section className="directory section-shell">
            <div className="directory-toolbar">
              <div className="year-picker" aria-label="Chọn năm">
                {([2024, 2025, 2026] as Year[]).map((item) => (
                  <button
                    key={item}
                    className={year === item ? "active" : ""}
                    onClick={() => { setYear(item); setRole("All"); }}
                    aria-pressed={year === item}
                  >
                    {item} <span>{year === item ? "✦" : ""}</span>
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
                    <div className={`avatar ${avatarTones[person.index % avatarTones.length]}`}>
                      <span>{initials(person.name)}</span>
                      <small>{(person.index + 1).toString().padStart(2, "0")}</small>
                    </div>
                    <div className="member-info">
                      <div>
                        <h3>{person.name}</h3>
                        <p>Faerie · Gen {year.toString().slice(-2)}</p>
                      </div>
                      <span className={`role-badge ${person.group.toLowerCase()}`}>{person.title}</span>
                    </div>
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
              <p className="eyebrow"><span /> Faerie activity board · 2026</p>
              <h1>Top <em>20</em><br />shining souls.</h1>
              <p>
                Hai mươi gương mặt nổi bật trên hành trình kết nối, sẻ chia và tạo nên năng lượng
                cho nhà Faerie. Điểm số hiện là dữ liệu mẫu và sẽ được cập nhật theo hoạt động thực tế.
              </p>
            </div>
            <div className="champion-card">
              <span className="champion-rank">#01</span>
              <div className="champion-avatar">{initials(top20[0].name)}</div>
              <small>LEADING THE MAGIC</small>
              <h2>{top20[0].name}</h2>
              <p>{top20[0].title}</p>
              <strong>{top20[0].points} <i>PTS</i></strong>
            </div>
          </section>

          <section className="leaderboard section-shell">
            <div className="leaderboard-heading">
              <div>
                <p className="eyebrow"><span /> Updated 15.07.2026</p>
                <h2>Bảng xếp hạng <em>tháng 07</em></h2>
              </div>
              <p>Điểm hoạt động mẫu · Faerie Gen 2026</p>
            </div>

            <div className="leaderboard-table" role="table" aria-label="Top 20 thành viên Faerie">
              <div className="leaderboard-row leaderboard-labels" role="row">
                <span>Hạng</span><span>Thành viên</span><span>Hoạt động</span><span>Chuỗi ngày</span><span>Điểm</span>
              </div>
              {top20.map((person, index) => (
                <article className={`leaderboard-row ${index < 3 ? "podium" : ""}`} role="row" key={person.name}>
                  <div className="rank-number">{person.rank.toString().padStart(2, "0")}</div>
                  <div className="rank-person">
                    <span className={`rank-avatar ${avatarTones[index % avatarTones.length]}`}>{initials(person.name)}</span>
                    <div><h3>{person.name}</h3><p>{person.title}</p></div>
                  </div>
                  <div className="rank-metric"><strong>{person.activities}</strong><small>events</small></div>
                  <div className="rank-metric"><strong>{person.streak}</strong><small>days</small></div>
                  <div className="rank-points">{person.points}<small>PTS</small></div>
                </article>
              ))}
            </div>
          </section>
        </div>
      )}

      <footer>
        <div className="footer-brand"><span>✦</span><strong>FAERIE</strong></div>
        <p>Brothers &amp; Sisters · FPT University<br />TP.HCM Campus</p>
        <p className="footer-note">MADE WITH KINDNESS<br />FOR EVERY NEW CHAPTER.</p>
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>Lên đầu trang ↑</button>
      </footer>
    </main>
  );
}
