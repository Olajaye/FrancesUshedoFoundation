import { cache } from "react";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { SITE_URL, SITE_NAME, DEFAULT_OG_IMAGE } from "@/lib/seo";

const getArticle = cache(async (id: string) => {
  try {
    return await prisma.news.findUnique({
      where: { id, hidden: false },
      select: {
        id: true,
        title: true,
        excerpt: true,
        category: true,
        date: true,
        image: true,
        author: true,
        authorRole: true,
        tags: true,
        updatedAt: true,
      },
    });
  } catch {
    return null;
  }
});

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const article = await getArticle(params.id);

  if (!article) {
    return {
      title: "Article Not Found",
      robots: { index: false },
    };
  }

  const description = article.excerpt?.slice(0, 155) || `Read the latest from ${SITE_NAME}.`;
  const ogImage = article.image || DEFAULT_OG_IMAGE;
  const publishedTime = new Date(article.date).toISOString();

  return {
    title: article.title,
    description,
    keywords: [...(article.tags ?? []), article.category, "TFUF", "Nigeria"],
    alternates: { canonical: `${SITE_URL}/news/${article.id}` },
    openGraph: {
      title: `${article.title} | ${SITE_NAME}`,
      description,
      url: `${SITE_URL}/news/${article.id}`,
      type: "article",
      publishedTime,
      authors: [article.author],
      tags: article.tags,
      images: [{ url: ogImage, width: 1200, height: 630, alt: article.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${article.title} | ${SITE_NAME}`,
      description,
      images: [ogImage],
    },
  };
}

export default async function NewsDetailLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  const article = await getArticle(params.id);

  const schema = article
    ? {
        "@context": "https://schema.org",
        "@type": "NewsArticle",
        headline: article.title,
        description: article.excerpt,
        image: article.image || DEFAULT_OG_IMAGE,
        datePublished: new Date(article.date).toISOString(),
        dateModified: article.updatedAt.toISOString(),
        author: {
          "@type": "Person",
          name: article.author,
          jobTitle: article.authorRole,
        },
        publisher: {
          "@type": "Organization",
          name: SITE_NAME,
          logo: {
            "@type": "ImageObject",
            url: `${SITE_URL}/logo/logoImg.png`,
          },
        },
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": `${SITE_URL}/news/${article.id}`,
        },
        keywords: article.tags?.join(", "),
        articleSection: article.category,
        breadcrumb: {
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
            { "@type": "ListItem", position: 2, name: "News", item: `${SITE_URL}/news` },
            { "@type": "ListItem", position: 3, name: article.title, item: `${SITE_URL}/news/${article.id}` },
          ],
        },
      }
    : null;

  return (
    <>
      {schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      )}
      {children}
    </>
  );
}
