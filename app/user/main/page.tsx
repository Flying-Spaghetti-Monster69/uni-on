import { WellbeingTracker } from "@/components/wellbeing-tracker";
import { AcademicTracker } from "@/components/academic-tracker";
import { FloatingChat } from "@/components/floating-chat";
import { BottomNav } from "@/components/bottom-nav";
import { auth } from "@/utils/auth"; // path to your Better Auth server instance
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getInsights } from "@/utils/actions";
import Insights from "@/components/insights";
import WeWantYouOk from "@/components/we-want-you-ok";

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });

  if (!session?.user) {
    redirect("/");
  }

  const insights = await getInsights(session.user.id);

  if (insights.error) {
    redirect("/");
  }

  const { mood, feedback, problem_type, pleasant_score } = insights;

  return (
    <main className="min-h-screen bg-gradient-to-b from-teal-50 to-blue-50 pb-24">
      <div className="container max-w-md mx-auto px-4 py-6">
        <header className="mb-6">
          <h1 className="text-2xl font-bold text-teal-700 mb-1">UNI-ON</h1>
          <p className="text-blue-600 text-sm">
            Welcome back {session.user.name}! Let&apos;s be happy.
          </p>
        </header>
        <section>
          <Insights
            mood={mood}
            feedback={feedback}
            pleasant_score={pleasant_score}
          />
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-teal-700 mb-3">
            Daily Wellbeing Check
          </h2>
          <WellbeingTracker userId={session.user.id} />
        </section>

        <section>
          {pleasant_score < 6 && problem_type !== "none" && (
            <WeWantYouOk problematics={problem_type} />
          )}
        </section>

        <section>
          <h2 className="text-xl font-semibold text-teal-700 mb-3">
            Academic Progress
          </h2>

          <AcademicTracker />
        </section>
      </div>

      <FloatingChat userId={session.user.id} />
      <BottomNav />
    </main>
  );
}
