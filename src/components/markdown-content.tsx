"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface MarkdownContentProps {
  content: string;
}

export function MarkdownContent({ content }: MarkdownContentProps) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        table: ({ children }) => (
          <div className="overflow-x-auto my-6">
            <table className="w-full border-collapse text-sm">{children}</table>
          </div>
        ),
        thead: ({ children }) => (
          <thead className="bg-zinc-50 dark:bg-zinc-800/50">{children}</thead>
        ),
        th: ({ children }) => (
          <th className="border border-zinc-200 dark:border-zinc-700 px-4 py-2 text-left font-semibold text-zinc-900 dark:text-zinc-100">
            {children}
          </th>
        ),
        td: ({ children }) => (
          <td className="border border-zinc-200 dark:border-zinc-700 px-4 py-2 text-zinc-700 dark:text-zinc-300">
            {children}
          </td>
        ),
        a: ({ href, children }) => (
          <a
            href={href}
            className="text-violet-600 dark:text-violet-400 hover:underline"
            target={href?.startsWith("http") ? "_blank" : undefined}
            rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
          >
            {children}
          </a>
        ),
        code: ({ className, children, ...props }) => {
          const isInline = !className;
          if (isInline) {
            return (
              <code
                className="bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded text-sm font-mono text-zinc-800 dark:text-zinc-200"
                {...props}
              >
                {children}
              </code>
            );
          }
          return (
            <code className={className} {...props}>
              {children}
            </code>
          );
        },
        pre: ({ children }) => (
          <pre className="bg-zinc-900 dark:bg-zinc-800 text-zinc-100 p-4 rounded-lg overflow-x-auto text-sm border border-zinc-700">
            {children}
          </pre>
        ),
        blockquote: ({ children }) => (
          <blockquote className="border-l-4 border-violet-500 pl-4 italic text-zinc-600 dark:text-zinc-400 my-4">
            {children}
          </blockquote>
        ),
        h1: ({ children }) => (
          <h1 className="text-2xl font-bold mt-8 mb-4 text-zinc-900 dark:text-zinc-50">
            {children}
          </h1>
        ),
        h2: ({ children }) => (
          <h2 className="text-xl font-semibold mt-8 mb-3 text-zinc-900 dark:text-zinc-50 border-b border-zinc-200 dark:border-zinc-700 pb-2">
            {children}
          </h2>
        ),
        h3: ({ children }) => (
          <h3 className="text-lg font-semibold mt-6 mb-2 text-zinc-900 dark:text-zinc-50">
            {children}
          </h3>
        ),
        h4: ({ children }) => (
          <h4 className="text-base font-semibold mt-4 mb-2 text-zinc-900 dark:text-zinc-50">
            {children}
          </h4>
        ),
        p: ({ children }) => (
          <p className="my-3 leading-relaxed text-zinc-700 dark:text-zinc-300">
            {children}
          </p>
        ),
        ul: ({ children }) => (
          <ul className="my-3 ml-6 list-disc space-y-1 text-zinc-700 dark:text-zinc-300">
            {children}
          </ul>
        ),
        ol: ({ children }) => (
          <ol className="my-3 ml-6 list-decimal space-y-1 text-zinc-700 dark:text-zinc-300">
            {children}
          </ol>
        ),
        li: ({ children }) => <li className="leading-relaxed">{children}</li>,
        strong: ({ children }) => (
          <strong className="font-semibold text-zinc-900 dark:text-zinc-100">
            {children}
          </strong>
        ),
        hr: () => <hr className="my-8 border-zinc-200 dark:border-zinc-700" />,
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
