import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Markdown from "react-markdown";
import { motion } from "motion/react";
import { ArrowLeft, BookOpen } from "lucide-react";

export function PortfolioDetail() {
  const { slug } = useParams();
  const [work, setWork] = useState<any>(null);

  useEffect(() => {
    fetch(`/api/content/portfolio/${slug}`)
      .then(res => res.json())
      .then(setWork);
  }, [slug]);

  if (!work) return <div className="animate-pulse h-96 bg-charcoal/5 rounded-2xl"></div>;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-5xl mx-auto space-y-12"
    >
      <Link to="/portfolio" className="inline-flex items-center gap-2 text-sm uppercase tracking-widest text-charcoal/50 hover:text-smoky-pink-dark transition-colors">
        <ArrowLeft className="w-4 h-4" /> 返回作品集
      </Link>

      <div className="flex flex-col md:flex-row gap-12 lg:gap-24">
        {/* Cover */}
        <div className="w-full md:w-1/3 flex-shrink-0">
          <div className="aspect-[2/3] overflow-hidden rounded-2xl shadow-md bg-charcoal/5 sticky top-8">
            {work.cover && <img src={work.cover} alt={work.title} className="w-full h-full object-cover" />}
          </div>
        </div>

        {/* Details */}
        <div className="w-full md:w-2/3 space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-serif">{work.title}</h1>
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm uppercase tracking-widest text-charcoal/60">
              {work.series && <span>系列：{work.series}</span>}
              <span>类型：{work.type}</span>
              <span>状态：{work.status}</span>
            </div>
            {work.characters && work.characters.length > 0 && (
              <div className="text-sm italic font-serif text-smoky-pink-dark">
                主要人物：{work.characters.join("、")}
              </div>
            )}
          </div>
          
          <div className="w-12 h-[1px] bg-smoky-pink-dark"></div>

          <div className="markdown-body font-serif text-lg text-charcoal/80 leading-relaxed">
            <Markdown>{work.content}</Markdown>
          </div>

          {work.link && (
            <div className="pt-8 w-full md:w-auto">
              <a 
                href={work.link} 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex w-full md:w-auto items-center justify-center gap-2 bg-charcoal text-soft-white px-8 py-4 rounded hover:bg-smoky-pink-dark transition-colors tracking-widest uppercase text-sm"
              >
                <BookOpen className="w-4 h-4" /> 开始阅读
              </a>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
