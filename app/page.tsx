"use client";

import { useMemo, useState } from "react";

type Tab = "news" | "members";
type Year = 2024 | 2025 | 2026;
type MemberRole = "Mentor" | "Supporter" | "Leader" | "Member";

const events = [
  {
    date: "16.08",
    year: "2026",
    title: "First Wings Day",
    description:
      "Ngày gặp gỡ đầu tiên dành cho tân sinh viên: làm quen với mentor, tìm hiểu FPTU và bắt đầu hành trình cùng nhà Faerie.",
    tag: "Welcome day",
    location: "Hola Park",
    tone: "mint",
  },
  {
    date: "05.09",
    year: "2026",
    title: "Buddy Bonding",
    description:
      "Một buổi chiều đầy trò chơi, thử thách đồng đội và những câu chuyện để các thành viên mới thật sự thuộc về nhau.",
    tag: "Bonding",
    location: "Dom A Courtyard",
    tone: "orange",
  },
  {
    date: "20.09",
    year: "2026",
    title: "Study Smart Lab",
    description:
      "Workshop chia sẻ cách học hiệu quả, quản lý deadline và cân bằng đời sống đại học từ các anh chị đi trước.",
    tag: "Workshop",
    location: "Gamma Hall",
    tone: "cream",
  },
  {
    date: "11.10",
    year: "2026",
    title: "Green Footprints",
    description:
      "Cùng nhau tạo một ngày sống xanh bằng hoạt động đổi rác lấy cây và làm mới các góc nhỏ trong khuôn viên trường.",
    tag: "Community",
    location: "FPT University",
    tone: "green",
  },
  {
    date: "07.11",
    year: "2026",
    title: "Faerie Legacy Night",
    description:
      "Đêm hội kết nối các thế hệ Brosis, nơi ký ức được kể lại và những giá trị đẹp được trao cho thế hệ tiếp theo.",
    tag: "Tradition",
    location: "Innovation Building",
    tone: "purple",
  },
  {
    date: "19.12",
    year: "2026",
    title: "Winter Glow Camp",
    description:
      "Khép lại một năm bằng chuyến đi ấm áp với mini game, lửa trại, âm nhạc và khoảnh khắc nhìn lại hành trình đã qua.",
    tag: "Camp",
    location: "Ba Vì, Hà Nội",
    tone: "blue",
  },
];

const rosters: Record<Year, string[]> = {
  2024: [
    "Nguyễn Minh Anh", "Trần Gia Hân", "Lê Hoàng Nam", "Phạm Thuỳ Dương",
    "Đỗ Đức Anh", "Vũ Khánh Linh", "Bùi Minh Quân", "Hoàng Ngọc Mai",
    "Nguyễn Quốc Bảo", "Trần Phương Thảo", "Lê Anh Tuấn", "Phạm Gia Linh",
    "Đặng Hải Yến", "Ngô Nhật Minh", "Dương Quỳnh Anh", "Trịnh Đức Long",
    "Lý Thanh Huyền", "Mai Trung Kiên", "Võ Hà My", "Cao Quang Huy",
    "Tạ Bảo Ngọc", "Chu Minh Khang", "Đinh Thảo Vy", "Hà Tuấn Anh",
    "Ninh Khánh An", "Quách Hoài Nam", "Tô Diệu Linh", "Lương Việt Dũng",
    "Kiều Ngọc Anh", "La Thành Công",
  ],
  2025: [
    "Vũ Thanh Tâm", "Nguyễn Hà Phương", "Trần Đăng Khoa", "Lê Bảo Trâm",
    "Phạm Minh Đức", "Đỗ Ngọc Hân", "Bùi Hoàng Sơn", "Hoàng Thu Trang",
    "Nguyễn Tuấn Kiệt", "Trần Khánh Ly", "Lê Quốc Khánh", "Phạm Anh Thư",
    "Đặng Minh Châu", "Ngô Gia Huy", "Dương Linh Chi", "Trịnh Hoàng Anh",
    "Lý Đức Thịnh", "Mai Bảo Uyên", "Võ Minh Nhật", "Cao Thảo Nguyên",
    "Tạ Hải Đăng", "Chu Quỳnh Như", "Đinh Gia Bảo", "Hà Phương Linh",
    "Ninh Tuệ Minh", "Quách Đức Mạnh", "Tô Khánh Vy", "Lương Anh Khoa",
    "Kiều Mai Anh", "La Nhật Nam",
  ],
  2026: [
    "Nguyễn Hoài An", "Trần Minh Thư", "Lê Đức Duy", "Phạm Khánh Huyền",
    "Đỗ Thành Đạt", "Vũ Ngọc Lan", "Bùi Anh Khoa", "Hoàng Gia Hân",
    "Nguyễn Minh Triết", "Trần Tuệ Nhi", "Lê Nhật Quang", "Phạm Thu Hà",
    "Đặng Quang Minh", "Ngô Bảo Châu", "Dương Anh Tú", "Trịnh Mỹ Linh",
    "Lý Hoàng Phúc", "Mai Thanh Trúc", "Võ Tuấn Vũ", "Cao Minh Ngọc",
    "Tạ Gia Khiêm", "Chu Hải Anh", "Đinh Ngọc Ánh", "Hà Đức Huy",
    "Ninh Phương Mai", "Quách Anh Dũng", "Tô Diệu Anh", "Lương Minh Khôi",
    "Kiều Khánh Chi", "La Bảo Long",
  ],
};

const roleOrder: MemberRole[] = ["Mentor", "Supporter", "Leader", "Member"];
const roleLabels: Record<MemberRole, string> = {
  Mentor: "Mentor",
  Supporter: "Supporter",
  Leader: "Leader",
  Member: "Member",
};

function roleForIndex(index: number): MemberRole {
  if (index === 0) return "Mentor";
  if (index <= 3) return "Supporter";
  if (index <= 7) return "Leader";
  return "Member";
}

function initials(name: string) {
  const parts = name.trim().split(" ");
  return `${parts[parts.length - 2]?.[0] ?? ""}${parts[parts.length - 1]?.[0] ?? ""}`;
}

const avatarTones = ["sage", "sun", "sky", "lilac", "coral", "lime"];

export default function Home() {
  const [tab, setTab] = useState<Tab>("news");
  const [year, setYear] = useState<Year>(2026);
  const [role, setRole] = useState<MemberRole | "All">("All");
  const [query, setQuery] = useState("");

  const members = useMemo(
    () =>
      rosters[year]
        .map((name, index) => ({ name, role: roleForIndex(index), index }))
        .filter((person) => role === "All" || person.role === role)
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
            News <span>06</span>
          </button>
          <button
            role="tab"
            aria-selected={tab === "members"}
            className={tab === "members" ? "active" : ""}
            onClick={() => switchTab("members")}
          >
            Members <span>90</span>
          </button>
        </nav>

        <div className="header-note">EST. 2024 · HÒA LẠC</div>
      </header>

      {tab === "news" ? (
        <div role="tabpanel" className="page-enter">
          <section className="hero section-shell">
            <div className="hero-copy">
              <p className="eyebrow"><span /> Brothers &amp; Sisters · FPT University</p>
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
              <div className="round-stamp"><span>30</span>SOULS<br />ONE HOME</div>
            </div>
          </section>

          <section className="stats-strip" aria-label="Faerie highlights">
            <div><strong>03</strong><span>thế hệ tiếp nối</span></div>
            <div><strong>90+</strong><span>mảnh ghép Faerie</span></div>
            <div><strong>18</strong><span>sự kiện đã tổ chức</span></div>
            <p>TOGETHER WE MAKE<br />ORDINARY DAYS MAGIC <b>✦</b></p>
          </section>

          <section className="events section-shell" id="events">
            <div className="section-heading">
              <div>
                <p className="eyebrow"><span /> What's happening</p>
                <h2>Chuyện nhà <em>Faerie</em></h2>
              </div>
              <p>Sáu điểm hẹn để học hỏi, kết nối<br />và cùng nhau tạo nên kỷ niệm.</p>
            </div>

            <div className="event-grid">
              {events.map((event, index) => (
                <article className={`event-card ${index === 0 ? "featured" : ""}`} key={event.title}>
                  <div className={`event-visual ${event.tone}`}>
                    <span className="event-number">0{index + 1}</span>
                    <div className="event-symbol" aria-hidden="true">
                      {index === 0 ? "✦" : index === 1 ? "∞" : index === 2 ? "A+" : index === 3 ? "☘" : index === 4 ? "◌" : "✺"}
                    </div>
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
                  Brothers &amp; Sisters là chương trình đồng hành sinh viên tại Đại học FPT,
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
      ) : (
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
              <div className="members-stat"><strong>90</strong><span>members<br />&amp; growing</span></div>
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
                Tất cả <span>30</span>
              </button>
              {roleOrder.map((item) => (
                <button key={item} className={role === item ? "active" : ""} onClick={() => setRole(item)}>
                  {roleLabels[item]} <span>{item === "Mentor" ? 1 : item === "Supporter" ? 3 : item === "Leader" ? 4 : 22}</span>
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
                      <span className={`role-badge ${person.role.toLowerCase()}`}>{person.role}</span>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="empty-state"><span>✦</span><h3>Chưa tìm thấy thành viên</h3><p>Thử một tên hoặc vai trò khác nhé.</p></div>
            )}
          </section>
        </div>
      )}

      <footer>
        <div className="footer-brand"><span>✦</span><strong>FAERIE</strong></div>
        <p>Brothers &amp; Sisters · FPT University<br />Hòa Lạc Campus, Hà Nội</p>
        <p className="footer-note">MADE WITH KINDNESS<br />FOR EVERY NEW CHAPTER.</p>
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>Lên đầu trang ↑</button>
      </footer>
    </main>
  );
}
