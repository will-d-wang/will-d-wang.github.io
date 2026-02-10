"use client";

import { usePathname } from "next/navigation";
import type { PageMapItem } from "nextra";
import { Anchor } from "nextra/components";
import { normalizePages } from "nextra/normalize-pages";
import type { FC } from "react";

export const Sidebar: FC<{ pageMap: PageMapItem[] }> = ({ pageMap }) => {
  const pathname = usePathname();

  const { docsDirectories } = normalizePages({
    list: pageMap,
    route: pathname,
  });

  // Filter to show docs-specific pages when in /docs section
  const isInDocsSection = pathname.startsWith("/docs");
  const sidebarItems = isInDocsSection
    ? docsDirectories.filter((item: any) => {
        const route = item.route || item.href || "";
        // Include /docs routes and content that will become /docs routes
        return (
          route.startsWith("/docs") ||
          (!route.startsWith("/") && route.length > 0) || // Relative paths
          (route.startsWith("/") && !route.startsWith("/blog") && route !== "/") // Absolute paths except /blog and /
        );
      })
    : docsDirectories;

  const renderItem = (item: PageMapItem): JSX.Element => {
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
    const title = itemAny.title || itemAny.name || "Page";
    const isActive = pathname === route;

    return "children" in item ? (
      <details
        key={route}
        className="nextra-sidebar-item"
        open={isActive || pathname.startsWith(route + "/")}
      >
        <summary className="nextra-sidebar-summary">{title}</summary>
        <ul className="nextra-sidebar-nested">
          {itemAny.children?.map((child: PageMapItem) => renderItem(child))}
        </ul>
      </details>
    ) : (
      <li
        key={route}
        className={`nextra-sidebar-item ${isActive ? "active" : ""}`}
      >
        <Anchor href={route} className="nextra-sidebar-link">
          {title}
        </Anchor>
      </li>
    );
  };

  return (
    <aside className="nextra-sidebar">
      <ul className="nextra-sidebar-list">
        {sidebarItems.map((item) => renderItem(item))}
      </ul>
    </aside>
  );
};
