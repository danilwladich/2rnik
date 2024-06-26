"use client";

import { useModalStore } from "@/hooks/store/use-modal-store";
import { useTranslations } from "next-intl";

import { Flag } from "lucide-react";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

export default function ReportButton({ id }: { id: string }) {
  const t = useTranslations("pages.map.location.actions");

  const { onOpen } = useModalStore();

  return (
    <DropdownMenuItem
      onClick={() => onOpen("report marker", { reportMarkerData: { id } })}
      className="gap-2"
    >
      <Flag className="h-4 w-4" />

      <span className="flex-1">{t("report")}</span>
    </DropdownMenuItem>
  );
}
