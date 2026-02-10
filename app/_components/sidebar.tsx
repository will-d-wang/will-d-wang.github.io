"use client";

import { usePathname } from "next/navigation";
import type { PageMapItem } from "nextra";
import { Anchor } from "nextra/components";
import { normalizePages } from "nextra/normalize-pages";
import type { FC } from "react";

export const Sidebar: FC<{ pageMap: PageMapItem[] }> = ({ pageMap }) => {
  const pathname = usePathname();

  const { docsDirectories, flattenedItems } = normalizePages({
    list: pageMap,
    route: pathname,
  });

  // Determine which section we're in
  const currentSection = pathname.split("/")[1] || "index";

  // Find the pages for the current section
  const sectionPages =
    currentSection === "index"
      ? pageMap
      : pageMap.find(
          (item) =>
            item.route === `/${currentSection}` || item.name === currentSection,
        );

  const itemsToShow =
    sectionPages && "children" in sectionPages
      ? sectionPages.children
      : docsDirectories;

  const renderItem = (item: PageMapItem): JSX.Element => {
    const route = item.route || ("href" in item ? (item.href as string) : "");
    const { title } = item;
    const isActive = pathname === route;

    return "children" in item ? (
      <details
        key={route}
        className="nextra-sidebar-item"
        open={isActive || pathname.startsWith(route + "/")}
      >
        <summary className="nextra-sidebar-summary">{title}</summary>
        <ul className="nextra-sidebar-nested">
          {item.children.map((child) => renderItem(child))}
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
        {itemsToShow && Array.isArray(itemsToShow)
          ? itemsToShow.map((item) => renderItem(item))
          : docsDirectories.map((item) => renderItem(item))}
      </ul>
    </aside>
  );
};
