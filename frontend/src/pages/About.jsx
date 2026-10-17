import {
  CubeTransparentIcon,
  ArrowUpRightIcon,
  CodeBracketIcon,
  ChatBubbleLeftRightIcon,
} from '@heroicons/react/24/outline';

export default function About() {
  return (
    <main className="settings-shell">
      <header className="settings-page-header">
        <span className="settings-eyebrow">GET TO KNOW YOUR WORKSPACE</span>
        <h1>About Nexus</h1>
        <p>A clearer way to manage your business.</p>
      </header>
      <section className="settings-about-card">
        <span className="settings-about-mark">
          <CubeTransparentIcon />
        </span>
        <h2>
          Everything connected.
          <br />
          More room to grow.
        </h2>
        <p>
          Nexus brings your customers, quotes, invoices, and payments together in one thoughtfully
          organized workspace.
        </p>
        <div className="settings-about-credit">Built on the open source IDURAR CRM platform.</div>
        <div className="settings-about-links">
          <a href="https://www.idurarapp.com" target="_blank" rel="noreferrer">
            <span>
              <CubeTransparentIcon />
              Visit IDURAR
            </span>
            <ArrowUpRightIcon />
          </a>
          <a href="https://github.com/idurar/mern-crm-web" target="_blank" rel="noreferrer">
            <span>
              <CodeBracketIcon />
              Explore the source
            </span>
            <ArrowUpRightIcon />
          </a>
          <a href="https://www.idurarapp.com/contact-us/" target="_blank" rel="noreferrer">
            <span>
              <ChatBubbleLeftRightIcon />
              Get support
            </span>
            <ArrowUpRightIcon />
          </a>
        </div>
      </section>
    </main>
  );
}
