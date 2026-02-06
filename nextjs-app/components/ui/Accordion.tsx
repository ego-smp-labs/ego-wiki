"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface AccordionItem {
    id: string;
    question: string;
    answer: string;
}

interface AccordionProps {
    items: AccordionItem[];
}

export default function Accordion({ items }: AccordionProps) {
    const [openId, setOpenId] = useState<string | null>(null);

    const toggle = (id: string) => {
        setOpenId(openId === id ? null : id);
    };

    return (
        <div className="space-y-3">
            {items.map((item, index) => (
                <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="rounded-xl bg-void-surface border border-void-border overflow-hidden"
                >
                    <button
                        onClick={() => toggle(item.id)}
                        className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-void-bg/50 transition-colors"
                    >
                        <span className="flex items-center gap-3">
                            <span className="text-xs font-mono text-neon-cyan">
                                {String(index + 1).padStart(2, "0")}
                            </span>
                            <span className="font-medium text-white">{item.question}</span>
                        </span>
                        <ChevronDown
                            size={18}
                            className={`text-white/50 transition-transform duration-300 ${openId === item.id ? "rotate-180" : ""
                                }`}
                        />
                    </button>

                    <AnimatePresence>
                        {openId === item.id && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="overflow-hidden"
                            >
                                <div className="px-5 pb-4 text-white/60 text-sm leading-relaxed border-t border-void-border pt-4 ml-8">
                                    {item.answer}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            ))}
        </div>
    );
}
