import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { motion } from "motion/react";

export function Blog() {
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/content/blog")
      .then(res => res.json())
      .then(setPosts);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto space-y-16"
    >
      <div className="text-center space-y-6">
        <h1 className="text-4xl md:text-5xl font-serif">博客文章 / Blog</h1>
        <p className="text-charcoal/60 max-w-xl mx-auto italic font-serif">随笔、动态与创作过程。</p>
        <div className="w-12 h-[1px] bg-smoky-pink-dark mx-auto"></div>
      </div>

      <div className="space-y-12">
        {posts.map(post => (
          <Link key={post.slug} to={`/blog/${post.slug}`} className="group block flex flex-col md:flex-row gap-8 items-start">
            {post.cover && (
                <div className="w-full md:w-1/3 aspect-[4/3] rounded-xl overflow-hidden bg-charcoal/5 flex-shrink-0">
                    <img src={post.cover} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt={post.title} />
                </div>
            )}
            <div className="flex-1 space-y-4">
                <div className="flex gap-4 text-xs uppercase tracking-widest text-charcoal/50">
                    {post.date && <span>{format(new Date(post.date), 'yyyy-MM-dd')}</span>}
                    {post.category && <span>&bull; {post.category}</span>}
                </div>
                <h2 className="text-2xl font-serif group-hover:text-smoky-pink-dark transition-colors">{post.title}</h2>
                <p className="text-charcoal/70 leading-relaxed">{post.summary}</p>
                <div className="text-smoky-pink-dark uppercase text-xs tracking-widest font-medium">阅读全文 &rarr;</div>
            </div>
          </Link>
        ))}
        {posts.length === 0 && (
            <div className="text-center text-charcoal/50 py-20 italic font-serif">
                暂无文章。
            </div>
        )}
      </div>
    </motion.div>
  );
}
