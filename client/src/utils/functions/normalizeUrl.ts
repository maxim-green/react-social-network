export const normalizeUrl = (url: string): string => url.replaceAll(/^https?:\/\/|\/$/gm, '');
