import type { FC } from "react";

export const Footer: FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="nextra-footer">
      <div className="nextra-footer-content">
        <p>
          Copyright © {year} Will D. Wang. Powered by{" "}
          <a
            href="https://nextra.site"
            target="_blank"
            rel="noopener noreferrer"
          >
            Nextra
          </a>
        </p>
      </div>
    </footer>
  );
};
