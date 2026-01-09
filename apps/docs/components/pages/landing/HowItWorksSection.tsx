"use client";

import { Terminal, Code, Rocket } from "lucide-react";

export default function HowItWorksSection() {
  const steps = [
    {
      number: "01",
      icon: Terminal,
      title: "Install Component",
      description:
        "Run a single command to add any component to your project. No manual file copying needed.",
      code: "npx inam-ui add button",
    },
    {
      number: "02",
      icon: Code,
      title: "Customize & Adapt",
      description:
        "Modify the component to match your design system. Full source code ownership, no black boxes.",
      code: '// Edit your way\n<Button variant="success">Save</Button>',
    },
    {
      number: "03",
      icon: Rocket,
      title: "Ship to Production",
      description:
        "Deploy with confidence. TypeScript-native, fully tested, and production-ready components.",
      code: "npm run build",
    },
  ];

  return (
    <section className="relative py-24 lg:py-32 bg-background overflow-hidden px-4 md:px-0">
      {/* Decorative lines (matching Features section) */}
      <div className="absolute left-1/2 top-0 w-px h-full bg-border/20 -translate-x-1/2 hidden lg:block" />

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* HEADER BLOCK - matching Features section style */}
        <div className="flex flex-col md:flex-row items-end justify-between gap-8 mb-20">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary text-primary-foreground text-[10px] font-black uppercase tracking-[0.2em] mb-6">
              <Terminal className="w-3 h-3" />
              The Process
            </div>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-foreground leading-[0.9] uppercase">
              Three Steps <br />
              <span className="text-primary italic">To Production</span>.
            </h2>
          </div>
          <p className="text-muted-foreground max-w-sm text-lg font-medium border-l-2 border-primary/20 pl-6 py-2">
            From installation to deployment in minutes. No complex setup, no hidden dependencies.
          </p>
        </div>

        {/* STEPS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={index}
                className="group relative p-8 bg-card border border-border/60 rounded-[2.5rem] transition-all hover:border-primary/40 hover:-translate-y-1 overflow-hidden"
              >
                {/* Step number (large background) */}
                <div className="absolute top-6 right-6 text-8xl font-black text-foreground/5 leading-none select-none">
                  {step.number}
                </div>

                <div className="relative z-10">
                  {/* Icon */}
                  <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                    <Icon className="w-6 h-6" />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-foreground mb-3 uppercase tracking-tight">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-muted-foreground leading-relaxed text-sm md:text-base mb-6">
                    {step.description}
                  </p>

                  {/* Code snippet */}
                  <div className="relative p-4 bg-background border border-border rounded-xl">
                    <pre className="text-xs font-mono text-foreground overflow-x-auto">
                      <code>{step.code}</code>
                    </pre>
                  </div>
                </div>

                {/* Subtle geometric accent (matching Features section) */}
                <div className="absolute bottom-4 right-4 text-[10px] font-mono text-muted-foreground/20 uppercase tracking-widest hidden md:block">
                  Step.{step.number}
                </div>
              </div>
            );
          })}
        </div>

        {/* Dynamic footer line (matching Features section) */}
        <div className="mt-24 pt-8 border-t border-border/40 flex flex-col md:flex-row justify-between items-center gap-6 opacity-40 grayscale group hover:grayscale-0 transition-all duration-500">
          <div className="text-[10px] font-mono font-bold uppercase tracking-[0.3em]">
            End.Process_Spec.HowItWorks
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
}
