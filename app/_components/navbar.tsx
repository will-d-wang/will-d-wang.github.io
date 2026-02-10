"use client";

import { usePathname } from "next/navigation";
import type { PageMapItem } from "nextra";
import { Anchor } from "nextra/components";
import { normalizePages } from "nextra/normalize-pages";
import type { FC } from "react";

export const Navbar: FC<{ pageMap: PageMapItem[] }> = ({ pageMap }) => {
  const pathname = usePathname();

  const { topLevelNavbarItems } = normalizePages({
    list: pageMap,
    route: pathname,
  });

  return (
    <nav className="nextra-navbar">
      <div className="nextra-navbar-content">
        <div className="nextra-logo">Will D. Wang</div>
        <ul className="nextra-nav-items">
          {topLevelNavbarItems.map((item) => {
            const route = item.route || ("href" in item ? item.href : "");
            const isActive = pathname === route;

            return (
              <li key={route} className={isActive ? "active" : ""}>
                <Anchor href={route}>{item.title}</Anchor>
              </li>
            );
          })}
        </ul>
        <div className="nextra-nav-github">
          <a
            href="https://github.com/will-d-wang/will-d-wang.github.io"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </div>
      </div>
    </nav>
  );
};
