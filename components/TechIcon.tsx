import { ALL_TECH_NAMES, getIconData, Icon, IconType, TechType } from "@/components/Icon";

interface TechIconProps {
  alt: string;
  width?: number;
  height?: number;
}

export { ALL_TECH_NAMES, TechType };

export function getTechData(name: string) {
  return getIconData(name, IconType.Tech);
}

export function TechIcon({ alt, width, height }: TechIconProps) {
  return (
    <Icon
      name={alt}
      type={IconType.Tech}
      width={width}
      height={height}
      alt={alt}
    />
  );
}
