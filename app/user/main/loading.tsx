import { Loader } from "lucide-react";
import React from "react";

const loading = () => {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-teal-50 to-blue-50 pb-24">
      <Loader className="animate-spin h-10 w-10 text-teal-600" />
    </main>
  );
};

export default loading;
