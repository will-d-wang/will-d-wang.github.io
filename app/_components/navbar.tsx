"use client";

import { usePathname } from "next/navigation";
import type { PageMapItem } from "nextra";
import { Anchor } from "nextra/components";
import { normalizePages } from "nextra/normalize-pages";
import Image from "next/image";
import type { FC } from "react";

export const Navbar: FC<{ pageMap: PageMapItem[] }> = ({ pageMap }) => {
  const pathname = usePathname();

  const { topLevelNavbarItems } = normalizePages({
    list: pageMap,
    route: pathname,
  });

  // Determine current section and its children
  const currentSection = pathname.split("/")[1] || "index";
  const currentSectionItem = pageMap.find(
    (item) =>
      item.route === `/${currentSection}` || item.name === currentSection,
  );
  const sectionChildren =
    currentSectionItem && "children" in currentSectionItem
      ? currentSectionItem.children
      : [];

  const renderSubItem = (item: PageMapItem): JSX.Element => {
    const route = item.route || ("href" in item ? (item.href as string) : "");
    const isActive = pathname === route;

    return "children" in item ? (
      <div key={route} className="nextra-dropdown-group">
        <span className="nextra-dropdown-label">{item.title}</span>
        <ul className="nextra-dropdown-nested">
          {item.children.map((child) => renderSubItem(child))}
        </ul>
      </div>
    ) : (
      <li key={route} className={isActive ? "active" : ""}>
        <Anchor href={route} className="nextra-dropdown-link">
          {item.title}
        </Anchor>
      </li>
    );
  };

  return (
    <>
      <nav className="nextra-navbar">
        <div className="nextra-navbar-content">
          <div className="nextra-logo">
            <Anchor href="/">
              <Image
                src="/logo.webp"
                alt="Logo"
                width={32}
                height={32}
                className="nextra-logo-image"
              />
              <span>Will D. Wang</span>
            </Anchor>
          </div>
          <ul className="nextra-nav-items">
            <li>
              <Anchor href="/">Home</Anchor>
            </li>
            <li>
              <Anchor href="/docs">Documentation</Anchor>
            </li>
            <li>
              <Anchor href="/blog">Blog</Anchor>
            </li>
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

      {/* Secondary navbar for section pages */}
      {sectionChildren.length > 0 && currentSection !== "index" && (
        <nav className="nextra-secondary-navbar">
          <div className="nextra-secondary-content">
            <ul className="nextra-section-items">
              {sectionChildren.map((item) => renderSubItem(item))}
            </ul>
          </div>
        </nav>
      )}
    </>
  );
};
