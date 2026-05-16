import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Markdown from "react-markdown";
import { format } from "date-fns";
import { ArrowLeft } from "lucide-react";
import { motion } from "motion/react";
import { getBlogItem } from "../lib/content";

export function BlogDetail() {
  const { slug } = useParams();
  const [post, setPost] = useState<any>(null);

  useEffect(() => {
    if (slug) {
      getBlogItem(slug).then(setPost);
    }
  }, [slug]);

  if (!post) return <div className="animate-pulse h-96 bg-charcoal/5 rounded-2xl max-w-3xl mx-auto"></div>;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-3xl mx-auto space-y-12"
    >
      <Link to="/blog" className="inline-flex items-center gap-2 text-sm uppercase tracking-widest text-charcoal/50 hover:text-smoky-pink-dark transition-colors">
        <ArrowLeft className="w-4 h-4" /> 返回博客列表
      </Link>

      <div className="space-y-6 text-center">
        <div className="flex justify-center gap-4 text-xs uppercase tracking-widest text-charcoal/50">
            {post.date && <span>{format(new Date(post.date), 'yyyy-MM-dd')}</span>}
            {post.category && <span>&bull; {post.category}</span>}
        </div>
        <h1 className="text-4xl md:text-5xl font-serif leading-tight">{post.title}</h1>
      </div>

      {post.cover && (
          <div className="w-full aspect-[2/1] rounded-2xl overflow-hidden bg-charcoal/5 shadow-sm">
             <img src={post.cover} className="w-full h-full object-cover" alt="" />
          </div>
      )}

      <div className="markdown-body font-serif text-lg text-charcoal/80 leading-relaxed max-w-2xl mx-auto">
        <Markdown>{post.content}</Markdown>
      </div>
    </motion.div>
  );
}
