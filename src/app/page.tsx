import Navbar from "@/components/global/Navbar";
import { Button } from "@/components/ui/button";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { MacbookScroll } from "@/components/ui/macbook-scroll";
import { cn } from "@/lib/utils";
import { ArrowRight, Zap, Lock, Workflow } from "lucide-react";

const testimonials = [
  {
    quote:
      "This platform turned hours of manual work into a few clicks. It's like having a personal automation engineer on call 24/7.",
    name: "Aarav Sharma",
    title: "Product Manager, NovaWorks",
  },
  {
    quote:
      "Our team scaled faster than ever. The automation pipelines are intuitive, flexible, and a joy to use.",
    name: "Sofia Mendes",
    title: "CTO, BrightStack",
  },
  {
    quote:
      "We replaced four internal tools with this one solution. It's fast, reliable, and incredibly well thought out.",
    name: "Ethan Patel",
    title: "Founder, Syncly",
  },
  {
    quote:
      "Every SaaS company should look into this. The workflow builder alone is worth it.",
    name: "Liam Carter",
    title: "Head of Engineering, CloudCore",
  },
  {
    quote:
      "Automation that feels effortless. Our entire deployment pipeline is now self-managed and fully transparent.",
    name: "Nora Park",
    title: "DevOps Engineer, Zentry Labs",
  },
  {
    quote:
      "The clean UI and smart triggers made onboarding a breeze. Within a day, we automated 70% of our repetitive tasks.",
    name: "Karan Desai",
    title: "Operations Lead, PixelLogic",
  },
  {
    quote:
      "It's not just automation — it's orchestration. The platform handles complexity beautifully.",
    name: "Chloe Nguyen",
    title: "AI Systems Architect, OrbitData",
  },
  {
    quote:
      "Finally, a platform that bridges human creativity with automated execution. The productivity gains are unreal.",
    name: "Rafael Ortiz",
    title: "Innovation Director, FlowForge",
  },
  {
    quote:
      "From idea to execution in minutes. This tool has become the heartbeat of our SaaS infrastructure.",
    name: "Isabella Chen",
    title: "VP of Product, NeuraSoft",
  },
  {
    quote:
      "The automation engine feels intelligent — like it understands our workflow, not just executes it.",
    name: "David Kim",
    title: "Lead Developer, MetaScale",
  },
];

const features = [
  {
    icon: <Zap className="h-6 w-6" />,
    title: "Lightning Fast",
    description: "Execute workflows in milliseconds with our optimized engine",
  },
  {
    icon: <Lock className="h-6 w-6" />,
    title: "Enterprise Security",
    description: "Bank-level encryption and SOC 2 compliance built-in",
  },
  {
    icon: <Workflow className="h-6 w-6" />,
    title: "Visual Builder",
    description: "Drag, drop, and connect. No code required",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <Navbar />

      {/* Hero Section with Dot Background */}
      <section className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden pt-20">
        {/* Dot Background */}
        <div className="absolute inset-0 z-0">
          <div
            className={cn(
              "absolute inset-0",
              "bg-size-[20px_20px]",
              "bg-[radial-gradient(circle,#404040_1px,transparent_1px)]"
            )}
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-linear-to-b from-black via-transparent to-black" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,black_70%)]" />
        </div>

        {/* Hero Content */}
        <div className="relative z-20 flex max-w-7xl flex-col items-center justify-center px-4 text-center">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-neutral-300 backdrop-blur-sm">
            <Zap className="h-4 w-4 text-yellow-500" />
            <span>Trusted by 10,000+ teams worldwide</span>
          </div>

          {/* Main Heading */}
          <h1 className="bg-gradient-to-b from-white via-white to-neutral-400 bg-clip-text py-8 text-5xl font-bold leading-tight text-transparent md:text-7xl lg:text-8xl">
            Automate your
            <br />
            <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Workflows
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-6 max-w-2xl text-lg text-neutral-400 md:text-xl">
            Build powerful automation workflows in minutes. No code required.
            Connect your favorite tools and watch the magic happen.
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Button
              size="lg"
              className="group bg-white text-black hover:bg-neutral-200"
            >
              Get Started Free
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/10 bg-white/5 text-white hover:bg-white/10"
            >
              Watch Demo
            </Button>
          </div>

          {/* Social Proof */}
          <div className="mt-8 flex items-center gap-6 text-sm text-neutral-500">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="h-8 w-8 rounded-full border-2 border-black bg-linear-to-br from-purple-400 to-pink-600"
                  />
                ))}
              </div>
              <span>Join 10,000+ users</span>
            </div>
            <div className="hidden sm:block">•</div>
            <div className="hidden sm:block">No credit card required</div>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="relative z-20 mt-20 grid w-full max-w-6xl grid-cols-1 gap-4 px-4 md:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all hover:border-white/20 hover:bg-white/10"
            >
              <div className="mb-4 inline-flex rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 p-3 text-blue-400">
                {feature.icon}
              </div>
              <h3 className="mb-2 text-lg font-semibold text-white">
                {feature.title}
              </h3>
              <p className="text-sm text-neutral-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative z-20 w-full overflow-hidden bg-linear-to-b from-black via-neutral-950 to-black py-20">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
            Loved by teams worldwide
          </h2>
          <p className="text-neutral-400">See what our customers have to say</p>
        </div>
        <InfiniteMovingCards items={testimonials} speed="slow" pauseOnHover />
      </section>

      {/* MacBook Demo Section */}
      <section className="relative z-20 w-full overflow-hidden bg-linear-to-b from-black to-neutral-950 py-20">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
            Get started in minutes
          </h2>
          <p className="text-neutral-400">
            It only takes a minute to create your first workflow
          </p>
        </div>
        <div className="px-4">
          <MacbookScroll
            src="/p1.png"
            title="Build your first workflow"
            badge={
              <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 px-4 py-1 text-sm font-medium text-white">
                <Zap className="h-4 w-4" />
                Quick Setup
              </div>
            }
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-20 w-full bg-linear-to-b from-neutral-950 to-black py-32">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="mb-6 text-4xl font-bold text-white md:text-5xl">
            Ready to automate your workflow?
          </h2>
          <p className="mb-10 text-lg text-neutral-400">
            Join thousands of teams already saving hours every week
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button
              size="lg"
              className="group bg-white text-black hover:bg-neutral-200"
            >
              Start Free Trial
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/10 bg-white/5 text-white hover:bg-white/10"
            >
              Talk to Sales
            </Button>
          </div>
          <p className="mt-6 text-sm text-neutral-500">
            14-day free trial • No credit card required • Cancel anytime
          </p>
        </div>
      </section>
    </main>
  );
}
