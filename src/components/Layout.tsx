import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Instagram, Mail, Feather } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export function Layout({ children }: { children: React.ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const links = [
    { href: "/", label: "首页" },
    { href: "/portfolio", label: "作品集" },
    { href: "/blog", label: "博客" },
    { href: "/contact", label: "联系" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-oatmeal text-charcoal relative overflow-x-hidden font-sans select-none">
      {/* Decorative Background Accents - Isolated stacking context to prevent Safari blurring text */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-50px] right-[-50px] w-64 h-64 bg-smoky-pink rounded-full opacity-30 blur-3xl"></div>
        <div className="absolute bottom-[-20px] left-[-20px] w-48 h-48 bg-smoky-pink-dark rounded-full opacity-20 blur-2xl"></div>
      </div>

      <header className="flex justify-between items-center px-8 md:px-16 pt-10 pb-6 border-b border-charcoal/5 z-10">
        <div className="flex flex-col">
          <Link to="/" className="flex items-center gap-2 text-3xl font-serif tracking-widest italic font-light leading-none text-charcoal">
            <span>林晚晚</span>
          </Link>
          <span className="text-[10px] tracking-[0.3em] uppercase opacity-60 mt-2">Wanwan's Inkwell</span>
        </div>
        
        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-12 text-sm tracking-widest font-serif opacity-80">
          {links.map((l) => (
            <Link
              key={l.href}
              to={l.href}
              className={`hover:opacity-60 transition-opacity ${location.pathname === l.href || (l.href!== '/' && location.pathname.startsWith(l.href)) ? 'border-b border-charcoal pb-1' : ''}`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Icons */}
        <div className="hidden md:flex gap-4 opacity-70">
          <a href="#" className="w-8 h-8 rounded-full border border-charcoal/20 flex items-center justify-center text-xs hover:bg-charcoal hover:text-oatmeal transition-colors"><Instagram strokeWidth={1.5} className="w-4 h-4"/></a>
          <a href="/contact" className="w-8 h-8 rounded-full border border-charcoal/20 flex items-center justify-center text-xs hover:bg-charcoal hover:text-oatmeal transition-colors"><Mail strokeWidth={1.5} className="w-4 h-4"/></a>
        </div>

        {/* Mobile Nav Toggle */}
        <button 
          className="md:hidden relative z-50 p-2 opacity-70"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X strokeWidth={1} /> : <Menu strokeWidth={1} />}
        </button>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40"
            >
              <div className="absolute inset-0 bg-oatmeal/90 backdrop-blur-md"></div>
              <div className="relative flex flex-col items-center justify-center h-full gap-8">
                {links.map((l) => (
                  <Link
                    key={l.href}
                    to={l.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="text-2xl font-serif text-charcoal hover:opacity-60 transition-opacity"
                  >
                    {l.label}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
      
      <main className="flex-1 w-full max-w-7xl mx-auto px-6 md:px-16 py-8 relative z-10">
        {children}
      </main>

      {/* Bottom Bar styled like footer in the template */}
      <footer className="px-8 md:px-16 py-6 border-t border-charcoal/5 grid grid-cols-1 md:grid-cols-12 gap-8 bg-white/20 z-10 relative">
        <div className="md:col-span-5 md:border-r border-charcoal/5 pr-8 flex flex-col justify-center">
          <h4 className="text-[10px] uppercase tracking-[0.2em] opacity-40 mb-3">邮件订阅 / Subscribe</h4>
          <p className="text-xs font-serif opacity-70 mb-2">加入我的邮件列表，获取新书发布和签售活动的最新资讯。</p>
        </div>
        <div className="md:col-span-4 flex flex-col justify-center">
          <h4 className="text-[10px] uppercase tracking-[0.2em] opacity-40 mb-2">商务合作 / Contact</h4>
          <p className="text-xs font-serif">contact@linwanwan.studio</p>
          <p className="text-[10px] opacity-30 mt-1">我们会在 48 小时内回复您的咨询。</p>
        </div>
        <div className="md:col-span-3 flex md:flex-col items-center md:items-end justify-center md:justify-end text-[10px] opacity-40 uppercase tracking-widest text-center mt-4 md:mt-0">
          © {new Date().getFullYear()} 林晚晚
        </div>
      </footer>

      {/* Visual Flare: Floating flower silhouette */}
      <div className="absolute bottom-20 right-10 opacity-[0.03] pointer-events-none z-0">
        <svg width="200" height="200" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M50 10C50 10 40 40 10 50C40 60 50 90 50 90C50 90 60 60 90 50C60 40 50 10 50 10Z" fill="currentColor" />
        </svg>
      </div>
    </div>
  );
}
