import { HomeDashboard } from "@/components/home/home-dashboard";
import { OnboardingRedirect } from "@/components/home/onboarding-redirect";

export default function Page() {
  return (
    <>
      <OnboardingRedirect />
      <HomeDashboard />
    </>
  );
}
