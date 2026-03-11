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
    src: "https://avatars.githubusercontent.com/u/110818415?s=200&v=4",
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
    src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/apachespark/apachespark-original.svg",
  },
  gRPC: {
    href: "https://grpc.io/docs/",
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/grpc/grpc-plain.svg",
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
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/TeamCity_Icon.png/1280px-TeamCity_Icon.png",
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
};

interface TechIconProps {
  alt: string;
  width?: number;
  height?: number;
}

export function TechIcon({ alt, width = 60, height = 60 }: TechIconProps) {
  // Case-insensitive lookup: try exact match first, then find by case-insensitive comparison
  let techData = TECH_DATA[alt];

  if (!techData) {
    const key = Object.keys(TECH_DATA).find(
      (k) => k.toLowerCase() === alt.toLowerCase(),
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
    <a href={techData.href}>
      <img src={techData.src} alt={alt} width={width} height={height} />
    </a>
  );
}
