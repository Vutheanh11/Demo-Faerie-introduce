"use client";

import { useCallback, useEffect, useMemo, useState, type CSSProperties } from "react";
import MemberProfileDialog, { type MemberDetails } from "./member-profile-dialog";

type Tab = "Introduce" | "members" | "top20";
type EventYear = 2024 | 2025 | 2026;
type RosterYear = 2023 | 2024 | 2025 | 2026;
type MemberGroup = "Mentor" | "Supporter" | "Leadership" | "Member";

type MemberProfile = MemberDetails & {
  group: MemberGroup;
};

function EventPhotoGallery({ images, title }: { images: string[]; title: string }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [previousIndex, setPreviousIndex] = useState<number | null>(null);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [transitionId, setTransitionId] = useState(0);
  const [paused, setPaused] = useState(false);

  const showPhoto = (nextIndex: number, nextDirection: 1 | -1) => {
    if (nextIndex === activeIndex) return;
    setPreviousIndex(activeIndex);
    setDirection(nextDirection);
    setActiveIndex(nextIndex);
    setTransitionId((id) => id + 1);
  };

  useEffect(() => {
    if (paused || images.length < 2) return;

    const timer = window.setTimeout(() => {
      setPreviousIndex(activeIndex);
      setDirection(1);
      setActiveIndex((activeIndex + 1) % images.length);
      setTransitionId((id) => id + 1);
    }, 5000);

    return () => window.clearTimeout(timer);
  }, [activeIndex, images.length, paused]);

  const previousPhoto = () => showPhoto((activeIndex - 1 + images.length) % images.length, -1);
  const nextPhoto = () => showPhoto((activeIndex + 1) % images.length, 1);

  return (
    <div
      className="event-photo-gallery"
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      {previousIndex !== null && (
        <img
          key={`out-${previousIndex}-${transitionId}`}
          className={`event-photo-image is-leaving ${direction === 1 ? "to-left" : "to-right"}`}
          src={images[previousIndex]}
          alt=""
          aria-hidden="true"
          onAnimationEnd={() => setPreviousIndex(null)}
        />
      )}
      <img
        key={`in-${activeIndex}-${transitionId}`}
        className={`event-photo-image ${previousIndex === null ? "is-current" : `is-entering ${direction === 1 ? "from-right" : "from-left"}`}`}
        src={images[activeIndex]}
        alt={`Ảnh ${title} số ${activeIndex + 1}`}
        loading={activeIndex === 0 ? "eager" : "lazy"}
      />

      {images.length > 1 && (
        <>
          <button type="button" className="event-gallery-arrow previous" onClick={previousPhoto} aria-label={`Xem ảnh trước của ${title}`}>
            <span aria-hidden="true">←</span>
          </button>
          <button type="button" className="event-gallery-arrow next" onClick={nextPhoto} aria-label={`Xem ảnh tiếp theo của ${title}`}>
            <span aria-hidden="true">→</span>
          </button>
          <div className="event-gallery-dots" role="group" aria-label={`Chọn ảnh của ${title}`}>
            {images.map((image, index) => (
              <button
                type="button"
                key={image}
                className={activeIndex === index ? "active" : ""}
                aria-label={`Xem ảnh ${index + 1} của ${title}`}
                aria-pressed={activeIndex === index}
                onClick={() => showPhoto(index, index > activeIndex ? 1 : -1)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

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
        "images/events/2026/kickoff/KickOff2026.jpg",
        "images/events/2026/kickoff/KickOff2026_1.jpg",
        "images/events/2026/kickoff/KickOff2026_2.jpg",
        "images/events/2026/kickoff/KickOff2026_3.jpg",
        "images/events/2026/kickoff/KickOff2026_4.jpg",
        "images/events/2026/kickoff/KickOff2026_5.jpg",
        "images/events/2026/kickoff/KickOff2026_6.jpg",
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
      images: [
        "images/events/2026/offline/HopOffline_1.jpg",
        "images/events/2026/offline/HopOffline_2.jpg",
        "images/events/2026/offline/HopOffline_3.jpg",
        "images/events/2026/offline/HopOffline_4.jpg",
        "images/events/2026/offline/HopOffline_5.jpg",
        "images/events/2026/offline/HopOffline_6.jpg",
        "images/events/2026/offline/HopOffline_7.jpg",
      ],
    },
    {
      date: "16.08",
      year: "2026",
      title: "Team Building",
      description:
        "Một ngày cùng thử thách, phối hợp và kết nối để mỗi thành viên hiểu nhau hơn, đồng lòng hơn trên hành trình Faerie.",
      tag: "Teamwork",
      location: "TP.HCM",
      tone: "mint",
      images: [
        "images/events/2026/team-building/TeamBuilding_1.jpg",
        "images/events/2026/team-building/TeamBuilding_2.jpg",
        "images/events/2026/team-building/TeamBuilding_3.jpg",
        "images/events/2026/team-building/TeamBuilding_4.jpg",
        "images/events/2026/team-building/TeamBuilding_5.jpg",
        "images/events/2026/team-building/TeamBuilding_6.jpg",
        "images/events/2026/team-building/TeamBuilding_7.jpg",
        "images/events/2026/team-building/TeamBuilding_8.jpg",
      ],
    },
    {
      date: "25.08",
      year: "2026",
      title: "Kick Off",
      description:
        "Cột mốc khởi động chặng đường mới, nơi cả nhà cùng gặp gỡ, chia sẻ mục tiêu và sẵn sàng tạo nên những dấu ấn tiếp theo.",
      tag: "Kick Off",
      location: "FPTU HCMC Campus",
      tone: "fern",
      images: [
        "images/events/2026/kickoff-august/KickOff_1.jpg",
        "images/events/2026/kickoff-august/KickOff_2.jpg",
        "images/events/2026/kickoff-august/KickOff_3.jpg",
        "images/events/2026/kickoff-august/KickOff_4.jpg",
        "images/events/2026/kickoff-august/KickOff_6.jpg",
      ],
    },
    {
      date: "02.09",
      year: "2026",
      title: "Chào Mừng Quốc Khánh",
      description:
        "Faerie cùng hòa chung không khí Quốc khánh, lưu lại những khoảnh khắc rực rỡ và niềm tự hào trong sắc màu Việt Nam.",
      tag: "National Day",
      location: "FPTU HCMC Campus",
      tone: "mint",
      images: [
        "images/events/2026/national-day/QK_1.jpg",
        "images/events/2026/national-day/QK_2.jpg",
        "images/events/2026/national-day/QK_3.jpg",
        "images/events/2026/national-day/QK_4.jpg",
        "images/events/2026/national-day/QK_5.jpg",
        "images/events/2026/national-day/QK_6.jpg",
      ],
    },
    {
      date: "03.09",
      year: "2026",
      title: "Welcome Day 1",
      description:
        "Ngày đầu tiên Faerie chào đón những gương mặt mới bằng năng lượng, nụ cười và những kết nối đầu tiên tại FPTU HCMC.",
      tag: "Welcome Day",
      location: "FPTU HCMC Campus",
      tone: "fern",
      images: [
        "images/events/2026/welcome-day-1/WD_1.jpg",
        "images/events/2026/welcome-day-1/WD_2.jpg",
        "images/events/2026/welcome-day-1/WD_3.jpg",
        "images/events/2026/welcome-day-1/WD_4.jpg",
      ],
    },
    {
      date: "04.09",
      year: "2026",
      title: "Welcome Day 2",
      description:
        "Welcome Day tiếp tục với thêm nhiều cuộc gặp gỡ, hoạt động và kỷ niệm, nối dài lời chào của nhà Faerie dành cho tân sinh viên.",
      tag: "Welcome Day",
      location: "FPTU HCMC Campus",
      tone: "mint",
      images: [
        "images/events/2026/welcome-day-2/WD2_1.jpg",
        "images/events/2026/welcome-day-2/WD2_2.jpg",
        "images/events/2026/welcome-day-2/WD2_3.jpg",
        "images/events/2026/welcome-day-2/WD2_4.jpg",
      ],
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
  { name: "Việt Phương", fullName: "Lê Việt Phương", title: "Mentor", group: "Mentor" },
  { name: "Nguyễn Trần Hạ My", title: "Supporter", group: "Supporter" },
  { name: "Phạm Lê Ý Linh", title: "Leader Nhà", group: "Leadership" },
  { name: "Vũ Thế Anh", title: "Sub Leader Nhà", group: "Leadership" },
  { name: "Đặng Tiến Hưng", title: "Member", group: "Member" },
  { name: "Huỳnh Quốc Bảo", title: "Member", group: "Member" },
  { name: "Đồng Thành Đạt", title: "Member", group: "Member" },
  { name: "Lê Thùy Dương", title: "Leader Ban Nghệ Thuật", group: "Leadership" },
  { name: "Hoàng Văn Đức Nhân", title: "Member", group: "Member" },
  { name: "Lê Hoàng Phước", title: "Member", group: "Member" },
  { name: "Cao Minh Thư", title: "Sub Leader Ban Văn Hóa", group: "Leadership" },
  { name: "Nguyễn Võ Gia Hiếu", title: "Member", group: "Member" },
  { name: "Nguyễn Hoàng Bảo Oanh", title: "Member", group: "Member" },
  { name: "Trần Thu Anh", title: "Leader Ban Media", group: "Leadership" },
  { name: "Nguyễn Gia Linh", title: "Member", group: "Member" },
  { name: "Lưu Trí Tâm", title: "Member", group: "Member" },
  { name: "Huỳnh Như Ý", title: "Member", group: "Member" },
  { name: "Hoàng Thị Quỳnh Lan", title: "Member", group: "Member" },
  { name: "Huỳnh Thị Trang Tường", title: "Member", group: "Member" },
  { name: "Dương Nguyễn Đông Quân", title: "Sub Leader Ban Event", group: "Leadership" },
  { name: "Triệu Trần Như Huỳnh", title: "Member", group: "Member" },
  { name: "Nguyễn Đan Huy", title: "Member", group: "Member" },
  { name: "Phạm Thị Thu Hằng", title: "Member", group: "Member" },
  { name: "Võ Khôi Nguyên", title: "Member", group: "Member" },
  { name: "Trần Văn Quỳnh", title: "Member", group: "Member" },
  { name: "Phou Mảu Quang", title: "Member", group: "Member" },
  { name: "Nguyễn Thanh Nhật Tân", title: "Sub Leader Ban Văn Hóa", group: "Leadership" },
  { name: "Trần Nhất Huy", title: "Member", group: "Member" },
  { name: "Vương Nguyễn Hồng Linh", title: "Leader Ban Event", group: "Leadership" },
  { name: "Trần Thanh Huyền", title: "Member", group: "Member" },
  { name: "Nguyễn Thành Nhân", title: "Member", group: "Member" },
  { name: "Trịnh Hoàng Khang", title: "Leader Ban Kỹ Thuật", group: "Leadership" },
  { name: "Lê Ngọc Trang", title: "Member", group: "Member" },
  { name: "Trần Đức Minh", title: "Member", group: "Member" },
  { name: "Võ Việt Nhật Minh", title: "Member", group: "Member" },
  { name: "Phạm Gia Khiêm", title: "Member", group: "Member" },
  { name: "Trương Thảo Vi", title: "Member", group: "Member" },
];

const rosters: Record<RosterYear, MemberProfile[]> = {
  2023: roster2023,
  2024: roster2024,
  2025: roster2025,
  2026: roster2026,
};

const totalMembers = 36;

const groupOrder: MemberGroup[] = ["Mentor", "Supporter", "Leadership", "Member"];
const groupLabels: Record<MemberGroup, string> = {
  Mentor: "Mentor",
  Supporter: "Supporter",
  Leadership: "Ban điều hành",
  Member: "Member",
};

const memberPhotos: Partial<Record<RosterYear, Record<string, string>>> = {
  2025: {
    "Phùng Duy Tuấn": "images/members/2025/PhungDinhTuan.jpg",
    "Hạ My": "images/members/2025/HaMy.jpg",
    "Thành Hoàng": "images/members/2025/ThanhHoang.jpg",
    "Nguyễn Quang Tâm": "images/members/2025/NguyenQuangTam.jpg",
    "Mai Văn Trân": "images/members/2025/MaiVanTran.jpg",
  },
  2026: {
    "Việt Phương": "images/members/2026/cards/01.webp",
    "Nguyễn Trần Hạ My": "images/members/2026/cards/02.webp",
    "Phạm Lê Ý Linh": "images/members/2026/cards/03.webp",
    "Vũ Thế Anh": "images/members/2026/cards/04.webp",
    "Đặng Tiến Hưng": "images/members/2026/cards/05.webp",
    "Huỳnh Quốc Bảo": "images/members/2026/cards/06.webp",
    "Đồng Thành Đạt": "images/members/2026/cards/07.webp",
    "Lê Thùy Dương": "images/members/2026/cards/08.webp",
    "Hoàng Văn Đức Nhân": "images/members/2026/cards/09.webp",
    "Lê Hoàng Phước": "images/members/2026/cards/10.webp",
    "Cao Minh Thư": "images/members/2026/cards/11.webp",
    "Nguyễn Võ Gia Hiếu": "images/members/2026/cards/12.webp",
    "Nguyễn Hoàng Bảo Oanh": "images/members/2026/cards/13.webp",
    "Trần Thu Anh": "images/members/2026/cards/14.webp",
    "Nguyễn Gia Linh": "images/members/2026/cards/15.webp",
    "Lưu Trí Tâm": "images/members/2026/cards/16.webp",
    "Huỳnh Như Ý": "images/members/2026/cards/17.webp",
    "Hoàng Thị Quỳnh Lan": "images/members/2026/cards/18.webp",
    "Huỳnh Thị Trang Tường": "images/members/2026/cards/19.webp",
    "Dương Nguyễn Đông Quân": "images/members/2026/cards/20.webp",
    "Triệu Trần Như Huỳnh": "images/members/2026/cards/21.webp",
    "Nguyễn Đan Huy": "images/members/2026/cards/22.webp",
    "Phạm Thị Thu Hằng": "images/members/2026/cards/23.webp",
    "Võ Khôi Nguyên": "images/members/2026/cards/24.webp",
    "Trần Văn Quỳnh": "images/members/2026/cards/25.webp",
    "Phou Mảu Quang": "images/members/2026/cards/26.webp",
    "Nguyễn Thanh Nhật Tân": "images/members/2026/cards/27.webp",
    "Trần Nhất Huy": "images/members/2026/cards/28.webp",
    "Vương Nguyễn Hồng Linh": "images/members/2026/cards/29.webp",
    "Trần Thanh Huyền": "images/members/2026/cards/30.webp",
    "Nguyễn Thành Nhân": "images/members/2026/cards/31.webp",
    "Trịnh Hoàng Khang": "images/members/2026/cards/32.webp",
    "Lê Ngọc Trang": "images/members/2026/cards/33.webp",
    "Trần Đức Minh": "images/members/2026/cards/34.webp",
    "Võ Việt Nhật Minh": "images/members/2026/cards/35.webp",
    "Phạm Gia Khiêm": "images/members/2026/cards/36.webp",
    "Trương Thảo Vi": "images/members/2026/cards/37.webp",
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
  const year: RosterYear = 2026;
  const [eventYear, setEventYear] = useState<EventYear>(2026);
  const [role, setRole] = useState<MemberGroup | "All">("All");
  const [query, setQuery] = useState("");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [selectedMember, setSelectedMember] = useState<MemberProfile | null>(null);
  const closeMemberProfile = useCallback(() => setSelectedMember(null), []);

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
  }, [tab, eventYear, year, role, query]);

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
          <span className="brand-mark" aria-hidden="true"><img src="images/faerie-icon.png" alt="" /></span>
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
            Members <span>{totalMembers}</span>
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
              src="images/faerie-banner.jpg"
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
            <div><small>THẾ HỆ</small><strong>3</strong><span>tiếp nối</span></div>
            <div><small>THÀNH VIÊN</small><strong>{totalMembers}</strong><span>mảnh ghép</span></div>
            <div><small>NĂM 2026</small><strong>{eventsByYear[2026].length.toString().padStart(2, "0")}</strong><span>hoạt động</span></div>
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
                    key={`${eventYear}-${event.date}-${event.title}`}
                    data-reveal
                    style={{ transitionDelay: `${index * 90}ms` }}
                  >
                    <div className={`v-event-media ${event.tone} ${event.images ? "has-photos" : ""}`}>
                      {event.images ? (
                        <EventPhotoGallery images={event.images} title={`${event.title} ${event.year}`} />
                      ) : (
                        <div className="v-event-symbol" aria-hidden="true">{index === 0 ? "✦" : "∞"}</div>
                      )}
                      <span className="v-event-number">{"// 0"}{index + 1}</span>
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
                <span aria-hidden="true">{"// "}{eventYear}</span>
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
                <img src="images/events/2026/kickoff/KickOff2026_1.jpg" alt="Thành viên Faerie tại sự kiện Kick Off 2026" loading="lazy" />
                <figcaption>FAERIE KICK OFF // 2026</figcaption>
              </figure>
              <figure className="v-photo-mini">
                <img src="images/events/2026/kickoff/KickOff2026_4.jpg" alt="Khoảnh khắc kết nối của nhà Faerie" loading="lazy" />
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
            <img src="images/events/2026/kickoff/KickOff2026_6.jpg" alt="Các thành viên Faerie cùng nhau trong hoạt động năm 2026" loading="lazy" />
            <div className="v-manifesto-wash" aria-hidden="true" />
            <div className="v-manifesto-copy section-shell" data-reveal>
              <p className="v-kicker"><span>04</span> Ready for the next chapter?</p>
              <blockquote>FAERIE ĐOÀN KẾT<br /><em>CHẤP HẾT GIAN NAN</em></blockquote>
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
                <button
                  type="button"
                  className="active"
                  onClick={() => setRole("All")}
                  aria-pressed="true"
                >
                  Member 2026 <span>✦</span>
                </button>
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
                      aria-label={`Xem hồ sơ của ${person.name}: ${person.title}`}
                      aria-haspopup="dialog"
                      onClick={() => setSelectedMember(person)}
                    >
                      <div className="member-card-surface">
                        <div
                          className={`avatar ${memberPhoto(year, person.name) ? "has-photo" : avatarTones[person.index % avatarTones.length]}`}
                          style={memberPhoto(year, person.name) ? { "--member-image": `url("${memberPhoto(year, person.name)}")` } as CSSProperties : undefined}
                        >
                          {memberPhoto(year, person.name) ? (
                            <img src={memberPhoto(year, person.name)} alt={`Ảnh của ${person.name}`} loading="lazy" />
                          ) : (
                            <span>{initials(person.name)}</span>
                          )}
                          <span className="member-card-glitch" aria-hidden="true" />
                          <small>{(person.index + 1).toString().padStart(2, "0")}</small>
                        </div>
                        <div className="member-front-info">
                          <strong>{person.name}</strong>
                          <span className="member-front-role">{person.title}</span>
                          <span className="member-front-meta">Xem hồ sơ <i aria-hidden="true">↗</i></span>
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
            <div className="tactical-hero-word" aria-hidden="true">WHO&apos;S NEXT</div>
            <span className="tactical-coordinate" aria-hidden="true">04 // HALL OF FAME // 2026</span>
            <div className="top-hero-copy">
              <p className="tactical-kicker"><span>01</span> Faerie outstanding brosis · 2026</p>
              <h1>WHO GONNA BE<br /><em>THE NEXT TOP 20?</em></h1>
              <div className="top-year-tabs" role="tablist" aria-label="Chọn năm bảng thành viên xuất sắc">
                <button type="button" role="tab" aria-selected="true" className="active">
                  <strong>2026</strong>
                  <span>Who&apos;s next?</span>
                </button>
              </div>
              <p>
                Danh sách vẫn đang được viết. Hai mươi vị trí, hai mươi câu chuyện mới — và gương mặt tiếp theo có thể là bạn.
              </p>
            </div>
            <div className="champion-card champion-card-mystery" data-reveal>
              <span className="champion-rank">#??</span>
              <div className="champion-avatar mystery-avatar" aria-hidden="true">?</div>
              <small>THE NEXT SPOT IS OPEN</small>
              <h2>WHO&apos;S NEXT?</h2>
              <p>FAERIE · 2026</p>
            </div>
          </section>

          <section className="leaderboard tactical-leaderboard top-2026-teaser section-shell">
            <div className="top-2026-teaser-card" data-reveal>
              <span className="top-2026-index">20 // ?</span>
              <p className="tactical-kicker"><span>02</span> Faerie Hall of Fame · 2026</p>
              <h2>WHO GONNA BE<br /><em>THE NEXT TOP 20?</em></h2>
              <p className="top-2026-copy">
                Chưa có cái tên nào được chốt. Hành trình 2026 đang diễn ra — cùng tạo dấu ấn để trở thành một trong hai mươi gương mặt tiếp theo của Faerie.
              </p>
              <div className="top-2026-slots" aria-label="20 vị trí đang chờ những gương mặt nổi bật">
                {Array.from({ length: 20 }, (_, index) => (
                  <span key={index}>{String(index + 1).padStart(2, "0")}</span>
                ))}
              </div>
            </div>
          </section>
        </div>
      )}

      {selectedMember && (
        <MemberProfileDialog
          member={selectedMember}
          photo={memberPhoto(year, selectedMember.name)}
          year={year}
          onDismiss={closeMemberProfile}
        />
      )}

      <footer className="tactical-footer">
        <div className="footer-brand"><span><img src="images/faerie-icon.png" alt="" /></span><strong>FAERIE</strong></div>
        <p>Brothers &amp; Sisters · FPT University<br />TP.HCM Campus</p>
        <p className="footer-note">MADE WITH KINDNESS<br />FOR EVERY NEW CHAPTER.</p>
        <div className="footer-contact">
          <span>CONTACT // FAERIE</span>
          <a href="mailto:faeriesolace@gmail.com">faeriesolace@gmail.com</a>
          <a href="https://www.facebook.com/profile.php?id=61577779404694" target="_blank" rel="noreferrer">Facebook Faerie ↗</a>
          <address>Lô E2a-7, Đường D1 Khu Công nghệ cao, P. Long Thạnh Mỹ, TP. Thủ Đức, Ho Chi Minh City, Vietnam</address>
        </div>
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>Lên đầu trang ↑</button>
      </footer>
    </main>
  );
}
