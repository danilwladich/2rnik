"use client";

import axios, { AxiosError, AxiosResponse } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

import { LogOut } from "lucide-react";
import { CommandItem } from "@/components/ui/command";

export default function LogOutButton() {
  const t = useTranslations("pages.settings.logOut");

  const router = useRouter();

  async function onLogOut() {
    try {
      await axios.delete("/api/auth/me");

      router.push("/auth");
    } catch (e: unknown) {
      // Handling AxiosError
      const error = e as AxiosError;

      // Extracting response from AxiosError
      const res = error?.response as AxiosResponse<string, any>;

      // Handling non-response errors
      if (!res) {
        toast.error(t("submitError"), { description: error.message });
        return;
      }
    }
  }

  return (
    <CommandItem className="flex w-full items-center gap-2" onSelect={onLogOut}>
      <LogOut className="h-4 w-4" />

      <span className="flex-1">{t("submit")}</span>
    </CommandItem>
  );
}
