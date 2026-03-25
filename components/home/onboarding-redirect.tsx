"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const ONBOARDING_KEY = "saa-onboarding-done";

export function OnboardingRedirect() {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (localStorage.getItem(ONBOARDING_KEY) !== "true") {
        router.replace("/onboarding");
      }
    }
  }, [router]);

  return null;
}
