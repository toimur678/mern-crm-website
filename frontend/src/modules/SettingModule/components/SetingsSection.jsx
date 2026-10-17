export default function SetingsSection({ title, description, children }) {
  return (
    <section className="settings-section">
      <header className="settings-section-header">
        <h2>{title}</h2>
        <p>{description}</p>
      </header>
      {children}
    </section>
  );
}
