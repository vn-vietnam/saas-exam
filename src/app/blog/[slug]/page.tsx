import { notFound } from 'next/navigation';
import BlogPost from "./BlogPost";
import { serialize } from 'next-mdx-remote/serialize';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeStringify from 'rehype-stringify';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import remarkNormalizeHeadings from 'remark-normalize-headings';
import remarkFlexibleToc from 'remark-flexible-toc';
import { remark } from 'remark';
import { Metadata } from 'next';
import { MDXRemoteSerializeResult } from 'next-mdx-remote';
import { getPostsData } from '@/lib/serverUtils';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github-dark.css';

interface TocItem {
  title: string;
  url: string;
  items?: TocItem[];
}

interface Post {
  id: string;
  title: string;
  summary?: string;
  content: string;
  date: string;
  draft?: boolean;
  stats: {
    words: number;
    text: string;
    minutes: number;
  };
  mdxSource: MDXRemoteSerializeResult;
  toc: {
    items: TocItem[];
  };
}

export async function generateStaticParams() {
  const params = [];
  const posts = getPostsData();
  params.push(...posts.map((post) => ({
    slug: post.id,
  })));
  
  return params;
}

type Props = {
  params: Promise<{ slug: string; locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug)
  if (!post) return notFound()
  return {
    title: post.title,
    description: post.summary,
  }
}

async function getPost(slug: string): Promise<Post | null> {
  const post = getPostsData().find((post) => post.id === slug)
  if (!post || post?.draft) return null

  // Generate TOC
  const file = await remark()
    .use(remarkNormalizeHeadings)
    .use(remarkFlexibleToc)
    .process(post.content);

  const mdxSource = await serialize(post.content, {
    mdxOptions: {
      remarkPlugins: [
        remarkNormalizeHeadings,
        remarkGfm,
      ],
      rehypePlugins: [
        [rehypeSlug],
        [rehypeStringify],
        [rehypeAutolinkHeadings],
        [rehypeHighlight, { ignoreMissing: true }],
      ],
      remarkRehypeOptions: {
        allowDangerousHtml: true
      }
    }
  });
  return {
    ...post,
    mdxSource,
    toc: {
      items: file.data.toc as TocItem[]
    },
    stats: {
      words: post.stats.words,
      text: post.stats.text,
      minutes: post.stats.words / 200 // Assuming average reading speed of 200 words per minute
    }
  }
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const post = await getPost(slug)

  if (!post) notFound()

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <BlogPost post={post} />
      </div>
    </div>
  )
}