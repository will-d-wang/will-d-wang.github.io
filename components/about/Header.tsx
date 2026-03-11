import Image from "next/image";
import Link from "next/link";

import { SOCIAL_LINKS } from "@/components/about/data";

export function AboutImage() {
  return (
    <figure className="flex flex-wrap justify-center">
      <Image
        src="/images/DinganWang.jpg"
        alt="Dingan Wang"
        height={320}
        width={320}
        className="shadow-lg rounded-full max-w-full h-auto align-middle border-none"
      />
    </figure>
  );
}

export function SocialLinks() {
  return (
    <nav
      className="home-social"
      style={{ marginTop: "2rem", marginBottom: "3rem" }}
      aria-label="Social links"
    >
      {SOCIAL_LINKS.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          target="_blank"
          rel="noreferrer"
          className="home-social-link"
        >
          <Image src={link.src} alt={link.alt} width={32} height={32} />
        </Link>
      ))}
      <span className="home-social-badge">
        <Image
          src="https://komarev.com/ghpvc/?username=anonyknight"
          alt="Will-D-Wang"
          width={150}
          height={20}
        />
      </span>
    </nav>
  );
}
