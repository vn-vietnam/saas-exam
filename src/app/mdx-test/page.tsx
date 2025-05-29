import { MDXRemote } from 'next-mdx-remote/rsc';
import { mdxComponents } from '@/lib/mdx-components';

const content = `
# Welcome to Beautiful MDX! 🎨

This is a test page to showcase how **beautifully** MDX content renders with proper styling.

## Features Demonstration

### 1. Text Formatting

You can use **bold text**, *italic text*, and \`inline code\` seamlessly.

### 2. Code Blocks with Syntax Highlighting

\`\`\`javascript
// This is a beautiful code block with syntax highlighting
const greet = (name) => {
  console.log(\`Hello, \${name}! Welcome to MDX.\`);
  return { 
    message: "MDX is awesome!",
    features: ["Markdown", "JSX", "Components"]
  };
};

greet("Developer");
\`\`\`

### 3. Lists

#### Unordered List
- 🚀 Fast rendering
- 🎨 Beautiful styling
- 💻 Code highlighting
- 📱 Responsive design

#### Ordered List
1. Install MDX packages
2. Configure Next.js
3. Add custom styles
4. Enjoy beautiful content!

### 4. Blockquotes

> "MDX allows you to use JSX in your markdown content. It's a powerful combination that enables rich, interactive documentation and blog posts."

### 5. Tables

| Feature | Status | Description |
|---------|--------|-------------|
| Markdown | ✅ | Full markdown support |
| JSX | ✅ | Embed React components |
| Styling | ✅ | Beautiful Tailwind CSS |
| Dark Mode | ✅ | Automatic theme support |

### 6. Links

Check out the [Next.js documentation](https://nextjs.org) or navigate to [your blog](/blog).

---

## More Examples

### Complex Code Example

\`\`\`typescript
interface MDXPost {
  title: string;
  date: string;
  content: string;
  tags: string[];
}

class BlogManager {
  private posts: MDXPost[] = [];

  addPost(post: MDXPost): void {
    this.posts.push(post);
    console.log(\`Added post: \${post.title}\`);
  }

  getPosts(): MDXPost[] {
    return this.posts.sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }
}
\`\`\`

### Nested Lists

- Frontend Technologies
  - React
    - Next.js
    - Gatsby
  - Vue
    - Nuxt.js
  - Svelte
    - SvelteKit
- Backend Technologies
  - Node.js
  - Python
  - Go

---

That's it! Your MDX is now beautifully styled and ready to use. 🎉
`;

export default function MDXTestPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <article>
          <MDXRemote source={content} components={mdxComponents} />
        </article>
      </div>
    </div>
  );
} 