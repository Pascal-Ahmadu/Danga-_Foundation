// components/schemas/ArticleSchema.tsx
'use client';

interface Author {
  name: string;
  url?: string;
  image?: string;
}

interface Publisher {
  name: string;
  url: string;
  logo?: {
    url: string;
    width?: number;
    height?: number;
  };
}

interface ArticleImage {
  url: string;
  width?: number;
  height?: number;
  alt?: string;
}

interface ArticleData {
  id: string;
  headline: string;
  description: string;
  articleBody?: string;
  url: string;
  datePublished: string;
  dateModified?: string;
  author: Author;
  publisher: Publisher;
  image?: ArticleImage;
  keywords?: string[];
  articleSection?: string;
  wordCount?: number;
  inLanguage?: string;
}

interface ArticleSchemaProps {
  article: ArticleData;
  type?: 'Article' | 'NewsArticle' | 'BlogPosting';
}

export default function ArticleSchema({ 
  article, 
  type = 'Article' 
}: ArticleSchemaProps) {
  if (!article) return null;

  const schema = {
    '@context': 'https://schema.org',
    '@type': type,
    '@id': `${article.url}/#article`,
    headline: article.headline,
    description: article.description,
    ...(article.articleBody && {
      articleBody: article.articleBody,
    }),
    url: article.url,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': article.url,
    },
    datePublished: article.datePublished,
    dateModified: article.dateModified || article.datePublished,
    author: {
      '@type': 'Person',
      name: article.author.name,
      ...(article.author.url && { url: article.author.url }),
      ...(article.author.image && {
        image: {
          '@type': 'ImageObject',
          url: article.author.image,
        },
      }),
    },
    publisher: {
      '@type': 'Organization',
      name: article.publisher.name,
      url: article.publisher.url,
      ...(article.publisher.logo && {
        logo: {
          '@type': 'ImageObject',
          url: article.publisher.logo.url,
          width: article.publisher.logo.width,
          height: article.publisher.logo.height,
        },
      }),
    },
    ...(article.image && {
      image: {
        '@type': 'ImageObject',
        url: article.image.url,
        width: article.image.width,
        height: article.image.height,
        caption: article.image.alt,
      },
    }),
    ...(article.keywords && article.keywords.length > 0 && {
      keywords: article.keywords,
    }),
    ...(article.articleSection && {
      articleSection: article.articleSection,
    }),
    ...(article.wordCount && {
      wordCount: article.wordCount,
    }),
    inLanguage: article.inLanguage || 'en',
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}