"use client";

import { Check, Zap, Shield, Cpu, Layers, Palette, Terminal } from "lucide-react";

const FeatureCard = ({
  icon: Icon,
  title,
  description,
  className = "",
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  className?: string;
}) => (
  <div
    className={`group relative p-8 bg-card border border-border/60 rounded-[2.5rem] transition-all hover:border-primary/40 hover:-translate-y-1 overflow-hidden ${className}`}
  >
    <div className="relative z-10">
      <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="text-xl font-bold text-foreground mb-3 uppercase tracking-tight">{title}</h3>
      <p className="text-muted-foreground leading-relaxed text-sm md:text-base">{description}</p>
    </div>
    {/* Subtle geometric accent (No gradient) */}
    <div className="absolute top-4 right-4 text-[10px] font-mono text-muted-foreground/20 uppercase tracking-widest hidden md:block">
      Module.Spec_{title.split(" ")[0]}
    </div>
  </div>
);

const FeaturesSection = () => {
  return (
    <section className="relative py-24 lg:py-32 bg-background overflow-hidden px-4 md:px-0">
      {/* Decorative lines (No gradients) */}
      <div className="absolute left-1/2 top-0 w-px h-full bg-border/20 -translate-x-1/2 hidden lg:block" />

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* HEADER BLOCK */}
        <div className="flex flex-col md:flex-row items-end justify-between gap-8 mb-20">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary text-primary-foreground text-[10px] font-black uppercase tracking-[0.2em] mb-6">
              <Check className="w-3 h-3" />
              The System Advantages
            </div>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-foreground leading-[0.9] uppercase">
              Engineered for <br />
              <span className="text-primary italic">Absolute</span> Precision.
            </h2>
          </div>
          <p className="text-muted-foreground max-w-sm text-lg font-medium border-l-2 border-primary/20 pl-6 py-2">
            Every feature is hand-crafted to provide a seamless development experience without the
            baggage of traditional libraries.
          </p>
        </div>

        {/* BRUTALIST BENTO GRID */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          {/* Main Feature (Mega Card) */}
          <div className="md:col-span-12 lg:col-span-7 group relative p-10 bg-foreground text-background rounded-[3rem] min-h-[400px] flex flex-col justify-between overflow-hidden shadow-2xl">
            <div className="absolute top-10 right-10 flex gap-4">
              <div className="w-16 h-16 border border-background/20 rounded-full flex items-center justify-center">
                <Terminal className="w-8 h-8 text-primary" />
              </div>
              <div className="w-16 h-16 bg-primary rounded-[2rem] flex items-center justify-center">
                <Zap className="w-8 h-8 text-primary-foreground" />
              </div>
            </div>

            <div>
              <div className="text-primary text-xs font-mono font-bold uppercase mb-4 tracking-[0.5em]">
                Primary.Core.Function
              </div>
              <h3 className="text-4xl md:text-6xl font-black uppercase leading-none mb-6">
                Atomic <br />
                Delivery.
              </h3>
              <p className="max-w-md text-lg opacity-70 leading-relaxed font-medium">
                Our CLI injects production-ready code directly into your source. No npm wrappers, no
                version conflicts, just raw control.
              </p>
            </div>

            <div className="mt-8 flex gap-3">
              <div className="px-4 py-2 border border-background/20 rounded-full text-[10px] font-mono uppercase tracking-widest">
                Setup: 1s
              </div>
              <div className="px-4 py-2 border border-background/20 rounded-full text-[10px] font-mono uppercase tracking-widest">
                Weight: 0kb
              </div>
            </div>

            {/* Visual Decoration */}
            <div className="absolute -bottom-10 -right-10 w-64 h-64 border-[40px] border-primary/10 rounded-full" />
          </div>

          {/* Secondary Features */}
          <div className="md:col-span-6 lg:col-span-5">
            <FeatureCard
              icon={Cpu}
              title="TypeScript Native"
              description="Built with strict typing from the ground up. Get perfect autocomplete and type safety in every component."
              className="h-full"
            />
          </div>

          <div className="md:col-span-6 lg:col-span-4">
            <FeatureCard
              icon={Layers}
              title="Tailwind First"
              description="Leveraging the latest Tailwind engine for maximum performance and CSS-variable driven theming."
            />
          </div>

          <div className="md:col-span-6 lg:col-span-4">
            <FeatureCard
              icon={Shield}
              title="Zero Dependencies"
              description="Each component is self-contained. No phantom dependencies or complex build steps required."
            />
          </div>

          <div className="md:col-span-6 lg:col-span-4">
            <FeatureCard
              icon={Palette}
              title="Adaptive Themes"
              description="Seamlessly inherits your global theme tokens while allowing per-component color overrides."
            />
          </div>
        </div>

        {/* Dynamic footer line */}
        <div className="mt-24 pt-8 border-t border-border/40 flex flex-col md:flex-row justify-between items-center gap-6 opacity-40 grayscale group hover:grayscale-0 transition-all duration-500">
          <div className="text-[10px] font-mono font-bold uppercase tracking-[0.3em]">
            End.System_Spec.Features
          </div>
          <div className="flex gap-8">
            <div className="h-4 w-4 bg-foreground rounded-none" />
            <div className="h-4 w-4 bg-primary rounded-full" />
            <div className="h-4 w-4 border-2 border-foreground rounded-lg" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
