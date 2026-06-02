/**
 * Converts various URL formats into direct image URLs usable as CSS
 * background-image or <img> src.
 *
 *   Google Drive share:  https://drive.google.com/file/d/{ID}/view
 *     → https://drive.google.com/uc?export=view&id={ID}
 *
 *   Cloudinary PDF:      https://res.cloudinary.com/{cloud}/image/upload/v123/file.pdf
 *     → https://res.cloudinary.com/{cloud}/image/upload/pg_1/v123/file.jpg
 *
 *   Unsupported PDF:     https://example.com/doc.pdf  →  null  (can't render as image)
 */
export function normalizeImageUrl(url: string | null): string | null {
  if (!url) return null;

  // Google Drive → direct image (works for PDFs too — renders first page)
  const driveMatch = url.match(/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (driveMatch) {
    return `https://drive.google.com/uc?export=view&id=${driveMatch[1]}`;
  }

  // Cloudinary PDF → first-page thumbnail via pg_1 transformation
  const cloudinaryPdf = url.match(
    /^(https?:\/\/res\.cloudinary\.com\/[^/]+\/image\/upload)\/(.+)\.pdf(\?.*)?$/i
  );
  if (cloudinaryPdf) {
    return `${cloudinaryPdf[1]}/pg_1/${cloudinaryPdf[2]}.jpg`;
  }

  // Unsupported PDFs → can't render as background-image
  if (/\.pdf(\?.*)?$/i.test(url)) return null;

  return url;
}

/**
 * Converts a URL into an embeddable PDF viewer URL (for <iframe>).
 *
 *   Google Drive → https://drive.google.com/file/d/{ID}/preview
 */
export function normalizePdfUrl(url: string | null): string | null {
  if (!url) return null;
  const match = url.match(/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (match) {
    return `https://drive.google.com/file/d/${match[1]}/preview`;
  }
  return url;
}

export function isPdf(url: string | null): boolean {
  if (!url) return false;
  // Cloudinary PDFs
  if (/res\.cloudinary\.com\/.+\/image\/upload\/.*\.pdf/i.test(url)) return true;
  // Google Drive URLs — we can't know from the URL, but check for /file/d/ pattern
  if (/drive\.google\.com\/file\/d\//i.test(url)) return true;
  // Direct PDF URLs
  return /\.pdf(\?.*)?$/i.test(url);
}
