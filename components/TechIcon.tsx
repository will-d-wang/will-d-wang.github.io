interface TechData {
  href: string;
  src: string;
}

const TECH_DATA: Record<string, TechData> = {
  C: {
    href: "https://www.cprogramming.com",
    src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/c/c-original.svg",
  },
  "C++": {
    href: "https://isocpp.org",
    src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/cplusplus/cplusplus-original.svg",
  },
  Python: {
    href: "https://www.python.org/doc",
    src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg",
  },
  Groovy: {
    href: "https://groovy-lang.org/documentation.html",
    src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/groovy/groovy-original.svg",
  },
  Golang: {
    href: "https://go.dev",
    src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/go/go-original.svg",
  },
  Java: {
    href: "https://dev.java",
    src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/java/java-original.svg",
  },
  JavaScript: {
    href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
    src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg",
  },
  TypeScript: {
    href: "https://www.typescriptlang.org/docs/",
    src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg",
  },
  Gradle: {
    href: "https://docs.gradle.org/current/userguide/userguide.html",
    src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/gradle/gradle-original.svg",
  },
  Jenkins: {
    href: "https://www.jenkins.io/doc",
    src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/jenkins/jenkins-original.svg",
  },
  Ubuntu: {
    href: "https://ubuntu.com",
    src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/ubuntu/ubuntu-plain-wordmark.svg",
  },
  VIM: {
    href: "https://www.vim.org",
    src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/vim/vim-plain.svg",
  },
  Git: {
    href: "https://git-scm.com/doc",
    src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/git/git-original.svg",
  },
  Docker: {
    href: "https://docs.docker.com",
    src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/docker/docker-original.svg",
  },
  Kubernetes: {
    href: "https://kubernetes.io/docs/home",
    src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/kubernetes/kubernetes-plain.svg",
  },
  Vagrant: {
    href: "https://www.vagrantup.com/docs",
    src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/vagrant/vagrant-original.svg",
  },
  Github: {
    href: "https://docs.github.com/en",
    src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/github/github-original.svg",
  },
  "VS-Code": {
    href: "https://code.visualstudio.com/docs",
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Visual_Studio_Code_1.35_icon.svg/1200px-Visual_Studio_Code_1.35_icon.svg.png",
  },
  Pandas: {
    href: "https://pandas.pydata.org",
    src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/pandas/pandas-original.svg",
  },
  Pytest: {
    href: "https://docs.pytest.org",
    src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/pytest/pytest-original.svg",
  },
  Pydantic: {
    href: "https://docs.pydantic.dev",
    src: "https://avatars.githubusercontent.com/u/110818415?s=200&v=4",
  },
  Terraform: {
    href: "https://www.terraform.io",
    src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/terraform/terraform-original.svg",
  },
  GCP: {
    href: "https://cloud.google.com",
    src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/googlecloud/googlecloud-original.svg",
  },
  AWS: {
    href: "https://aws.amazon.com",
    src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
  },
  Azure: {
    href: "https://azure.microsoft.com",
    src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/azure/azure-original.svg",
  },
  Linux: {
    href: "https://www.linux.org",
    src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/linux/linux-original.svg",
  },
  "Apache Spark": {
    href: "https://spark.apache.org",
    src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/apachespark/apachespark-original.svg",
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
    src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/pytorch/pytorch-original.svg",
  },
  MongoDB: {
    href: "https://www.mongodb.com",
    src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original.svg",
  },
  TeamCity: {
    href: "https://www.jetbrains.com/help/teamcity/teamcity-documentation.html",
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/TeamCity_Icon.png/1280px-TeamCity_Icon.png",
  },
  JIRA: {
    href: "https://www.atlassian.com/software/jira",
    src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/jira/jira-original.svg",
  },
  Confluence: {
    href: "https://www.atlassian.com/software/confluence",
    src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/confluence/confluence-original.svg",
  },
  Bash: {
    href: "https://www.gnu.org/software/bash/",
    src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/bash/bash-original.svg",
  },
  CMake: {
    href: "https://cmake.org",
    src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/cmake/cmake-original.svg",
  },
  MySQL: {
    href: "https://www.mysql.com",
    src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/mysql/mysql-original.svg",
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
