import { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  video?: {
    title: string;
    description: string;
    thumbnailUrl: string;
    uploadDate: string;
    duration?: string;
    contentUrl?: string;
  };
}

export function SEO({
  title = 'SUNFLIX – Free Movies & Series | Hindi • Hollywood • KDrama • Turkish • CDrama • English | Watch Online',
  description = 'SUNFLIX – Watch free Hindi movies, Hollywood movies, Korean drama, Turkish drama, English series, Chinese drama, cartoons, entertainment videos and trending content. No ads, no login. Watch. Shine. Repeat.',
  keywords = 'movies, movie, film, films, series, drama, kdrama, korean drama, turkish drama, cdrama, english series, hindi movie, hollywood movie, latest movie, new movie, movie 2025, watch movie, free movie, online movie, full movie, best movie website, entertainment platform, watch videos, sunflix, sunflix movies',
  image = 'https://sunflixpro.vercel.app/banner.jpg',
  url = 'https://sunflixpro.vercel.app/',
  type = 'website',
  video,
}: SEOProps) {
  useEffect(() => {
    // Update document title
    document.title = title;

    // Update or create meta tags
    const updateMetaTag = (name: string, content: string, isProperty = false) => {
      const attribute = isProperty ? 'property' : 'name';
      let meta = document.querySelector(`meta[${attribute}="${name}"]`) as HTMLMetaElement | null;
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attribute, name);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    // Update basic meta tags
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords);
    updateMetaTag('og:title', title, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:image', image, true);
    updateMetaTag('og:url', url, true);
    updateMetaTag('og:type', type, true);
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', image);

    // Update canonical link
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', url);

    // Add VideoObject structured data if video is provided
    if (video) {
      let videoScript = document.getElementById('video-structured-data') as HTMLScriptElement | null;
      if (videoScript) {
        videoScript.remove();
      }
      videoScript = document.createElement('script');
      videoScript.id = 'video-structured-data';
      videoScript.type = 'application/ld+json';
      videoScript.textContent = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'VideoObject',
        name: video.title,
        description: video.description,
        thumbnailUrl: video.thumbnailUrl,
        uploadDate: video.uploadDate,
        duration: video.duration,
        contentUrl: video.contentUrl,
        embedUrl: video.contentUrl,
      });
      document.head.appendChild(videoScript);
    } else {
      // Remove video structured data if not needed
      const videoScript = document.getElementById('video-structured-data');
      if (videoScript) {
        videoScript.remove();
      }
    }
  }, [title, description, keywords, image, url, type, video]);

  return null; // This component doesn't render anything
}

