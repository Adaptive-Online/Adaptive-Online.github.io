import { getCollection } from 'astro:content';

/** Published research items, newest first. */
export async function getResearch() {
  const items = await getCollection('research', ({ data }) => !data.draft);
  return items.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}
