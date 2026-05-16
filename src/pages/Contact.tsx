import { useState } from "react";
import { motion } from "motion/react";
import { Send, Instagram, Twitter, Mail } from "lucide-react";

export function Contact() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto space-y-16"
    >
      <div className="text-center space-y-6">
        <h1 className="text-4xl md:text-5xl font-serif">联系我 / Contact</h1>
        <p className="text-charcoal/60 max-w-xl mx-auto italic font-serif">关于咨询、合作，或是简单的一句问候。</p>
        <div className="w-12 h-[1px] bg-smoky-pink-dark mx-auto"></div>
      </div>

      <div className="flex flex-col md:flex-row gap-16">
        <div className="w-full md:w-2/3">
            {status === "success" ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-smoky-pink/20 p-8 rounded-2xl text-center space-y-4"
                >
                    <Send className="w-8 h-8 mx-auto text-smoky-pink-dark" />
                    <h3 className="font-serif text-2xl">消息已发送</h3>
                    <p className="text-charcoal/70">感谢您的留言，我会尽快给您回复。</p>
                    <button 
                        onClick={() => setStatus("idle")}
                        className="mt-4 text-xs uppercase tracking-widest border-b border-charcoal/30 pb-1 hover:border-charcoal transition-colors"
                    >
                        再发一条
                    </button>
                </motion.div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-6 bg-white/50 p-8 rounded-2xl shadow-sm border border-charcoal/5">
                    <div className="space-y-2">
                        <label htmlFor="name" className="block text-xs uppercase tracking-widest text-charcoal/70">姓名</label>
                        <input 
                            required
                            type="text" 
                            id="name" 
                            name="name" 
                            className="w-full bg-transparent border-b border-charcoal/20 py-2 focus:outline-none focus:border-smoky-pink-dark transition-colors font-serif"
                        />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="email" className="block text-xs uppercase tracking-widest text-charcoal/70">电子邮箱</label>
                        <input 
                            required
                            type="email" 
                            id="email" 
                            name="email" 
                            className="w-full bg-transparent border-b border-charcoal/20 py-2 focus:outline-none focus:border-smoky-pink-dark transition-colors font-serif"
                        />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="message" className="block text-xs uppercase tracking-widest text-charcoal/70">留言内容</label>
                        <textarea 
                            required
                            id="message" 
                            name="message" 
                            rows={5}
                            className="w-full bg-transparent border-b border-charcoal/20 py-2 focus:outline-none focus:border-smoky-pink-dark transition-colors font-serif resize-none"
                        ></textarea>
                    </div>
                    <button 
                        type="submit"
                        disabled={status === "loading"}
                        className="w-full bg-charcoal text-soft-white py-4 mt-4 uppercase tracking-widest text-xs hover:bg-smoky-pink-dark transition-colors disabled:opacity-50"
                    >
                        {status === "loading" ? "发送中..." : "发送消息"}
                    </button>
                </form>
            )}
        </div>

        <div className="w-full md:w-1/3 md:pl-10 space-y-8">
            <div>
                <h3 className="uppercase tracking-widest text-xs font-semibold mb-4 text-charcoal/70">社交链接 (Connect)</h3>
                <div className="space-y-4">
                    <a href="#" className="flex items-center gap-3 text-sm hover:text-smoky-pink-dark transition-colors">
                        <Instagram className="w-4 h-4" /> Instagram 小红书
                    </a>
                    <a href="#" className="flex items-center gap-3 text-sm hover:text-smoky-pink-dark transition-colors">
                        <Twitter className="w-4 h-4" /> 微博
                    </a>
                    <a href="mailto:hello@example.com" className="flex items-center gap-3 text-sm hover:text-smoky-pink-dark transition-colors">
                        <Mail className="w-4 h-4" /> contact@linwanwan.studio
                    </a>
                </div>
            </div>
        </div>
      </div>
    </motion.div>
  );
}
