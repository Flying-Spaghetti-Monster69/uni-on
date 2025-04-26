import { WellbeingTracker } from "@/components/wellbeing-tracker";
import { AcademicTracker } from "@/components/academic-tracker";
import { FloatingChat } from "@/components/floating-chat";
import { BottomNav } from "@/components/bottom-nav";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-teal-50 to-blue-50 pb-24">
      <div className="container max-w-md mx-auto px-4 py-6">
        <header className="mb-6">
          <h1 className="text-2xl font-bold text-teal-700 mb-1">UNI-ON</h1>
          <p className="text-blue-600 text-sm">
            Track your wellbeing and academic progress
          </p>
        </header>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-teal-700 mb-3">
            Daily Wellbeing Check
          </h2>
          <WellbeingTracker />
        </section>

        <section>
          <h2 className="text-xl font-semibold text-teal-700 mb-3">
            Academic Progress
          </h2>
          <AcademicTracker />
        </section>
      </div>

      <FloatingChat />
      <BottomNav />
    </main>
  );
}
