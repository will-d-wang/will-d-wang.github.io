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
  const currentSectionItem = topLevelNavbarItems.find(
    (item) =>
      (item as any).route === `/${currentSection}` ||
      (item as any).name === currentSection,
  );
  const sectionChildren =
    currentSectionItem && "children" in currentSectionItem
      ? currentSectionItem.children
      : [];

  const renderSubItem = (item: PageMapItem): JSX.Element => {
    const itemAny = item as any;
    let route = itemAny.route || itemAny.href || "";
    // Routes starting with /docs are already correct, don't modify them
    // Only add /docs prefix to routes that need it
    if (!route.startsWith("/")) {
      // Relative paths get /docs/ prefix
      route = "/docs/" + route;
    } else if (
      route.startsWith("/") &&
      !route.startsWith("/docs") &&
      !route.startsWith("/blog") &&
      route !== "/"
    ) {
      // Absolute paths (except /blog and /) get /docs prefix
      route = "/docs" + route;
    }
    const isActive = pathname === route;
    const title = itemAny.title || itemAny.name || "Page";

    return "children" in item ? (
      <div key={route} className="nextra-dropdown-group">
        <span className="nextra-dropdown-label">{title}</span>
        <ul className="nextra-dropdown-nested">
          {item.children.map((child) => renderSubItem(child))}
        </ul>
      </div>
    ) : (
      <li key={route} className={isActive ? "active" : ""}>
        <Anchor href={route} className="nextra-dropdown-link">
          {title}
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
                width={48}
                height={48}
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
              <Anchor href="/docs">Docs</Anchor>
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
      {sectionChildren &&
        sectionChildren.length > 0 &&
        currentSection !== "index" && (
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
