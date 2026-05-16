import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { getPortfolioList } from "../lib/content";

export function Portfolio() {
  const [works, setWorks] = useState<any[]>([]);
  const [filterType, setFilterType] = useState<string>("All");
  const [filterStatus, setFilterStatus] = useState<string>("All");

  useEffect(() => {
    getPortfolioList().then(setWorks);
  }, []);

  // Normalize length types
  const worksWithParsedType = works.map(w => {
    let simpleType = "其他";
    if (w.type?.includes("长篇")) simpleType = "长篇";
    else if (w.type?.includes("中篇")) simpleType = "中篇";
    else if (w.type?.includes("短篇")) simpleType = "短篇";
    return { ...w, simpleType };
  });

  const types = ["All", "长篇", "中篇", "短篇"];
  const statuses = ["All", ...Array.from(new Set(works.map(w => w.status).filter(Boolean)))];

  const filteredWorks = worksWithParsedType.filter(w => {
    const matchType = filterType === "All" || w.simpleType === filterType;
    const matchStatus = filterStatus === "All" || w.status === filterStatus;
    return matchType && matchStatus;
  });

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-16"
    >
      <div className="text-center space-y-6">
        <h1 className="text-4xl md:text-5xl font-serif">作品集 / Works</h1>
        <p className="text-charcoal/60 max-w-xl mx-auto italic font-serif opacity-70">所有的故事，都为了与你相逢。</p>
        <div className="w-12 h-[1px] bg-charcoal/20 mx-auto"></div>
      </div>

      {/* Filters */}
      <div className="flex flex-row flex-wrap justify-center items-center gap-4 md:gap-12 text-sm w-full mx-auto">
        <div className="flex flex-row items-center gap-2 md:gap-4">
            <span className="text-charcoal/50 uppercase tracking-widest text-xs whitespace-nowrap">类型：</span>
            <div className="flex flex-row flex-wrap justify-center gap-2">
                {types.map(t => (
                    <button 
                        key={t}
                        onClick={() => setFilterType(t as string)}
                        className={`px-3 py-1 text-xs uppercase tracking-widest transition-colors w-max ${filterType === t ? 'bg-charcoal text-oatmeal' : 'hover:bg-charcoal/5 text-charcoal/70'}`}
                    >
                        {t === "All" ? "全部" : t as string}
                    </button>
                ))}
            </div>
        </div>
        <div className="flex flex-row items-center gap-2 md:gap-4">
            <span className="text-charcoal/50 uppercase tracking-widest text-xs whitespace-nowrap">状态：</span>
            <div className="flex flex-row flex-wrap justify-center gap-2">
                {statuses.map(s => (
                    <button 
                        key={s}
                        onClick={() => setFilterStatus(s as string)}
                        className={`px-3 py-1 text-xs uppercase tracking-widest transition-colors w-max ${filterStatus === s ? 'bg-charcoal text-oatmeal' : 'hover:bg-charcoal/5 text-charcoal/70'}`}
                    >
                        {s === "All" ? "全部" : s as string}
                    </button>
                ))}
            </div>
        </div>
      </div>

      {/* Grid */}
      <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-16">
        <AnimatePresence>
          {filteredWorks.map((work, idx) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              key={work.slug}
            >
                <Link to={`/portfolio/${work.slug}`} className="group block space-y-4">
                <div className={`aspect-[3/4] overflow-hidden bg-white/50 backdrop-blur-sm border border-white/60 shadow-sm relative`}>
                    <div className={`absolute inset-0 opacity-20 ${idx % 2 === 0 ? 'bg-smoky-pink' : 'bg-smoky-pink-dark'}`}></div>
                    {work.cover && (
                    <img 
                        src={work.cover} 
                        alt={work.title} 
                        className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-multiply transition-transform duration-700 group-hover:scale-105"
                    />
                    )}
                </div>
                <div className="text-center space-y-2">
                    <p className="text-xs uppercase tracking-widest text-charcoal/40">{work.series || '单本'}</p>
                    <h3 className="text-lg font-serif">{work.title}</h3>
                    <div className="flex justify-center gap-2 text-[10px] uppercase tracking-widest text-charcoal/50 mt-2">
                        <span>{work.type}</span>
                        <span>&bull;</span>
                        <span>{work.status}</span>
                    </div>
                </div>
                </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
      
      {filteredWorks.length === 0 && (
          <div className="text-center text-charcoal/50 py-20 italic font-serif">
              没有找到符合条件的作品。
          </div>
      )}
    </motion.div>
  );
}
