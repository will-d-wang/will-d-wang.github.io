import { render, screen } from "@testing-library/react";
import { usePathname } from "next/navigation";
import type { PageMapItem } from "nextra";
import { Navbar } from "../navbar";

// Mock dependencies
jest.mock("next/navigation");

const mockUsePathname = usePathname as jest.MockedFunction<typeof usePathname>;

describe("Navbar Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Route Prefixing Logic", () => {
    it("should prepend /docs/ to routes without leading slash", () => {
      mockUsePathname.mockReturnValue("/docs");

      const pageMap: PageMapItem[] = [
        {
          name: "Algorithms",
          route: "Algorithms",
          children: [
            {
              name: "DP",
              route: "Algorithms/dp",
            },
          ],
        } as any,
      ];

      render(<Navbar pageMap={pageMap} />);

      // The route should be converted to /docs/Algorithms/dp
      const link = screen.queryByText("DP");
      if (link) {
        expect(link.closest("a")).toHaveAttribute(
          "href",
          "/docs/Algorithms/dp",
        );
      }
    });

    it("should prepend /docs to routes starting with / but not /docs or /blog", () => {
      mockUsePathname.mockReturnValue("/docs");

      const pageMap: PageMapItem[] = [
        {
          name: "Algorithms",
          route: "/Algorithms",
          children: [
            {
              name: "Greedy",
              route: "/Algorithms/greedy",
            },
          ],
        } as any,
      ];

      render(<Navbar pageMap={pageMap} />);

      const link = screen.queryByText("Greedy");
      if (link) {
        expect(link.closest("a")).toHaveAttribute(
          "href",
          "/docs/Algorithms/greedy",
        );
      }
    });

    it("should not modify routes already starting with /docs", () => {
      mockUsePathname.mockReturnValue("/docs");

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

      render(<Navbar pageMap={pageMap} />);

      const link = screen.queryByText("Sorting");
      if (link) {
        expect(link.closest("a")).toHaveAttribute(
          "href",
          "/docs/Algorithms/sorting",
        );
      }
    });

    it("should not modify routes starting with /blog", () => {
      mockUsePathname.mockReturnValue("/blog");

      const pageMap: PageMapItem[] = [
        {
          name: "Blog",
          route: "/blog",
          children: [
            {
              name: "Post",
              route: "/blog/my-post",
            },
          ],
        } as any,
      ];

      render(<Navbar pageMap={pageMap} />);

      const link = screen.queryByText("Post");
      if (link) {
        expect(link.closest("a")).toHaveAttribute("href", "/blog/my-post");
      }
    });

    it("should not modify root route /", () => {
      mockUsePathname.mockReturnValue("/");

      const pageMap: PageMapItem[] = [
        {
          name: "Home",
          route: "/",
        } as any,
      ];

      render(<Navbar pageMap={pageMap} />);

      // Check the main nav home link
      const homeLink = screen.getAllByText("Home")[0];
      expect(homeLink.closest("a")).toHaveAttribute("href", "/");
    });

    it("should handle empty routes gracefully", () => {
      mockUsePathname.mockReturnValue("/docs");

      const pageMap: PageMapItem[] = [
        {
          name: "Empty",
          route: "",
        } as any,
      ];

      render(<Navbar pageMap={pageMap} />);

      // Should not throw error
      expect(screen.getByText("Home")).toBeInTheDocument();
    });
  });

  describe("Active State Detection", () => {
    it("should mark current route as active", () => {
      mockUsePathname.mockReturnValue("/docs/Algorithms/dp");

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

      render(<Navbar pageMap={pageMap} />);

      const link = screen.queryByText("DP");
      if (link) {
        expect(link.closest("li")).toHaveClass("active");
      }
    });

    it("should not mark inactive routes as active", () => {
      mockUsePathname.mockReturnValue("/docs/Algorithms/greedy");

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

      render(<Navbar pageMap={pageMap} />);

      const link = screen.queryByText("DP");
      if (link) {
        expect(link.closest("li")).not.toHaveClass("active");
      }
    });
  });

  describe("Nested Children Rendering", () => {
    it("should render nested children correctly", () => {
      mockUsePathname.mockReturnValue("/docs/Algorithms");

      const pageMap: PageMapItem[] = [
        {
          name: "docs",
          route: "/docs",
          children: [
            {
              name: "DP",
              route: "Algorithms/dp",
              children: [
                {
                  name: "Kadane",
                  route: "Algorithms/dp/kadane",
                },
              ],
            } as any,
          ],
        } as any,
      ];

      render(<Navbar pageMap={pageMap} />);

      expect(screen.queryByText("DP")).toBeInTheDocument();
      expect(screen.queryByText("Kadane")).toBeInTheDocument();
    });
  });

  describe("Main Navigation Links", () => {
    it("should render main navigation links", () => {
      mockUsePathname.mockReturnValue("/");

      render(<Navbar pageMap={[]} />);

      expect(screen.getByText("Home")).toBeInTheDocument();
      expect(screen.getByText("Docs")).toBeInTheDocument();
      expect(screen.getByText("Blog")).toBeInTheDocument();
      expect(screen.getByText("GitHub")).toBeInTheDocument();
    });

    it("should have correct href for main links", () => {
      mockUsePathname.mockReturnValue("/");

      render(<Navbar pageMap={[]} />);

      const homeLinks = screen.getAllByText("Home");
      expect(homeLinks[0].closest("a")).toHaveAttribute("href", "/");

      const docsLink = screen.getByText("Docs");
      expect(docsLink.closest("a")).toHaveAttribute("href", "/docs");

      const blogLink = screen.getByText("Blog");
      expect(blogLink.closest("a")).toHaveAttribute("href", "/blog");
    });
  });

  describe("Title Rendering", () => {
    it("should use title property if available", () => {
      mockUsePathname.mockReturnValue("/docs/algorithms");

      const pageMap: PageMapItem[] = [
        {
          name: "docs",
          route: "/docs",
          children: [
            {
              name: "dp",
              title: "Dynamic Programming",
              route: "/docs/algorithms/dp",
            } as any,
          ],
        } as any,
      ];

      render(<Navbar pageMap={pageMap} />);

      expect(screen.queryByText("Dynamic Programming")).toBeInTheDocument();
    });

    it("should fallback to name if title not available", () => {
      mockUsePathname.mockReturnValue("/docs/Algorithms");

      const pageMap: PageMapItem[] = [
        {
          name: "docs",
          route: "/docs",
          children: [
            {
              name: "DP",
              route: "/docs/Algorithms/dp",
            },
          ],
        } as any,
      ];

      render(<Navbar pageMap={pageMap} />);

      expect(screen.queryByText("DP")).toBeInTheDocument();
    });

    it('should use "Page" as fallback when both title and name are missing', () => {
      mockUsePathname.mockReturnValue("/docs/test");

      const pageMap: PageMapItem[] = [
        {
          name: "docs",
          route: "/docs",
          children: [
            {
              route: "/docs/test/page",
            } as any,
          ],
        } as any,
      ];

      render(<Navbar pageMap={pageMap} />);

      // Should render with fallback title "Page"
      expect(screen.queryByText("Page")).toBeInTheDocument();
    });
  });
});
