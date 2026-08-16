import Link from "next/link";

import { FEATURED_POSTS } from "@/components/about/data";

export function BlogSection() {
  return (
    <section className="home-section">
      <h2>From the Blog</h2>
      <div className="home-blog">
        {FEATURED_POSTS.map((post) => (
          <Link key={post.href} href={post.href} className="home-blog-card">
            <h3>{post.title}</h3>
            <p>{post.blurb}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
