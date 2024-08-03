declare global {
  /* Here, declare things that go in the global namespace, or augment
   * existing declarations in the global namespace
   */
  type Locale = 'en' | 'fr';

  // https://nextjs.org/docs/app/api-reference/file-conventions/page
  // https://github.com/vercel/next.js/discussions/46131#discussioncomment-5047189
  interface PageProps {
    params: { locale: Locale };
    searchParams?: { [key: string]: string | string[] | undefined };
  }
}

export default global;