import Image from "next/image";
import Link from "next/link";

// Maps technology names used across MDX content to icon metadata for rendering
// linked tech badges. This module centralizes icon source selection so pages can
// reference tools by name without repeating URLs or asset paths.
// The icons can be found in https://techicons.dev/
interface TechData {
  href: string;
  src: string;
}

const TECH_DATA: Record<string, TechData> = {
  C: {
    href: "https://www.cprogramming.com",
    src: "/icons/C.svg",
  },
  "C++": {
    href: "https://isocpp.org",
    src: "/icons/CPlusPlus.svg",
  },
  Python: {
    href: "https://www.python.org/doc",
    src: "/icons/Python.svg",
  },
  Groovy: {
    href: "https://groovy-lang.org/documentation.html",
    src: "/icons/Groovy.svg",
  },
  Golang: {
    href: "https://go.dev",
    src: "/icons/Golang.svg",
  },
  Java: {
    href: "https://dev.java",
    src: "/icons/Java.svg",
  },
  JavaScript: {
    href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
    src: "/icons/JavaScript.svg",
  },
  "Node.js": {
    href: "https://nodejs.org/",
    src: "/icons/NodeJS.svg",
  },
  Express: {
    href: "https://expressjs.com/",
    src: "/icons/Express.svg",
  },
  React: {
    href: "https://reactjs.org/",
    src: "/icons/React.svg",
  },
  "Next.js": {
    href: "https://nextjs.org/",
    src: "/icons/NextJS.svg",
  },
  "D3.js": {
    href: "https://d3js.org/",
    src: "/icons/D3js.svg",
  },
  Cloudflare: {
    href: "https://www.cloudflare.com/",
    src: "/icons/Cloudflare.svg",
  },
  Grafana: {
    href: "https://grafana.com/",
    src: "/icons/Grafana.svg",
  },
  Helm: {
    href: "https://helm.sh/",
    src: "/icons/Helm.svg",
  },
  LaTeX: {
    href: "https://www.latex-project.org/",
    src: "/icons/LaTeX.svg",
  },
  NGINX: {
    href: "https://www.nginx.com/",
    src: "/icons/NGINX.svg",
  },
  NPM: {
    href: "https://www.npmjs.com/",
    src: "/icons/NPM.svg",
  },
  NumPy: {
    href: "https://numpy.org/",
    src: "/icons/NumPy.svg",
  },
  "Oh My Zsh": {
    href: "https://ohmyz.sh/",
    src: "/icons/OhMyZsh.svg",
  },
  "Scikit-learn": {
    href: "https://scikit-learn.org/",
    src: "/icons/ScikitLearn.svg",
  },
  "Tailwind CSS": {
    href: "https://tailwindcss.com/",
    src: "/icons/TailwindCSS.svg",
  },
  Vercel: {
    href: "https://vercel.com/",
    src: "/icons/Vercel.svg",
  },
  "HashiCorp Vagrant": {
    href: "https://www.vagrantup.com/",
    src: "/icons/HashiCorpVagrant.svg",
  },
  "HashiCorp Vault": {
    href: "https://www.hashicorp.com/products/vault",
    src: "/icons/HashiCorpVault.svg",
  },
  TypeScript: {
    href: "https://www.typescriptlang.org/docs/",
    src: "/icons/TypeScript.svg",
  },
  Gradle: {
    href: "https://docs.gradle.org/current/userguide/userguide.html",
    src: "/icons/Gradle.svg",
  },
  Jenkins: {
    href: "https://www.jenkins.io/doc",
    src: "/icons/Jenkins.svg",
  },
  Ubuntu: {
    href: "https://ubuntu.com",
    src: "/icons/Ubuntu.svg",
  },
  VIM: {
    href: "https://www.vim.org",
    src: "/icons/VIM.svg",
  },
  Git: {
    href: "https://git-scm.com/doc",
    src: "/icons/Git.svg",
  },
  Docker: {
    href: "https://docs.docker.com",
    src: "/icons/Docker.svg",
  },
  Elasticsearch: {
    href: "https://www.elastic.co/elasticsearch",
    src: "/icons/ElasticSearch.svg",
  },
  Logstash: {
    href: "https://www.elastic.co/logstash",
    src: "/icons/Logstash.svg",
  },
  Kibana: {
    href: "https://www.elastic.co/kibana",
    src: "/icons/Kibana.svg",
  },
  Kubernetes: {
    href: "https://kubernetes.io/docs/home",
    src: "/icons/Kubernetes.svg",
  },
  Vagrant: {
    href: "https://www.vagrantup.com/docs",
    src: "/icons/Vagrant.svg",
  },
  Github: {
    href: "https://docs.github.com/en",
    src: "/icons/Github.svg",
  },
  "VS-Code": {
    href: "https://code.visualstudio.com/docs",
    src: "/icons/VSCode.svg",
  },
  Pandas: {
    href: "https://pandas.pydata.org",
    src: "/icons/Pandas.svg",
  },
  Pytest: {
    href: "https://docs.pytest.org",
    src: "/icons/Pytest.svg",
  },
  Pydantic: {
    href: "https://docs.pydantic.dev",
    src: "/icons/Pydantic.png",
  },
  Terraform: {
    href: "https://www.terraform.io",
    src: "/icons/Terraform.svg",
  },
  GCP: {
    href: "https://cloud.google.com",
    src: "/icons/GCP.svg",
  },
  AWS: {
    href: "https://aws.amazon.com",
    src: "/icons/AWS.svg",
  },
  Azure: {
    href: "https://azure.microsoft.com",
    src: "/icons/Azure.svg",
  },
  Linux: {
    href: "https://www.linux.org",
    src: "/icons/Linux.svg",
  },
  "Apache Spark": {
    href: "https://spark.apache.org",
    src: "/icons/ApacheSpark.svg",
  },
  PySpark: {
    href: "https://spark.apache.org/docs/latest/api/python/",
    src: "/icons/PySpark.svg",
  },
  gRPC: {
    href: "https://grpc.io/docs/",
    src: "/icons/gRPC.svg",
  },
  PyTorch: {
    href: "https://pytorch.org",
    src: "/icons/PyTorch.svg",
  },
  MongoDB: {
    href: "https://www.mongodb.com",
    src: "/icons/MongoDB.svg",
  },
  TeamCity: {
    href: "https://www.jetbrains.com/help/teamcity/teamcity-documentation.html",
    src: "/icons/TeamCity.png",
  },
  JIRA: {
    href: "https://www.atlassian.com/software/jira",
    src: "/icons/JIRA.svg",
  },
  Confluence: {
    href: "https://www.atlassian.com/software/confluence",
    src: "/icons/Confluence.svg",
  },
  Bash: {
    href: "https://www.gnu.org/software/bash/",
    src: "/icons/Bash.svg",
  },
  CMake: {
    href: "https://cmake.org",
    src: "/icons/CMake.svg",
  },
  MySQL: {
    href: "https://www.mysql.com",
    src: "/icons/MySQL.svg",
  },
  Windows11: {
    href: "https://www.microsoft.com/en-us/windows/windows-11",
    src: "/icons/Windows11.svg",
  },
};

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

export function TechIcon({ alt, width = 60, height = 60 }: TechIconProps) {
  const normalizedAlt = alt.trim();
  const canonicalName =
    TECH_ALIASES[normalizedAlt.toLowerCase()] ?? normalizedAlt;
  // Resolve canonical name first, then fallback to case-insensitive key lookup.
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
    console.warn(`Tech data not found for: ${alt}`);
    return null;
  }

  return (
    <Link href={techData.href}>
      <Image src={techData.src} alt={alt} width={width} height={height} />
    </Link>
  );
}
