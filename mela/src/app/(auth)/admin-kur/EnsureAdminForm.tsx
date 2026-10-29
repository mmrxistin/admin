// BismillahirRahmanirRahim
// El Hamdu Lillahi Rabbul Alemin
// Esselatu vesselamu ala rasulina Muhammedin .
"use client";

import LoadingButton from "@/components/LoadingButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useTransition } from "react";

import { ensureAdmin } from "./actions";

export default function EnsureAdminForm() {
  const [token, setToken] = useState("");
  const [error, setError] = useState<string>();
  const [isPending, startTransition] = useTransition();

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(undefined);
    startTransition(async () => {
      const res = await ensureAdmin(token);
      if (res?.error) setError(res.error);
    });
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {error && <p className="text-center text-sm text-destructive">{error}</p>}
      <div className="space-y-2">
        <Label htmlFor="token">ADMIN_SETUP_TOKEN</Label>
        <Input
          id="token"
          type="password"
          placeholder="ADMIN_SETUP_TOKEN"
          value={token}
          onChange={(e) => setToken(e.target.value)}
        />
      </div>
      <LoadingButton loading={isPending} type="submit" className="w-full">
        Hesabı Kur ve Giriş Yap
      </LoadingButton>
    </form>
  );
}
