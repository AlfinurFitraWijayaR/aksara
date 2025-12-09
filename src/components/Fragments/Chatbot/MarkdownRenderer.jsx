import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export const MarkdownRenderer = ({ content }) => (
  <ReactMarkdown
    children={content}
    remarkPlugins={[remarkGfm]}
    components={{
      code({ node, inline, className, children, ...props }) {
        return inline ? (
          <code {...props} className="bg-gray-200 px-1 rounded">
            {children}
          </code>
        ) : (
          <pre {...props} className="bg-gray-200 p-2 rounded">
            <code>{children}</code>
          </pre>
        );
      },
      ul: ({ children }) => <ul className="list-disc ml-4">{children}</ul>,
      ol: ({ children }) => <li className="list-decimal ml-4">{children}</li>,
      li: ({ children }) => <li className="list-decimal ml-4">{children}</li>,
    }}
  />
);
