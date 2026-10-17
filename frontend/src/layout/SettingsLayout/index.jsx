export default function SettingsLayout({
  children,
  topCardTitle,
  topCardContent,
  bottomCardContent,
}) {
  return (
    <div className="settings-shell settings-legacy-layout">
      <section className="settings-panel">{children}</section>
      {(topCardTitle || bottomCardContent) && (
        <aside className="settings-panel settings-help-card">
          <h2>{topCardTitle}</h2>
          {topCardContent}
          {bottomCardContent}
        </aside>
      )}
    </div>
  );
}
