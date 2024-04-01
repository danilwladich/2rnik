import ChangePasswordForm from "@/components/forms/settings/change-password-form";

import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function ChangePasswordModal() {
  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Change password</DialogTitle>
        <DialogDescription>
          Change your password. After saving, you'll be logged out
        </DialogDescription>
      </DialogHeader>

      <ChangePasswordForm />
    </DialogContent>
  );
}
