import GoogleButton from "@/components/google-button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-teal-50 to-blue-50 pb-24">
      <Card className="border-teal-200 shadow-md bg-white/80 backdrop-blur-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-teal-700">
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
