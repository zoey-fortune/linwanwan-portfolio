import { useEffect, useState } from "react";
import Markdown from "react-markdown";
import { Link } from "react-router-dom";
import { motion } from "motion/react";

export function Home() {
  const [data, setData] = useState<any>(null);
  const [works, setWorks] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/content/home/index")
      .then(res => res.json())
      .then(setData);
      
    fetch("/api/content/portfolio")
      .then(res => res.json())
      .then(res => setWorks(res.slice(0, 3))); // Get top 3
  }, []);

  if (!data) return <div className="animate-pulse flex space-x-4 h-96 bg-charcoal/5 rounded-2xl"></div>;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 h-full"
    >
      {/* Left Section: Bio & Hero */}
      <div className="lg:col-span-5 flex flex-col justify-center">
        <div className="p-8 border border-charcoal/10 bg-white/40 backdrop-blur-sm relative space-y-8">
          <div className="absolute -top-3 -left-3 w-6 h-6 border-t border-l border-charcoal/40"></div>
          
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-serif leading-tight">
              {data.title}<br/>
              <span className="italic font-light text-smoky-pink-dark block mt-2 text-3xl">{data.slogan}</span>
            </h2>
          </div>

          <div className="markdown-body text-sm leading-relaxed opacity-70 font-light prose-p:mb-2 max-w-none">
            <Markdown>{data.content}</Markdown>
          </div>

          <div className="flex items-center gap-4 pt-4">
            <Link to="/portfolio" className="px-6 py-2 bg-charcoal text-oatmeal text-xs tracking-widest font-serif uppercase hover:opacity-80 transition-opacity">
              探索作品
            </Link>
            <span className="text-[11px] opacity-40 font-serif italic hidden md:inline">基于 Next.js 与 Decap CMS 构建</span>
          </div>
        </div>
      </div>

      {/* Right Section: Works Showcase */}
      <div className="lg:col-span-7 flex flex-col justify-center">
        {/* Updates Section */}
        {data.updates && data.updates.length > 0 && (
            <div className="mb-10 border border-charcoal/10 bg-white/40 p-6 backdrop-blur-sm relative shadow-sm">
               <h3 className="font-serif text-lg mb-4">最新动态 <span className="text-xs opacity-40 ml-2 uppercase tracking-widest">/ Updates</span></h3>
               <ul className="space-y-3">
                 {data.updates.map((update: string, index: number) => (
                    <li key={index} className="text-sm opacity-80 flex items-start gap-3">
                       <span className="text-smoky-pink-dark text-xs mt-0.5">◆</span> 
                       <span className="flex-1 leading-relaxed font-serif text-charcoal/80">{update}</span>
                    </li>
                 ))}
               </ul>
            </div>
        )}

        <div className="flex justify-between items-end mb-6">
          <h3 className="font-serif text-xl">代表作品 <span className="text-xs opacity-40 ml-2 uppercase tracking-widest">/ Selection</span></h3>
          <Link to="/portfolio" className="text-xs opacity-50 hover:opacity-100 underline underline-offset-4 transition-opacity">查看全部</Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {works.map((work, index) => (
            <Link key={work.slug} to={`/portfolio/${work.slug}`} className="group block">
              <div className={`aspect-[3/4] mb-3 border border-white/60 shadow-sm relative overflow-hidden bg-white/50 backdrop-blur-sm`}>
                 {/* Decorative background color variation based on index */}
                 <div className={`absolute inset-0 opacity-40 ${index === 0 ? 'bg-smoky-pink' : index === 1 ? 'bg-smoky-pink-dark' : 'bg-white'}`}></div>
                 {work.cover && <img src={work.cover} alt={work.title} className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-multiply transition-transform duration-700 group-hover:scale-105" />}
                 
                 <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center z-10 transition-transform duration-500">
                    <span className="text-[10px] uppercase tracking-widest opacity-40 mb-2">{work.type} • {work.series || '单本'}</span>
                    <h4 className="font-serif text-lg text-charcoal">{work.title}</h4>
                    <div className="w-4 h-[1px] bg-charcoal/20 my-3"></div>
                    <span className="text-[9px] opacity-60 leading-tight line-clamp-3 px-2">
                       {work.summary || "爱意在细枝末节中悄然流露。"}
                    </span>
                 </div>
              </div>
              <p className="text-[11px] font-serif italic text-center opacity-60 group-hover:opacity-100 transition-opacity">
                 {work.status} • {work.date ? new Date(work.date).getFullYear() : '待定'}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
