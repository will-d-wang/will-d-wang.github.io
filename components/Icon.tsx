import Image from "next/image";
import Link from "next/link";

export enum IconType {
  Tech = "tech",
  Company = "company",
  School = "school",
}

export enum TechType {
  Languages = "Languages",
  BackendWeb = "Backend & Web",
  CloudInfra = "Cloud & Infra",
  DevOpsCiCd = "DevOps & CI/CD",
  DataMl = "Data & ML",
  Tools = "Tools",
}

interface BaseIconDefinition {
  href: string;
  filename: string;
}

interface TechIconDefinition extends BaseIconDefinition {
  type: IconType.Tech;
  techType: TechType;
}

interface CompanyIconDefinition extends BaseIconDefinition {
  type: IconType.Company;
}

interface SchoolIconDefinition extends BaseIconDefinition {
  type: IconType.School;
}

type IconDefinition =
  | TechIconDefinition
  | CompanyIconDefinition
  | SchoolIconDefinition;

interface BaseResolvedIconData extends Omit<BaseIconDefinition, "filename"> {
  src: string;
}

export interface TechIconData
  extends BaseResolvedIconData,
    Omit<TechIconDefinition, "filename"> {}

export interface CompanyIconData
  extends BaseResolvedIconData,
    Omit<CompanyIconDefinition, "filename"> {}

export interface SchoolIconData
  extends BaseResolvedIconData,
    Omit<SchoolIconDefinition, "filename"> {}

export type IconData = TechIconData | CompanyIconData | SchoolIconData;

const ICON_BASE_PATHS: Record<IconType, string> = {
  [IconType.Tech]: "/icons/tech",
  [IconType.Company]: "/icons/company",
  [IconType.School]: "/icons/school",
};

function getIconSrc({
  type,
  filename,
}: Pick<IconDefinition, "type" | "filename">) {
  return `${ICON_BASE_PATHS[type]}/${filename}`;
}

export const ICON_DATA: Record<IconType, Record<string, IconDefinition>> = {
  [IconType.Tech]: {
    C: {
      type: IconType.Tech,
      techType: TechType.Languages,
      href: "https://www.cprogramming.com",
      filename: "C.svg",
    },
    "C++": {
      type: IconType.Tech,
      techType: TechType.Languages,
      href: "https://isocpp.org",
      filename: "CPlusPlus.svg",
    },
    Python: {
      type: IconType.Tech,
      techType: TechType.Languages,
      href: "https://www.python.org/doc",
      filename: "Python.svg",
    },
    Groovy: {
      type: IconType.Tech,
      techType: TechType.Languages,
      href: "https://groovy-lang.org/documentation.html",
      filename: "Groovy.svg",
    },
    Golang: {
      type: IconType.Tech,
      techType: TechType.Languages,
      href: "https://go.dev",
      filename: "Golang.svg",
    },
    Java: {
      type: IconType.Tech,
      techType: TechType.Languages,
      href: "https://dev.java",
      filename: "Java.svg",
    },
    JavaScript: {
      type: IconType.Tech,
      techType: TechType.Languages,
      href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
      filename: "JavaScript.svg",
    },
    "Node.js": {
      type: IconType.Tech,
      techType: TechType.BackendWeb,
      href: "https://nodejs.org/",
      filename: "NodeJS.svg",
    },
    Express: {
      type: IconType.Tech,
      techType: TechType.BackendWeb,
      href: "https://expressjs.com/",
      filename: "Express.svg",
    },
    React: {
      type: IconType.Tech,
      techType: TechType.BackendWeb,
      href: "https://reactjs.org/",
      filename: "React.svg",
    },
    "Next.js": {
      type: IconType.Tech,
      techType: TechType.BackendWeb,
      href: "https://nextjs.org/",
      filename: "NextJS.svg",
    },
    "D3.js": {
      type: IconType.Tech,
      techType: TechType.DataMl,
      href: "https://d3js.org/",
      filename: "D3js.svg",
    },
    Cloudflare: {
      type: IconType.Tech,
      techType: TechType.CloudInfra,
      href: "https://www.cloudflare.com/",
      filename: "Cloudflare.svg",
    },
    Grafana: {
      type: IconType.Tech,
      techType: TechType.CloudInfra,
      href: "https://grafana.com/",
      filename: "Grafana.svg",
    },
    Helm: {
      type: IconType.Tech,
      techType: TechType.CloudInfra,
      href: "https://helm.sh/",
      filename: "Helm.svg",
    },
    LaTeX: {
      type: IconType.Tech,
      techType: TechType.Tools,
      href: "https://www.latex-project.org/",
      filename: "LaTeX.svg",
    },
    NGINX: {
      type: IconType.Tech,
      techType: TechType.BackendWeb,
      href: "https://www.nginx.com/",
      filename: "NGINX.svg",
    },
    NPM: {
      type: IconType.Tech,
      techType: TechType.Tools,
      href: "https://www.npmjs.com/",
      filename: "NPM.svg",
    },
    NumPy: {
      type: IconType.Tech,
      techType: TechType.DataMl,
      href: "https://numpy.org/",
      filename: "NumPy.svg",
    },
    "Oh My Zsh": {
      type: IconType.Tech,
      techType: TechType.Tools,
      href: "https://ohmyz.sh/",
      filename: "OhMyZsh.svg",
    },
    "Scikit-learn": {
      type: IconType.Tech,
      techType: TechType.DataMl,
      href: "https://scikit-learn.org/",
      filename: "ScikitLearn.svg",
    },
    "Tailwind CSS": {
      type: IconType.Tech,
      techType: TechType.BackendWeb,
      href: "https://tailwindcss.com/",
      filename: "TailwindCSS.svg",
    },
    Vercel: {
      type: IconType.Tech,
      techType: TechType.CloudInfra,
      href: "https://vercel.com/",
      filename: "Vercel.svg",
    },
    "HashiCorp Vault": {
      type: IconType.Tech,
      techType: TechType.CloudInfra,
      href: "https://www.hashicorp.com/products/vault",
      filename: "HashiCorpVault.svg",
    },
    TypeScript: {
      type: IconType.Tech,
      techType: TechType.Languages,
      href: "https://www.typescriptlang.org/docs/",
      filename: "TypeScript.svg",
    },
    Gradle: {
      type: IconType.Tech,
      techType: TechType.Tools,
      href: "https://docs.gradle.org/current/userguide/userguide.html",
      filename: "Gradle.svg",
    },
    Jenkins: {
      type: IconType.Tech,
      techType: TechType.DevOpsCiCd,
      href: "https://www.jenkins.io/doc",
      filename: "Jenkins.svg",
    },
    Ubuntu: {
      type: IconType.Tech,
      techType: TechType.DevOpsCiCd,
      href: "https://ubuntu.com",
      filename: "Ubuntu.svg",
    },
    VIM: {
      type: IconType.Tech,
      techType: TechType.Tools,
      href: "https://www.vim.org",
      filename: "VIM.svg",
    },
    Git: {
      type: IconType.Tech,
      techType: TechType.Tools,
      href: "https://git-scm.com/doc",
      filename: "Git.svg",
    },
    Docker: {
      type: IconType.Tech,
      techType: TechType.DevOpsCiCd,
      href: "https://docs.docker.com",
      filename: "Docker.svg",
    },
    Elasticsearch: {
      type: IconType.Tech,
      techType: TechType.DataMl,
      href: "https://www.elastic.co/elasticsearch",
      filename: "ElasticSearch.svg",
    },
    Logstash: {
      type: IconType.Tech,
      techType: TechType.DataMl,
      href: "https://www.elastic.co/logstash",
      filename: "Logstash.svg",
    },
    Kibana: {
      type: IconType.Tech,
      techType: TechType.DataMl,
      href: "https://www.elastic.co/kibana",
      filename: "Kibana.svg",
    },
    Kubernetes: {
      type: IconType.Tech,
      techType: TechType.CloudInfra,
      href: "https://kubernetes.io/docs/home",
      filename: "Kubernetes.svg",
    },
    Vagrant: {
      type: IconType.Tech,
      techType: TechType.CloudInfra,
      href: "https://www.vagrantup.com/docs",
      filename: "Vagrant.svg",
    },
    Github: {
      type: IconType.Tech,
      techType: TechType.DevOpsCiCd,
      href: "https://docs.github.com/en",
      filename: "Github.svg",
    },
    "VS-Code": {
      type: IconType.Tech,
      techType: TechType.Tools,
      href: "https://code.visualstudio.com/docs",
      filename: "VSCode.svg",
    },
    Pandas: {
      type: IconType.Tech,
      techType: TechType.DataMl,
      href: "https://pandas.pydata.org",
      filename: "Pandas.svg",
    },
    Pytest: {
      type: IconType.Tech,
      techType: TechType.DevOpsCiCd,
      href: "https://docs.pytest.org",
      filename: "Pytest.svg",
    },
    Pydantic: {
      type: IconType.Tech,
      techType: TechType.BackendWeb,
      href: "https://docs.pydantic.dev",
      filename: "Pydantic.png",
    },
    Terraform: {
      type: IconType.Tech,
      techType: TechType.CloudInfra,
      href: "https://www.terraform.io",
      filename: "Terraform.svg",
    },
    GCP: {
      type: IconType.Tech,
      techType: TechType.CloudInfra,
      href: "https://cloud.google.com",
      filename: "GCP.svg",
    },
    AWS: {
      type: IconType.Tech,
      techType: TechType.CloudInfra,
      href: "https://aws.amazon.com",
      filename: "AWS.svg",
    },
    Azure: {
      type: IconType.Tech,
      techType: TechType.CloudInfra,
      href: "https://azure.microsoft.com",
      filename: "Azure.svg",
    },
    Linux: {
      type: IconType.Tech,
      techType: TechType.DevOpsCiCd,
      href: "https://www.linux.org",
      filename: "Linux.svg",
    },
    "Apache Spark": {
      type: IconType.Tech,
      techType: TechType.DataMl,
      href: "https://spark.apache.org",
      filename: "ApacheSpark.svg",
    },
    PySpark: {
      type: IconType.Tech,
      techType: TechType.DataMl,
      href: "https://spark.apache.org/docs/latest/api/python/",
      filename: "PySpark.svg",
    },
    gRPC: {
      type: IconType.Tech,
      techType: TechType.CloudInfra,
      href: "https://grpc.io/docs/",
      filename: "gRPC.svg",
    },
    PyTorch: {
      type: IconType.Tech,
      techType: TechType.DataMl,
      href: "https://pytorch.org",
      filename: "PyTorch.svg",
    },
    MongoDB: {
      type: IconType.Tech,
      techType: TechType.DataMl,
      href: "https://www.mongodb.com",
      filename: "MongoDB.svg",
    },
    TeamCity: {
      type: IconType.Tech,
      techType: TechType.DevOpsCiCd,
      href: "https://www.jetbrains.com/help/teamcity/teamcity-documentation.html",
      filename: "TeamCity.png",
    },
    JIRA: {
      type: IconType.Tech,
      techType: TechType.Tools,
      href: "https://www.atlassian.com/software/jira",
      filename: "JIRA.svg",
    },
    Confluence: {
      type: IconType.Tech,
      techType: TechType.Tools,
      href: "https://www.atlassian.com/software/confluence",
      filename: "Confluence.svg",
    },
    Bash: {
      type: IconType.Tech,
      techType: TechType.Languages,
      href: "https://www.gnu.org/software/bash/",
      filename: "Bash.svg",
    },
    CMake: {
      type: IconType.Tech,
      techType: TechType.Tools,
      href: "https://cmake.org",
      filename: "CMake.svg",
    },
    MySQL: {
      type: IconType.Tech,
      techType: TechType.DataMl,
      href: "https://www.mysql.com",
      filename: "MySQL.svg",
    },
    Windows11: {
      type: IconType.Tech,
      techType: TechType.DevOpsCiCd,
      href: "https://www.microsoft.com/en-us/windows/windows-11",
      filename: "Windows11.svg",
    },
  },
  [IconType.Company]: {
    HP: {
      type: IconType.Company,
      href: "https://www.hp.com",
      filename: "hp.svg",
    },
    Intel: {
      type: IconType.Company,
      href: "https://www.intel.com",
      filename: "intel.svg",
    },
    Ericsson: {
      type: IconType.Company,
      href: "https://www.ericsson.com",
      filename: "ericsson.svg",
    },
    "HCL Technologies": {
      type: IconType.Company,
      href: "https://www.hcltech.com",
      filename: "hcltech.svg",
    },
    "Sierra Wireless": {
      type: IconType.Company,
      href: "https://www.sierrawireless.com",
      filename: "sierra-wireless.svg",
    },
  },
  [IconType.School]: {
    "Georgia Tech": {
      type: IconType.School,
      href: "https://www.gatech.edu",
      filename: "Georgia_Tech.svg",
    },
    SFU: {
      type: IconType.School,
      href: "https://www.sfu.ca",
      filename: "SFU.svg",
    },
  },
};

export const ALL_TECH_NAMES = Object.keys(ICON_DATA[IconType.Tech]);

const ICON_ALIASES: Partial<Record<IconType, Record<string, string>>> = {
  [IconType.Tech]: {
    nodejs: "Node.js",
    "node.js": "Node.js",
    nextjs: "Next.js",
    d3: "D3.js",
    latex: "LaTeX",
    nginx: "NGINX",
    npm: "NPM",
    "oh my zsh": "Oh My Zsh",
    "oh myzsh": "Oh My Zsh",
    ohmyzsh: "Oh My Zsh",
    "scikit-learn": "Scikit-learn",
    scikitlearn: "Scikit-learn",
    tailwindcss: "Tailwind CSS",
  },
  [IconType.Company]: {
    hp: "HP",
    "hp inc.": "HP",
    "intel corporation": "Intel",
    "intel corporation (contractor)": "Intel",
    teradici: "HP",
    "teradici, an hp company": "HP",
    hcltech: "HCL Technologies",
    ericsson: "Ericsson",
    "sierra wireless": "Sierra Wireless",
  },
  [IconType.School]: {
    "georgia institute of technology": "Georgia Tech",
    "georgia institute of technology, omscs": "Georgia Tech",
    "simon fraser university": "SFU",
  },
};

function findCanonicalName(name: string, iconType: IconType): string | null {
  const normalizedName = name.trim();
  const aliases = ICON_ALIASES[iconType] ?? {};
  const canonicalName = aliases[normalizedName.toLowerCase()] ?? normalizedName;
  const iconGroup = ICON_DATA[iconType];

  if (iconGroup[canonicalName]) {
    return canonicalName;
  }

  const matchingKey = Object.keys(iconGroup).find(
    (key) => key.toLowerCase() === canonicalName.toLowerCase(),
  );

  return matchingKey ?? null;
}

export function getIconData(
  name: string,
  type: IconType.Tech,
): TechIconData | null;
export function getIconData(
  name: string,
  type: IconType.Company,
): CompanyIconData | null;
export function getIconData(
  name: string,
  type: IconType.School,
): SchoolIconData | null;
export function getIconData(name: string, type: IconType): IconData | null;
export function getIconData(name: string, type?: IconType): IconData | null {
  const typesToSearch = type
    ? [type]
    : [IconType.Tech, IconType.Company, IconType.School];

  for (const iconType of typesToSearch) {
    const canonicalName = findCanonicalName(name, iconType);

    if (!canonicalName) {
      continue;
    }

    const iconData = ICON_DATA[iconType][canonicalName];

    if (iconData) {
      return {
        ...iconData,
        src: getIconSrc(iconData),
      };
    }
  }

  return null;
}

interface IconProps {
  name: string;
  type?: IconType;
  width?: number;
  height?: number;
  alt?: string;
}

export function Icon({ name, type, width = 60, height = 60, alt }: IconProps) {
  const iconData = getIconData(name, type);

  if (!iconData) {
    console.warn(`Icon data not found for: ${name}`);
    return null;
  }

  return (
    <Link href={iconData.href}>
      <Image
        src={iconData.src}
        alt={alt ?? name}
        width={width}
        height={height}
      />
    </Link>
  );
}
