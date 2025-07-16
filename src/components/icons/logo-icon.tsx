import type { SVGProps } from 'react';

export function LogoIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M14 9l4.5 4.5-2 2L12 11" />
      <path d="M12 11l-2 2-4.5-4.5L10 4" />
      <path d="M7 13l-2.5 2.5" />
      <path d="M15.5 5.5l2.5-2.5" />
      <path d="M10 4L5.5 8.5" />
      <path d="m14 9 3 3" />
      <path d="M21 21l-3-3" />
    </svg>
  );
}
