import { GuidePageHeader } from "@/components/guide/GuidePageHeader";
import { PracticalInfoContent } from "@/components/guide/PracticalInfoContent";
import { guidePageShellClass } from "@/lib/layout-classes";

export default function PracticalInformationPage() {
  return (
    <div className={guidePageShellClass}>
      <GuidePageHeader pageId="practicalInfo" />
      <PracticalInfoContent />
    </div>
  );
}