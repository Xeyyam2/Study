import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Clock, ArrowLeft, Calendar } from "lucide-react";
import { data } from "@/lib/data";
import type { AppLocale } from "@/i18n/routing";
import { routing } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { siteConfig } from "@/config/site";
import { buildPageMetadata } from "@/lib/seo/alternates";
import { articleJsonLd, breadcrumbJsonLd } from "@/lib/seo/json-ld";
import { JsonLd } from "@/components/seo/json-ld";
import { lx } from "@/lib/i18n/lx";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// ISR — blog posts rarely change after publishing; rebuild hourly.
// SE-5/P2: pre-render all posts at build time — a small, static set that
// otherwise pays a cold SSR + DB round-trip on every first visit/crawl.
// PERF/Cache: blog posts are long-form and rarely change (seeded content, no
// admin edits) — a longer ISR window keeps them cached on the CDN longer,
// reducing origin round-trips. On-demand revalidation via redeploy still
// refreshes them instantly if content is ever edited.
export const revalidate = 21600;

export async function generateStaticParams() {
  const posts = await data.blog.list();
  return routing.locales.flatMap((locale) =>
    posts.map((post) => ({ locale, slug: post.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const post = await data.blog.getBySlug(slug);
  if (!post) return {};
  const t = await getTranslations({ locale, namespace: "Blog" });
  return buildPageMetadata({
    locale,
    path: `/blog/${slug}`,
    title: t("metaDetailTitle", { title: lx(post.title, locale) }),
    description: lx(post.excerpt, locale),
    image: post.coverImage,
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const appLocale = locale as AppLocale;
  const t = await getTranslations({ locale, namespace: "Blog" });

  const post = await data.blog.getBySlug(slug);
  if (!post) notFound();

  const path = `/blog/${slug}`;

  return (
    <article>
      <JsonLd
        data={[
          articleJsonLd(post, appLocale),
          breadcrumbJsonLd([
            { name: t("home"), url: `${siteConfig.url}/${locale}` },
            { name: t("blog"), url: `${siteConfig.url}/${locale}/blog` },
            {
              name: lx(post.title, appLocale),
              url: `${siteConfig.url}/${locale}${path}`,
            },
          ]),
        ]}
      />

      <div className="container-page max-w-3xl py-section-md">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
        >
          <ArrowLeft className="h-4 w-4" />
          {t("back")}
        </Link>

        <div className="mt-6">
          <Badge variant="tertiary">{lx(post.category, appLocale)}</Badge>
          <h1 className="mt-4 font-display text-3xl font-bold leading-tight text-foreground sm:text-4xl">
            {lx(post.title, appLocale)}
          </h1>
          <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <span>{post.author}</span>
            <span className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {new Date(post.publishedAt).toLocaleDateString(locale, {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
            {/* Freshness signal (AEO): surface when the post was revised after
                publishing — AI systems and Google both weight recency. */}
            {post.updatedAt &&
              new Date(post.updatedAt).getTime() !==
                new Date(post.publishedAt).getTime() && (
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {t("lastUpdated")}:{" "}
                  {new Date(post.updatedAt).toLocaleDateString(locale, {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              )}
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {t("minRead", { min: post.readingMinutes })}
            </span>
          </div>
        </div>

        <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-lg border border-border">
          <Image
            src={post.coverImage}
            alt={lx(post.title, appLocale)}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-cover"
          />
        </div>

        <div className="prose prose-lg mt-8 max-w-none prose-headings:text-foreground prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-img:rounded-lg">
          <RichContent content={lx(post.content, appLocale)} />
        </div>

        <div className="mt-12 rounded-lg border border-primary-container bg-surface-low p-6 text-center">
          <p className="font-display text-lg font-semibold text-foreground">
            {t("ctaTitle")}
          </p>
          <Button asChild variant="cta" className="mt-4">
            <Link href="/apply">{t("ctaButton")}</Link>
          </Button>
        </div>
      </div>
    </article>
  );
}

/**
 * Lightweight blog content renderer.
 *
 * Supports the content format used in the seed: plain paragraphs separated by
 * blank lines, `## ` / `### ` headings, `- ` bullet lists, and inline
 * `[text](/path)` links (rendered as internal `Link`s).
 */
function RichContent({ content }: { content: string }) {
  const blocks = content.split("\n");
  const out: React.ReactNode[] = [];
  let list: string[] = [];
  let key = 0;

  const flushList = () => {
    if (!list.length) return;
    out.push(
      <ul key={key++} className="my-4 list-disc space-y-1 pl-6 text-foreground">
        {list.map((item, i) => (
          <li key={i} className="leading-relaxed">
            <InlineContent text={item} />
          </li>
        ))}
      </ul>,
    );
    list = [];
  };

  for (const raw of blocks) {
    const line = raw.trim();
    if (!line) {
      flushList();
      continue;
    }
    if (line.startsWith("## ")) {
      flushList();
      out.push(
        <h2
          key={key++}
          className="mt-8 mb-3 font-display text-headline-md font-semibold text-foreground"
        >
          <InlineContent text={line.slice(3)} />
        </h2>,
      );
      continue;
    }
    if (line.startsWith("### ")) {
      flushList();
      out.push(
        <h3
          key={key++}
          className="mt-6 mb-2 font-display text-lg font-semibold text-foreground"
        >
          <InlineContent text={line.slice(4)} />
        </h3>,
      );
      continue;
    }
    if (line.startsWith("- ")) {
      list.push(line.slice(2));
      continue;
    }
    flushList();
    out.push(
      <p key={key++} className="mb-4 leading-relaxed text-foreground">
        <InlineContent text={line} />
      </p>,
    );
  }
  flushList();

  return <>{out}</>;
}

/** Renders inline `[text](/path)` links inside a plain-text run. */
function InlineContent({ text }: { text: string }) {
  const segments = text.split(/\[([^\]]+)\]\(([^)]+)\)/);
  return (
    <>
      {segments.map((part, j) => {
        if (j % 3 === 1) {
          return (
            <Link
              key={j}
              href={segments[j + 1]}
              className="font-semibold text-primary underline-offset-4 hover:underline"
            >
              {part}
            </Link>
          );
        }
        if (j % 3 === 2) return null;
        return <span key={j}>{part}</span>;
      })}
    </>
  );
}
