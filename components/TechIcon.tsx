import Image from "next/image";
import Link from "next/link";

// Maps technology names used across MDX content to icon metadata for rendering
// linked tech badges. This module centralizes icon source selection so pages can
// reference tools by name without repeating URLs or asset paths.
// The icons can be found in https://techicons.dev/
export enum TechType {
  Languages = "Languages",
  BackendWeb = "Backend & Web",
  CloudInfra = "Cloud & Infra",
  DevOpsCiCd = "DevOps & CI/CD",
  DataMl = "Data & ML",
  Tools = "Tools",
}

interface TechData {
  type: TechType;
  href: string;
  src: string;
}

const TECH_DATA: Record<string, TechData> = {
  C: {
    type: TechType.Languages,
    href: "https://www.cprogramming.com",
    src: "/icons/C.svg",
  },
  "C++": {
    type: TechType.Languages,
    href: "https://isocpp.org",
    src: "/icons/CPlusPlus.svg",
  },
  Python: {
    type: TechType.Languages,
    href: "https://www.python.org/doc",
    src: "/icons/Python.svg",
  },
  Groovy: {
    type: TechType.Languages,
    href: "https://groovy-lang.org/documentation.html",
    src: "/icons/Groovy.svg",
  },
  Golang: {
    type: TechType.Languages,
    href: "https://go.dev",
    src: "/icons/Golang.svg",
  },
  Java: {
    type: TechType.Languages,
    href: "https://dev.java",
    src: "/icons/Java.svg",
  },
  JavaScript: {
    type: TechType.Languages,
    href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
    src: "/icons/JavaScript.svg",
  },
  "Node.js": {
    type: TechType.BackendWeb,
    href: "https://nodejs.org/",
    src: "/icons/NodeJS.svg",
  },
  Express: {
    type: TechType.BackendWeb,
    href: "https://expressjs.com/",
    src: "/icons/Express.svg",
  },
  React: {
    type: TechType.BackendWeb,
    href: "https://reactjs.org/",
    src: "/icons/React.svg",
  },
  "Next.js": {
    type: TechType.BackendWeb,
    href: "https://nextjs.org/",
    src: "/icons/NextJS.svg",
  },
  "D3.js": {
    type: TechType.DataMl,
    href: "https://d3js.org/",
    src: "/icons/D3js.svg",
  },
  Cloudflare: {
    type: TechType.CloudInfra,
    href: "https://www.cloudflare.com/",
    src: "/icons/Cloudflare.svg",
  },
  Grafana: {
    type: TechType.CloudInfra,
    href: "https://grafana.com/",
    src: "/icons/Grafana.svg",
  },
  Helm: {
    type: TechType.CloudInfra,
    href: "https://helm.sh/",
    src: "/icons/Helm.svg",
  },
  LaTeX: {
    type: TechType.Tools,
    href: "https://www.latex-project.org/",
    src: "/icons/LaTeX.svg",
  },
  NGINX: {
    type: TechType.BackendWeb,
    href: "https://www.nginx.com/",
    src: "/icons/NGINX.svg",
  },
  NPM: {
    type: TechType.Tools,
    href: "https://www.npmjs.com/",
    src: "/icons/NPM.svg",
  },
  NumPy: {
    type: TechType.DataMl,
    href: "https://numpy.org/",
    src: "/icons/NumPy.svg",
  },
  "Oh My Zsh": {
    type: TechType.Tools,
    href: "https://ohmyz.sh/",
    src: "/icons/OhMyZsh.svg",
  },
  "Scikit-learn": {
    type: TechType.DataMl,
    href: "https://scikit-learn.org/",
    src: "/icons/ScikitLearn.svg",
  },
  "Tailwind CSS": {
    type: TechType.BackendWeb,
    href: "https://tailwindcss.com/",
    src: "/icons/TailwindCSS.svg",
  },
  Vercel: {
    type: TechType.CloudInfra,
    href: "https://vercel.com/",
    src: "/icons/Vercel.svg",
  },
  "HashiCorp Vault": {
    type: TechType.CloudInfra,
    href: "https://www.hashicorp.com/products/vault",
    src: "/icons/HashiCorpVault.svg",
  },
  TypeScript: {
    type: TechType.Languages,
    href: "https://www.typescriptlang.org/docs/",
    src: "/icons/TypeScript.svg",
  },
  Gradle: {
    type: TechType.Tools,
    href: "https://docs.gradle.org/current/userguide/userguide.html",
    src: "/icons/Gradle.svg",
  },
  Jenkins: {
    type: TechType.DevOpsCiCd,
    href: "https://www.jenkins.io/doc",
    src: "/icons/Jenkins.svg",
  },
  Ubuntu: {
    type: TechType.Tools,
    href: "https://ubuntu.com",
    src: "/icons/Ubuntu.svg",
  },
  VIM: {
    type: TechType.Tools,
    href: "https://www.vim.org",
    src: "/icons/VIM.svg",
  },
  Git: {
    type: TechType.Tools,
    href: "https://git-scm.com/doc",
    src: "/icons/Git.svg",
  },
  Docker: {
    type: TechType.CloudInfra,
    href: "https://docs.docker.com",
    src: "/icons/Docker.svg",
  },
  Elasticsearch: {
    type: TechType.DataMl,
    href: "https://www.elastic.co/elasticsearch",
    src: "/icons/ElasticSearch.svg",
  },
  Logstash: {
    type: TechType.DataMl,
    href: "https://www.elastic.co/logstash",
    src: "/icons/Logstash.svg",
  },
  Kibana: {
    type: TechType.DataMl,
    href: "https://www.elastic.co/kibana",
    src: "/icons/Kibana.svg",
  },
  Kubernetes: {
    type: TechType.CloudInfra,
    href: "https://kubernetes.io/docs/home",
    src: "/icons/Kubernetes.svg",
  },
  Vagrant: {
    type: TechType.CloudInfra,
    href: "https://www.vagrantup.com/docs",
    src: "/icons/Vagrant.svg",
  },
  Github: {
    type: TechType.Tools,
    href: "https://docs.github.com/en",
    src: "/icons/Github.svg",
  },
  "VS-Code": {
    type: TechType.Tools,
    href: "https://code.visualstudio.com/docs",
    src: "/icons/VSCode.svg",
  },
  Pandas: {
    type: TechType.DataMl,
    href: "https://pandas.pydata.org",
    src: "/icons/Pandas.svg",
  },
  Pytest: {
    type: TechType.DevOpsCiCd,
    href: "https://docs.pytest.org",
    src: "/icons/Pytest.svg",
  },
  Pydantic: {
    type: TechType.BackendWeb,
    href: "https://docs.pydantic.dev",
    src: "/icons/Pydantic.png",
  },
  Terraform: {
    type: TechType.CloudInfra,
    href: "https://www.terraform.io",
    src: "/icons/Terraform.svg",
  },
  GCP: {
    type: TechType.CloudInfra,
    href: "https://cloud.google.com",
    src: "/icons/GCP.svg",
  },
  AWS: {
    type: TechType.CloudInfra,
    href: "https://aws.amazon.com",
    src: "/icons/AWS.svg",
  },
  Azure: {
    type: TechType.CloudInfra,
    href: "https://azure.microsoft.com",
    src: "/icons/Azure.svg",
  },
  Linux: {
    type: TechType.CloudInfra,
    href: "https://www.linux.org",
    src: "/icons/Linux.svg",
  },
  "Apache Spark": {
    type: TechType.DataMl,
    href: "https://spark.apache.org",
    src: "/icons/ApacheSpark.svg",
  },
  PySpark: {
    type: TechType.DataMl,
    href: "https://spark.apache.org/docs/latest/api/python/",
    src: "/icons/PySpark.svg",
  },
  gRPC: {
    type: TechType.BackendWeb,
    href: "https://grpc.io/docs/",
    src: "/icons/gRPC.svg",
  },
  PyTorch: {
    type: TechType.DataMl,
    href: "https://pytorch.org",
    src: "/icons/PyTorch.svg",
  },
  MongoDB: {
    type: TechType.DataMl,
    href: "https://www.mongodb.com",
    src: "/icons/MongoDB.svg",
  },
  TeamCity: {
    type: TechType.DevOpsCiCd,
    href: "https://www.jetbrains.com/help/teamcity/teamcity-documentation.html",
    src: "/icons/TeamCity.png",
  },
  JIRA: {
    type: TechType.Tools,
    href: "https://www.atlassian.com/software/jira",
    src: "/icons/JIRA.svg",
  },
  Confluence: {
    type: TechType.Tools,
    href: "https://www.atlassian.com/software/confluence",
    src: "/icons/Confluence.svg",
  },
  Bash: {
    type: TechType.Languages,
    href: "https://www.gnu.org/software/bash/",
    src: "/icons/Bash.svg",
  },
  CMake: {
    type: TechType.Tools,
    href: "https://cmake.org",
    src: "/icons/CMake.svg",
  },
  MySQL: {
    type: TechType.DataMl,
    href: "https://www.mysql.com",
    src: "/icons/MySQL.svg",
  },
  Windows11: {
    type: TechType.Tools,
    href: "https://www.microsoft.com/en-us/windows/windows-11",
    src: "/icons/Windows11.svg",
  },
};

export const ALL_TECH_NAMES = Object.keys(TECH_DATA);

const TECH_ALIASES: Record<string, string> = {
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
};

interface TechIconProps {
  alt: string;
  width?: number;
  height?: number;
}

export function getTechData(alt: string): TechData | null {
  const normalizedAlt = alt.trim();
  const canonicalName =
    TECH_ALIASES[normalizedAlt.toLowerCase()] ?? normalizedAlt;
  let techData = TECH_DATA[canonicalName];

  if (!techData) {
    const key = Object.keys(TECH_DATA).find(
      (k) => k.toLowerCase() === canonicalName.toLowerCase(),
    );
    if (key) {
      techData = TECH_DATA[key];
    }
  }

  if (!techData) {
    return null;
  }

  return techData;
}

export function TechIcon({ alt, width = 60, height = 60 }: TechIconProps) {
  const techData = getTechData(alt);

  if (!techData) {
    console.warn(`Tech data not found for: ${alt}`);
    return null;
  }

  return (
    <Link href={techData.href}>
      <Image src={techData.src} alt={alt} width={width} height={height} />
    </Link>
  );
}
