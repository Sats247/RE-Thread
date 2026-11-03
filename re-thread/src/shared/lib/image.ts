/**
 * Get a placeholder image URL using picsum.photos with a deterministic seed.
 * Swap to local paths in /public/img/ when real photos are supplied.
 */
export function getImageUrl(seed: string | number, w = 400, h = 500): string {
  return `https://picsum.photos/seed/${seed}/${w}/${h}`;
}
