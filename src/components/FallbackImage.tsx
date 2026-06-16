import React, { useState } from 'react';

interface FallbackImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src?: string;
  alt?: string;
  className?: string;
  fallback?: string;
}

const DEFAULT_SVG = `data:image/svg+xml;utf8,${encodeURIComponent(
  `<svg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'>
    <rect fill='%23f3f4f6' width='100%' height='100%'/>
    <g transform='translate(60,60)'>
      <path d='M0 60 L40 20 L80 60 L120 10 L180 70 L240 10 L320 90 L320 160 L0 160 Z' fill='%23e5e7eb' />
      <text x='0' y='140' fill='%239ca3af' font-size='18' font-family='Arial,Helvetica,sans-serif'>Image unavailable</text>
    </g>
  </svg>`
)};`

export default function FallbackImage({ src, alt, className, fallback, ...rest }: FallbackImageProps) {
  const [errored, setErrored] = useState(false);

  const srcStr = typeof src === 'string' ? src : (src as unknown as string) || '';
  const fallbackSrc = fallback || DEFAULT_SVG;

  return (
    // eslint-disable-next-line jsx-a11y/alt-text
    <img
      src={errored ? fallbackSrc : srcStr}
      alt={alt}
      className={className}
      loading="lazy"
      onError={() => setErrored(true)}
      referrerPolicy="no-referrer"
      {...rest}
    />
  );
}
