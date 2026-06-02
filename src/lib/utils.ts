/**
 * Converts Google Drive share links to direct file URLs so they can be
 * displayed as images or embedded in iframes.
 *
 *   Share link:  https://drive.google.com/file/d/{ID}/view?usp=sharing
 *   Direct URL:  https://drive.google.com/uc?export=view&id={ID}
 *   PDF preview: https://drive.google.com/file/d/{ID}/preview
 */
export function normalizeImageUrl(url: string | null): string | null {
  if (!url) return null;
  const match = url.match(/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (match) {
    return `https://drive.google.com/uc?export=view&id=${match[1]}`;
  }
  return url;
}

export function normalizePdfUrl(url: string | null): string | null {
  if (!url) return null;
  const match = url.match(/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (match) {
    return `https://drive.google.com/file/d/${match[1]}/preview`;
  }
  return url;
}
