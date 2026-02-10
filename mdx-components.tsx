import { useMDXComponents as getNextraComponents } from "nextra/mdx-components";
import type { ComponentType } from "react";

type MDXComponents = Record<string, ComponentType<any>>;

const defaultComponents = getNextraComponents({});

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...defaultComponents,
    ...components,
  };
}
