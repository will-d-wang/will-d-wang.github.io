import type { PageMapItem } from 'nextra';

export const normalizePages = ({ list }: { list: PageMapItem[]; route: string }) => ({
  topLevelNavbarItems: list,
  docsDirectories: list,
});
