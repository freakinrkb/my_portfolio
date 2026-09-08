import { cn } from "@/lib/utils";

/**
 * Code-drawn project visuals — no image assets needed.
 * Razorpay: payment flow diagram. Investment Tracker: terminal mockup.
 */

function FlowNode({ label, sub, className }: { label: string; sub: string; className?: string }) {
  return (
    <div
      className={cn(
        "flex min-w-0 flex-1 flex-col items-center rounded-lg border bg-card px-2 py-2.5 text-center",
        className
      )}
    >
      <span className="truncate text-xs font-semibold">{label}</span>
      <span className="truncate text-[11px] text-muted-foreground">{sub}</span>
    </div>
  );
}

function FlowArrow() {
  return (
    <span aria-hidden className="shrink-0 text-brand">
      →
    </span>
  );
}

function PaymentFlowDiagram() {
  return (
    <div role="img" aria-label="Payment flow: client to Spring Boot to Razorpay API to MySQL">
      <div className="flex items-center gap-1.5">
        <FlowNode label="Client" sub="Checkout UI" />
        <FlowArrow />
        <FlowNode label="Spring Boot" sub="Orders API" className="border-brand/40" />
        <FlowArrow />
        <FlowNode label="Razorpay" sub="Order + verify" />
        <FlowArrow />
        <FlowNode label="MySQL" sub="Transactions" />
      </div>
      <div className="mt-2 flex items-center gap-1.5">
        <FlowNode label="Webhook" sub="Callback intake" className="border-dashed" />
        <FlowArrow />
        <FlowNode label="Verify" sub="Signature check" className="border-brand/40" />
        <FlowArrow />
        <FlowNode label="Respond" sub="Consistent errors" />
        <div className="flex-1" aria-hidden />
      </div>
    </div>
  );
}

function TerminalMockup() {
  const lines = [
    { prompt: "$", cmd: "GET /api/portfolio/pnl?range=1y", out: null },
    { prompt: "→", cmd: null, out: '{ "invested": 250000, "current": 312400,' },
    { prompt: "", cmd: null, out: '  "pnl": "+24.9%", "xirr": "18.2%" }' },
    { prompt: "$", cmd: "GET /api/holdings — 200 in 42ms", out: null },
  ];
  return (
    <div
      role="img"
      aria-label="Terminal showing investment tracker REST responses"
      className="overflow-hidden rounded-lg border bg-zinc-950 text-left dark:bg-black"
    >
      <div className="flex items-center gap-1.5 border-b border-white/10 px-3 py-2" aria-hidden>
        <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
        <span className="ml-2 font-mono text-[11px] text-zinc-500">investment-tracker — zsh</span>
      </div>
      <div className="space-y-1 px-3 py-3 font-mono text-xs leading-relaxed">
        {lines.map((l, i) => (
          <p key={i} className="whitespace-pre-wrap break-all">
            <span className="mr-2 text-emerald-400">{l.prompt}</span>
            {l.cmd && <span className="text-zinc-200">{l.cmd}</span>}
            {l.out && <span className="text-zinc-400">{l.out}</span>}
          </p>
        ))}
      </div>
    </div>
  );
}

export function ProjectVisual({ slug, className }: { slug: string; className?: string }) {
  return (
    <div className={cn("rounded-xl border bg-muted/40 p-4", className)}>
      {slug.includes("razorpay") ? <PaymentFlowDiagram /> : <TerminalMockup />}
    </div>
  );
}
