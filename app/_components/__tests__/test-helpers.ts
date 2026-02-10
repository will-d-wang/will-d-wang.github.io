import React from 'react';
import type { PageMapItem } from 'nextra';

/**
 * Mock page map factory for testing
 */
export const createMockPageMap = (
  overrides?: Partial<PageMapItem>[],
): PageMapItem[] => {
  const defaultPageMap: PageMapItem[] = [
    {
      name: 'index',
      route: '/',
      frontMatter: {
        title: 'Home',
      },
    } as any,
    {
      name: 'Algorithms',
      route: '/Algorithms',
      children: [
        {
          name: 'index',
          route: '/Algorithms',
          frontMatter: { title: 'Algorithms' },
        },
        {
          name: 'dp_maximum_subarray_kadane_algorithm',
          route: '/Algorithms/dp_maximum_subarray_kadane_algorithm',
          frontMatter: { title: 'Dynamic Programming' },
        },
        {
          name: 'greedy_vs_dp',
          route: '/Algorithms/greedy_vs_dp',
          frontMatter: { title: 'Greedy vs DP' },
        },
        {
          name: 'sorting_algorithm',
          route: '/Algorithms/sorting_algorithm',
          frontMatter: { title: 'Sorting Algorithm' },
        },
      ],
    } as any,
    {
      name: 'blog',
      route: '/blog',
      frontMatter: {
        title: 'Blog',
      },
    } as any,
  ];

  if (overrides) {
    return overrides as PageMapItem[];
  }

  return defaultPageMap;
};

/**
 * Mock Nextra components for testing
 */
export const mockNextraComponents = () => {
  return {
    Anchor: ({ href, children, className }: any) =>
      React.createElement('a', { href, className }, children),
  };
};

/**
 * Mock Next.js navigation hooks
 */
export const mockNextNavigation = (pathname: string = '/') => {
  const { usePathname } = require('next/navigation');
  (usePathname as jest.Mock).mockReturnValue(pathname);
};
