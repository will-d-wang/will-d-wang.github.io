import { render, screen } from "@testing-library/react";
import { usePathname } from "next/navigation";
import type { PageMapItem } from "nextra";
import { Sidebar } from "../sidebar";

// Mock dependencies
jest.mock("next/navigation");

const mockUsePathname = usePathname as jest.MockedFunction<typeof usePathname>;

describe("Sidebar Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Route Prefixing Logic", () => {
    it("should prepend /docs/ to routes without leading slash", () => {
      mockUsePathname.mockReturnValue("/");

      const pageMap: PageMapItem[] = [
        {
          name: "Algorithms",
          route: "Algorithms",
        } as any,
      ];

      render(<Sidebar pageMap={pageMap} />);

      const link = screen.getByText("Algorithms");
      expect(link.closest("a")).toHaveAttribute("href", "/docs/Algorithms");
    });

    it("should prepend /docs to routes starting with / but not /docs or /blog", () => {
      mockUsePathname.mockReturnValue("/");

      const pageMap: PageMapItem[] = [
        {
          name: "Algorithms",
          route: "/Algorithms",
        } as any,
      ];

      render(<Sidebar pageMap={pageMap} />);

      const link = screen.getByText("Algorithms");
      expect(link.closest("a")).toHaveAttribute("href", "/docs/Algorithms");
    });

    it("should not modify routes already starting with /docs", () => {
      mockUsePathname.mockReturnValue("/docs");

      const pageMap: PageMapItem[] = [
        {
          name: "Algorithms",
          route: "/docs/Algorithms",
        } as any,
      ];

      render(<Sidebar pageMap={pageMap} />);

      const link = screen.getByText("Algorithms");
      expect(link.closest("a")).toHaveAttribute("href", "/docs/Algorithms");
    });

    it("should not modify routes starting with /blog", () => {
      mockUsePathname.mockReturnValue("/blog");

      const pageMap: PageMapItem[] = [
        {
          name: "Blog Post",
          route: "/blog/post",
        } as any,
      ];

      render(<Sidebar pageMap={pageMap} />);

      const link = screen.getByText("Blog Post");
      expect(link.closest("a")).toHaveAttribute("href", "/blog/post");
    });

    it("should not modify root route /", () => {
      mockUsePathname.mockReturnValue("/");

      const pageMap: PageMapItem[] = [
        {
          name: "Home",
          route: "/",
        } as any,
      ];

      render(<Sidebar pageMap={pageMap} />);

      const link = screen.getByText("Home");
      expect(link.closest("a")).toHaveAttribute("href", "/");
    });

    it("should handle empty routes gracefully", () => {
      mockUsePathname.mockReturnValue("/");

      const pageMap: PageMapItem[] = [
        {
          name: "Empty",
          route: "",
        } as any,
      ];

      render(<Sidebar pageMap={pageMap} />);

      // Should not throw error
      expect(screen.getByText("Empty")).toBeInTheDocument();
    });

    it("should handle href property in addition to route", () => {
      mockUsePathname.mockReturnValue("/");

      const pageMap: PageMapItem[] = [
        {
          name: "External Link",
          href: "external-page",
        } as any,
      ];

      render(<Sidebar pageMap={pageMap} />);

      const link = screen.getByText("External Link");
      expect(link.closest("a")).toHaveAttribute("href", "/docs/external-page");
    });
  });

  describe("Active State Detection", () => {
    it("should mark current route as active", () => {
      mockUsePathname.mockReturnValue("/docs/Algorithms");

      const pageMap: PageMapItem[] = [
        {
          name: "Algorithms",
          route: "/docs/Algorithms",
        } as any,
      ];

      render(<Sidebar pageMap={pageMap} />);

      const listItem = screen.getByText("Algorithms").closest("li");
      expect(listItem).toHaveClass("active");
    });

    it("should not mark inactive routes as active", () => {
      mockUsePathname.mockReturnValue("/docs/Database");

      const pageMap: PageMapItem[] = [
        {
          name: "Algorithms",
          route: "/docs/Algorithms",
        } as any,
      ];

      render(<Sidebar pageMap={pageMap} />);

      const listItem = screen.getByText("Algorithms").closest("li");
      expect(listItem).not.toHaveClass("active");
    });

    it("should open details element when current path starts with route", () => {
      mockUsePathname.mockReturnValue("/docs/Algorithms/sorting");

      const pageMap: PageMapItem[] = [
        {
          name: "Algorithms",
          route: "/docs/Algorithms",
          children: [
            {
              name: "Sorting",
              route: "/docs/Algorithms/sorting",
            },
          ],
        } as any,
      ];

      render(<Sidebar pageMap={pageMap} />);

      const details = screen.getByText("Algorithms").closest("details");
      expect(details).toHaveAttribute("open");
    });
  });

  describe("Nested Children Rendering", () => {
    it("should render nested children correctly", () => {
      mockUsePathname.mockReturnValue("/docs");

      const pageMap: PageMapItem[] = [
        {
          name: "Algorithms",
          route: "/docs/Algorithms",
          children: [
            {
              name: "DP",
              route: "/docs/Algorithms/dp",
            },
            {
              name: "Greedy",
              route: "/docs/Algorithms/greedy",
            },
          ],
        } as any,
      ];

      render(<Sidebar pageMap={pageMap} />);

      expect(screen.getByText("Algorithms")).toBeInTheDocument();
      expect(screen.getByText("DP")).toBeInTheDocument();
      expect(screen.getByText("Greedy")).toBeInTheDocument();
    });

    it("should render deeply nested children", () => {
      mockUsePathname.mockReturnValue("/docs");

      const pageMap: PageMapItem[] = [
        {
          name: "Algorithms",
          route: "/docs/Algorithms",
          children: [
            {
              name: "DP",
              route: "/docs/Algorithms/dp",
              children: [
                {
                  name: "Kadane",
                  route: "/docs/Algorithms/dp/kadane",
                },
              ],
            } as any,
          ],
        } as any,
      ];

      render(<Sidebar pageMap={pageMap} />);

      expect(screen.getByText("Algorithms")).toBeInTheDocument();
      expect(screen.getByText("DP")).toBeInTheDocument();
      expect(screen.getByText("Kadane")).toBeInTheDocument();
    });

    it("should use details element for items with children", () => {
      mockUsePathname.mockReturnValue("/docs");

      const pageMap: PageMapItem[] = [
        {
          name: "Algorithms",
          route: "/docs/Algorithms",
          children: [
            {
              name: "DP",
              route: "/docs/Algorithms/dp",
            },
          ],
        } as any,
      ];

      render(<Sidebar pageMap={pageMap} />);

      const summary = screen.getByText("Algorithms");
      expect(summary.tagName).toBe("SUMMARY");
      expect(summary.closest("details")).toBeInTheDocument();
    });

    it("should use li element for items without children", () => {
      mockUsePathname.mockReturnValue("/docs");

      const pageMap: PageMapItem[] = [
        {
          name: "Algorithms",
          route: "/docs/Algorithms",
        } as any,
      ];

      render(<Sidebar pageMap={pageMap} />);

      const link = screen.getByText("Algorithms");
      expect(link.closest("li")).toBeInTheDocument();
      expect(link.closest("details")).not.toBeInTheDocument();
    });
  });

  describe("Docs Section Filtering", () => {
    it("should filter to show only docs routes when in /docs section", () => {
      mockUsePathname.mockReturnValue("/docs/Algorithms");

      const pageMap: PageMapItem[] = [
        {
          name: "Algorithms",
          route: "/docs/Algorithms",
        } as any,
        {
          name: "Blog",
          route: "/blog",
        } as any,
      ];

      render(<Sidebar pageMap={pageMap} />);

      expect(screen.getByText("Algorithms")).toBeInTheDocument();
      expect(screen.queryByText("Blog")).not.toBeInTheDocument();
    });

    it("should show Algorithms section when on /docs/Algorithms page", () => {
      mockUsePathname.mockReturnValue("/docs/Algorithms");

      const pageMap: PageMapItem[] = [
        {
          name: "Algorithms",
          route: "/docs/Algorithms",
          children: [
            {
              name: "DP",
              route: "/docs/Algorithms/dp_maximum_subarray_kadane_algorithm",
            },
            {
              name: "Greedy",
              route: "/docs/Algorithms/greedy_vs_dp",
            },
          ],
        } as any,
      ];

      render(<Sidebar pageMap={pageMap} />);

      // Should show the Algorithms section
      expect(screen.getByText("Algorithms")).toBeInTheDocument();
      expect(screen.getByText("DP")).toBeInTheDocument();
      expect(screen.getByText("Greedy")).toBeInTheDocument();
    });

    it("should show content routes without /docs prefix when in docs section", () => {
      mockUsePathname.mockReturnValue("/docs/Algorithms/sorting");

      const pageMap: PageMapItem[] = [
        {
          name: "Algorithms",
          route: "/docs/Algorithms",
          children: [
            {
              name: "Sorting",
              route: "/docs/Algorithms/sorting",
            },
          ],
        } as any,
      ];

      render(<Sidebar pageMap={pageMap} />);

      expect(screen.getByText("Algorithms")).toBeInTheDocument();
      expect(screen.getByText("Sorting")).toBeInTheDocument();
    });

    it("should show all routes when not in /docs section", () => {
      mockUsePathname.mockReturnValue("/");

      const pageMap: PageMapItem[] = [
        {
          name: "Algorithms",
          route: "/docs/Algorithms",
        } as any,
        {
          name: "Blog",
          route: "/blog",
        } as any,
      ];

      render(<Sidebar pageMap={pageMap} />);

      expect(screen.getByText("Algorithms")).toBeInTheDocument();
      expect(screen.getByText("Blog")).toBeInTheDocument();
    });
  });

  describe("Title Rendering", () => {
    it("should use title property if available", () => {
      mockUsePathname.mockReturnValue("/docs");

      const pageMap: PageMapItem[] = [
        {
          name: "dp",
          title: "Dynamic Programming",
          route: "/docs/Algorithms/dp",
        } as any,
      ];

      render(<Sidebar pageMap={pageMap} />);

      expect(screen.getByText("Dynamic Programming")).toBeInTheDocument();
    });

    it("should fallback to name if title not available", () => {
      mockUsePathname.mockReturnValue("/docs");

      const pageMap: PageMapItem[] = [
        {
          name: "Algorithms",
          route: "/docs/Algorithms",
        } as any,
      ];

      render(<Sidebar pageMap={pageMap} />);

      expect(screen.getByText("Algorithms")).toBeInTheDocument();
    });

    it('should use "Page" as fallback when both title and name are missing', () => {
      mockUsePathname.mockReturnValue("/docs");

      const pageMap: PageMapItem[] = [
        {
          route: "/docs/test",
        } as any,
      ];

      render(<Sidebar pageMap={pageMap} />);

      expect(screen.getByText("Page")).toBeInTheDocument();
    });
  });

  describe("CSS Classes", () => {
    it("should apply correct classes to sidebar container", () => {
      mockUsePathname.mockReturnValue("/docs");

      const { container } = render(<Sidebar pageMap={[]} />);

      const aside = container.querySelector("aside");
      expect(aside).toHaveClass("nextra-sidebar");

      const ul = container.querySelector("ul");
      expect(ul).toHaveClass("nextra-sidebar-list");
    });

    it("should apply correct classes to sidebar items", () => {
      mockUsePathname.mockReturnValue("/docs");

      const pageMap: PageMapItem[] = [
        {
          name: "Algorithms",
          route: "/docs/Algorithms",
        } as any,
      ];

      render(<Sidebar pageMap={pageMap} />);

      const listItem = screen.getByText("Algorithms").closest("li");
      expect(listItem).toHaveClass("nextra-sidebar-item");

      const link = screen.getByText("Algorithms");
      expect(link).toHaveClass("nextra-sidebar-link");
    });
  });
});
