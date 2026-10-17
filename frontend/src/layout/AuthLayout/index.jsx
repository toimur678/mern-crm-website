export default function AuthLayout({ sideContent, children }) {
  return (
    <main className="auth-layout">
      <aside className="auth-side-panel">{sideContent}</aside>
      <section className="auth-form-panel">{children}</section>
    </main>
  );
}
