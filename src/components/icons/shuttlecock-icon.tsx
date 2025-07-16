import type { SVGProps } from "react";

export function ShuttlecockIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M7 21l5-5" />
      <path d="M12 16l5-5" />
      <path d="M9 18l3-3" />
      <path d="M15 14l3-3" />
      <path d="m18 11 3-3" />
      <path d="M12 22a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2h0a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2Z" />
      <path d="M5 14l2-2" />
      <path d="m17 3 2 2" />
    </svg>
  );
}
