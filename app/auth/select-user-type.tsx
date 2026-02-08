"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function SelectUserType({
  onSelect,
}: {
  onSelect: (type: "STUDENT" | "UNIVERSITY") => void;
}) {
  const [selected, setSelected] = useState<"STUDENT" | "UNIVERSITY" | null>(
    null,
  );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-emerald-50">
      <h1 className="text-3xl font-bold mb-8">
        Are you a student or a university?
      </h1>
      <div className="flex gap-8 mb-8">
        <Button
          size="lg"
          className={`px-8 py-6 text-lg font-semibold rounded-xl shadow-lg ${selected === "STUDENT" ? "bg-emerald-600 text-white" : "bg-white text-emerald-600 border border-emerald-600"}`}
          onClick={() => {
            setSelected("STUDENT");
            onSelect("STUDENT");
          }}
        >
          Student
        </Button>
        <Button
          size="lg"
          className={`px-8 py-6 text-lg font-semibold rounded-xl shadow-lg ${selected === "UNIVERSITY" ? "bg-emerald-600 text-white" : "bg-white text-emerald-600 border border-emerald-600"}`}
          onClick={() => {
            setSelected("UNIVERSITY");
            onSelect("UNIVERSITY");
          }}
        >
          University
        </Button>
      </div>
    </div>
  );
}
