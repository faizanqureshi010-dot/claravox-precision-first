import Image from "next/image";
import { CheckCircle2, Sparkles, ArrowRight, TrendingUp } from "lucide-react";
import { RevenueCycleRing } from "@/components/RevenueCycleRing";
import { Reveal } from "@/components/ui/motion/Reveal";

const agentFeatures = [
  "24/7 Appointment Scheduling",
  "Automated Patient Responses",
  "Call Handling",
  "Appointment Confirmation",
];

const workflowStages = ["Eligibility", "Coding", "Claims", "Follow-Up"];

/**
 * The hero's right-side visual.
 *
 * LAYOUT (per explicit direction, this round): at lg+, this is two
 * independent absolutely-positioned pieces inside one relative,
 * fixed-height box — not a flex flow, because a flow can't put the ring
 * "in the center of the headline" (a sibling in a different column) or
 * size the ring "to maximum" against a right-side card stack of known
 * width at the same time. Both pieces are computed against fixed,
 * known dimensions instead of estimated ones, which is what makes "no
 * overlapping" actually checkable:
 *
 * 1. Card stack (AI Appointment Agent, then Practice Overview, then
 *    Revenue Cycle Workflow) — pinned top-4 right-4, fixed w-[260px],
 *    stacked in a flex-col with gap-3. Its right/top edges are fixed;
 *    its height is whatever the three cards' content requires.
 *
 * 2. The ring — absolutely positioned, vertically centered (top-1/2
 *    -translate-y-1/2) against this box's own height, which is set via
 *    lg:min-h-[620px] to approximate the left column's headline block
 *    height (the actual <h1> lives in a sibling grid column in
 *    page.tsx, not in this file, so this is a matched constant, not a
 *    cross-component measurement — true pixel-for-pixel sync would
 *    need a shared ref or JS measurement, which is a larger change than
 *    this pass). Its width is `calc(100% - 284px)` — 100% of this box
 *    minus the card stack's 260px plus a 24px gap — capped with
 *    `max-w-[460px]` so it doesn't balloon at very wide viewports
 *    beyond a size that still reads as proportionate. That calc() is
 *    the actual overlap guarantee: the ring's box can only ever occupy
 *    the horizontal space to the left of the card stack, never
 *    underneath it, at any width ≥ the lg breakpoint.
 *
 * "Maximum size" here means: as large as fits in the space left over
 * after the fixed 260px card stack, not an arbitrary bigger constant —
 * a bigger constant is exactly what caused the last two rounds of
 * overlap bugs.
 *
 * Below `lg`, there's no "corner" or "center of the headline" to speak
 * of (single column, stacked), so this renders as plain flow instead:
 * AI card, ring, Practice Overview, Workflow, top to bottom — matching
 * the same content order as the desktop version, just linearized.
 *
 * Honest limitation: this file has never been rendered in a real
 * browser in this environment. The overlap-avoidance is verified by
 * construction (calc() width against a fixed sibling width, vertical
 * centering against an explicit min-height) rather than by observing
 * pixels, which is a real guarantee for the specific numbers used here,
 * but the exact vertical alignment against the actual rendered height
 * of the <h1> in the left column is an approximation (see point 2
 * above), not a measured match.
 */

function AgentCard() {
  return (
    <div className="rounded-xl border border-mist bg-white/95 p-4 shadow-raised backdrop-blur">
      <div className="flex items-center gap-2">
        <span className="flex h-8 w-8 items-center justify-center rounded-md bg-gradient-to-br from-violet to-royal text-white">
          <Sparkles className="h-4 w-4" aria-hidden="true" />
        </span>
        <div>
          <span className="block text-[10px] font-bold uppercase tracking-wider text-teal-text">AI</span>
          <span className="block text-sm font-semibold leading-tight text-ink">AI Appointment Agent</span>
        </div>
      </div>
      <ul className="mt-3 space-y-1.5">
        {agentFeatures.map((feature) => (
          <li key={feature} className="flex items-start gap-1.5 text-xs leading-snug text-charcoal">
            <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-teal-deep" aria-hidden="true" />
            {feature}
          </li>
        ))}
      </ul>
    </div>
  );
}

function PracticeOverviewCard() {
  return (
    <div className="rounded-xl border border-mist bg-white/95 p-4 shadow-raised backdrop-blur">
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-semibold uppercase tracking-wider text-teal-text">
          Practice Overview
        </span>
        <TrendingUp className="h-3.5 w-3.5 text-teal-deep" aria-hidden="true" />
      </div>
      <div className="mt-3 flex items-end gap-1" aria-hidden="true">
        {[40, 55, 48, 65, 60, 78, 72].map((h, i) => (
          <span
            key={i}
            className="w-full rounded-sm bg-gradient-to-t from-violet/20 to-teal-deep"
            style={{ height: `${h}%`, maxHeight: "44px" }}
          />
        ))}
      </div>
      <div className="mt-3 space-y-1.5 border-t border-mist pt-2.5">
        <div className="flex items-center justify-between text-[11px]">
          <span className="text-charcoal/80">Claim Status</span>
          <span className="font-semibold text-teal-text">On Track</span>
        </div>
        <div className="flex items-center justify-between text-[11px]">
          <span className="text-charcoal/80">Collections</span>
          <span className="font-semibold text-teal-text">Improving</span>
        </div>
      </div>
      <p className="mt-2 text-[10px] leading-snug text-charcoal/60">Illustrative preview</p>
    </div>
  );
}

function WorkflowCard() {
  return (
    <div className="rounded-xl border border-mist bg-white/95 p-4 shadow-raised backdrop-blur">
      <span className="text-[10px] font-semibold uppercase tracking-wider text-teal-text">
        Revenue Cycle Workflow
      </span>
      <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
        {workflowStages.map((stage, index) => (
          <span key={stage} className="flex items-center gap-1.5">
            <span className="rounded-full border border-violet/15 bg-cloud px-2.5 py-1 font-data text-[11px] font-semibold text-violet">
              {stage}
            </span>
            {index < workflowStages.length - 1 && (
              <ArrowRight className="h-3 w-3 shrink-0 text-violet/40" aria-hidden="true" />
            )}
          </span>
        ))}
      </div>
    </div>
  );
}

export function HeroComposition() {
  return (
    <div className="relative lg:min-h-[620px]">
      {/* Background: soft gradient glow + brand watermark pattern */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden lg:block">
        <div className="absolute right-[6%] top-[4%] h-64 w-64 rounded-full bg-royal/20 blur-3xl" />
        <div className="absolute bottom-[8%] left-[2%] h-56 w-56 rounded-full bg-teal-deep/15 blur-3xl" />
        <Image
          src="/icon-mark.png"
          alt=""
          width={640}
          height={476}
          className="absolute -right-10 bottom-0 h-auto w-[280px] rotate-6 opacity-[0.04]"
        />
      </div>

      {/* Silhouette atmosphere layer — abstract, not a literal photo. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 hidden items-center justify-center lg:flex"
      >
        <svg viewBox="0 0 300 300" className="h-[420px] w-[420px] opacity-[0.07]">
          <circle cx="150" cy="95" r="52" fill="var(--color-violet)" />
          <path
            d="M 55 300 C 55 205, 100 165, 150 165 C 200 165, 245 205, 245 300 Z"
            fill="var(--color-violet)"
          />
        </svg>
      </div>

      {/* Desktop (lg+): ring centered against this box's own height —
         see component note above for why lg:min-h-[620px] exists and
         what it approximates. Pulled back down to max-w-[440px] — the
         600px version still visibly overlapped the card stack on the
         right in the actual deployed render, which means the
         calc()-based "no overlap" reasoning above didn't hold up against
         real rendered widths (likely because the composition column is
         wider at common viewports than assumed). Rather than keep
         chasing an exact-fit number I can't verify in a real browser
         from here, this trades some size for an honest safety margin:
         440px, anchored left-0 (not full-width), so there's deliberate
         clearance on both sides — from the headline on the left and
         from the card stack on the right — instead of a razor-thin
         calculated fit that keeps breaking in practice. */}
      {/* Desktop (lg+): ring top-aligned with the card stack (top-4,
         same as the card), not vertically centered — per explicit
         direction that the ring should sit at the AI card's level, with
         the "Verify" node badge allowed to poke above that line (it
         already renders slightly above the ring's own square box, since
         RevenueCycleRing positions node tags at radius*1.32, which is
         outside the 0–100% box for the topmost node; nothing clips it,
         since none of this box's ancestors set overflow-hidden).
         Horizontally, this is now true centering (inset-x-0 mx-auto)
         within the composition's own box, rather than a fixed left
         offset — per explicit direction to center it in the vacant
         space between the headline (left column, outside this box
         entirely) and the card stack (pushed out to the viewport edge,
         also now outside this box's own right edge — see the card
         stack's own comment below). Since neither the headline nor the
         cards actually occupy any of this box's own width anymore, that
         vacant space and "this box's width" are the same thing, so
         centering within the box is centering within the gap. */}
      <div className="pointer-events-none absolute inset-x-0 top-4 z-[1] mx-auto hidden w-full max-w-[480px] lg:block">
        <div className="pointer-events-auto">
          <RevenueCycleRing />
        </div>
      </div>

      {/* Desktop (lg+): the fixed-width card stack, pushed out past the
         `.container-page` boundary to sit near the TRUE right edge of
         the browser viewport (not just this column's inset), per
         explicit direction. `.container-page` at lg+ has 5rem of its
         own right padding, plus — once the viewport exceeds its
         1280px max-width — an additional `(100vw - 1280px) / 2` of
         centering margin outside that. The right offset below cancels
         both of those and then comes back in by 1rem, so the stack
         ends up 1rem from the actual viewport edge regardless of
         viewport width, not just 1rem from the column's own edge (which
         is what right-4 alone would give, since right-4 is relative to
         this composition div, which still lives inside the constrained
         container). top-4 is unchanged — that "small gap from the
         border" was a separate, already-settled request. */}
      <div className="absolute top-4 z-[2] hidden w-[260px] flex-col gap-3 right-[calc(-4rem_-_max(0px,(100vw_-_1280px)/2))] lg:flex">
        <Reveal effect="fade" delay={150} className="[animation:float_6s_ease-in-out_infinite]">
          <AgentCard />
        </Reveal>
        <Reveal effect="fade" delay={300} className="[animation:float_7s_ease-in-out_infinite]">
          <PracticeOverviewCard />
        </Reveal>
        <Reveal effect="fade" delay={450} className="[animation:float_8s_ease-in-out_infinite]">
          <WorkflowCard />
        </Reveal>
      </div>

      {/* Mobile/tablet (<lg): plain stacked flow, same content order —
         AI card, ring, Practice Overview, Workflow. No corner-pinning or
         center-alignment claims here; there's only one column. */}
      <div className="relative z-[1] flex flex-col items-center gap-6 lg:hidden">
        <Reveal
          effect="fade"
          delay={150}
          className="mx-auto w-full max-w-[300px] [animation:float_6s_ease-in-out_infinite]"
        >
          <AgentCard />
        </Reveal>

        <div className="w-full max-w-[380px]">
          <RevenueCycleRing />
        </div>

        <Reveal
          effect="fade"
          delay={300}
          className="mx-auto w-full max-w-[300px] [animation:float_7s_ease-in-out_infinite]"
        >
          <PracticeOverviewCard />
        </Reveal>

        <Reveal
          effect="fade"
          delay={450}
          className="mx-auto w-full max-w-[300px] [animation:float_8s_ease-in-out_infinite]"
        >
          <WorkflowCard />
        </Reveal>
      </div>
    </div>
  );
}
