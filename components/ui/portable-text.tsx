import { PortableText } from "@portabletext/react";
import type { PortableTextBlock } from "sanity";

export function PortableTextContent({
  value,
  className,
}: {
  value: PortableTextBlock[];
  className?: string;
}) {
  return (
    <div className={className}>
      <PortableText
        value={value}
        components={{
          block: {
            normal: ({ children }) => (
              <p className="max-w-2xl text-pretty text-base leading-8 text-[color:var(--ink-soft)]">
                {children}
              </p>
            ),
          },
        }}
      />
    </div>
  );
}
