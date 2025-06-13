"use client";

import APIKeys from "./ApiKey";

type ModelProvider = {
  name: string;
  available: boolean;
};

export default function Settings() {
  return (
    <div className="space-y-8">
      {/* Section: API Key Management */}
      <section className="space-y-4">
        <APIKeys />
      </section>
    </div>
  );
}
