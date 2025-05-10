
/**
 * @fileOverview Component to render JSON-LD script tags for SEO.
 *
 * - JsonLdScript - Renders a <script type="application/ld+json"> tag.
 */
// This component must be a server component or used within one to avoid client-side only rendering of the script.

import type { ScriptHTMLAttributes } from 'react';

type JsonLdScriptProps = {
  data: object;
} & Omit<ScriptHTMLAttributes<HTMLScriptElement>, 'dangerouslySetInnerHTML' | 'type' | 'children'>;
// Omit dangerouslySetInnerHTML and type as they are fixed, and children as it's not used.

export function JsonLdScript({ data, ...rest }: JsonLdScriptProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
      {...rest}
    />
  );
}
