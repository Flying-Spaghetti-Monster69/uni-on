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
        <section>

          <Insights
            mood={mood}
            feedback={feedback}
            pleasant_score={pleasant_score}
            userName={session.user.name}
          />
        </section>

        <section className="mb-6">
          <WellbeingTracker userId={session.user.id} />
        </section>

        <section>
          {pleasant_score < 6 && problem_type !== "none" && <WeWantYouOk problematics={problem_type}/>}
        </section>
      </div>

      <FloatingChat />
      <BottomNav />
    </main>
  );
}
