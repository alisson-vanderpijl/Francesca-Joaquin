import { GuidePageHeader } from "@/components/guide/GuidePageHeader";
import { HealthEmergenciesContent } from "@/components/guide/HealthEmergenciesContent";
import { guidePageShellClass } from "@/lib/layout-classes";

export default function HealthPage() {
  return (
    <div className={guidePageShellClass}>
      <GuidePageHeader pageId="health" />
      <HealthEmergenciesContent />
    </div>
  );
}