import GoogleButton from "@/components/google-button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-purple-50 to-violet-50 pb-24">
      <Card className="border-primary-theme w shadow-md bg-white backdrop-blur-sm min-w-[300px]">
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
