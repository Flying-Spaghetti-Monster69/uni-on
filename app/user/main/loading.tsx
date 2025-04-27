import { Loader } from "lucide-react";
import React from "react";

const loading = () => {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-purple-50 to-violet-50 pb-24">
      <Loader className="animate-spin h-10 w-10 text-primary-theme" />
    </main>
  );
};

export default loading;
