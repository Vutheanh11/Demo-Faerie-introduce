import Link from "next/link";

export default function NotFound() {
  return (
    <main className="not-found-page">
      <div>
        <span className="not-found-code">FAERIE / 404</span>
        <h1>CHƯA TÌM THẤY<br /><em>TRANG NÀY.</em></h1>
        <p>Đường dẫn có thể đã thay đổi. Hãy quay về Faerie House để tiếp tục khám phá.</p>
        <Link href="/">Về trang chủ <span aria-hidden="true">↗</span></Link>
      </div>
    </main>
  );
}
