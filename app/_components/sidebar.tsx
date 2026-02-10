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

  const renderItem = (item: PageMapItem): JSX.Element => {
    const itemAny = item as any;
    const route = itemAny.route || itemAny.href || "";
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
        {docsDirectories.map((item) => renderItem(item))}
      </ul>
    </aside>
  );
};
