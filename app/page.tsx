import GoogleButton from "@/components/google-button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-purple-50 to-violet-50 pb-24">
      <Card className="border-primary-theme shadow-md bg-background-theme backdrop-blur-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-secundary-theme">
            please login to your account
          </CardTitle>
        </CardHeader>
        <CardContent>
          <GoogleButton />
        </CardContent>
      </Card>
    </main>
  );
}
