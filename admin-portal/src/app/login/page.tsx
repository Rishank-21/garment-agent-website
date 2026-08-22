"use client";

import React, { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { KeyRound, LoaderCircle } from "lucide-react";
import { toast } from "sonner";
import "../globals.css";

export default function LoginPage() {
  const [passkey, setPasskey] = useState("");
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    if (!passkey.trim()) {
      toast.warning("Please enter a passkey.");
      return;
    }

    setIsPending(true);
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ passkey }),
      });

      if (response.ok) {
        toast.success("Successfully logged in to Himat Portal.");
        router.push("/");
      } else {
        const errorText = await response.text();
        toast.error(errorText || "Invalid passkey.");
      }
    } catch (error) {
      toast.error("Network error during login.");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center p-5 selection:bg-white selection:text-black">
      {/* Noise layer background */}
      <div className="absolute inset-0 noise-layer bg-[#0a0a0a]" />

      <div className="relative w-full max-w-md border border-white/10 bg-[#111111] p-8 shadow-2xl space-y-8 z-10">
        {/* Brand logo & header */}
        <div className="space-y-3 text-center">
          <div className="mx-auto grid h-12 w-12 place-items-center border border-white/30 font-display text-base font-black tracking-tighter">
            HT
          </div>
          <span className="mono-label text-[9px] text-white/50 block">ADMINISTRATOR GATEWAY</span>
          <h1 className="font-display text-2xl font-black uppercase tracking-tight leading-none pt-2">
            Himat Textile
          </h1>
          <p className="text-xs text-white/40 leading-relaxed max-w-xs mx-auto">
            Authorized administrative access only. Verify your passkey to continue.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="mono-label text-[9px] text-white/55 block">Administrative Passkey</label>
            <div className="relative">
              <input
                required
                type="password"
                value={passkey}
                onChange={(e) => setPasskey(e.target.value)}
                placeholder="Enter password..."
                className="w-full border-b border-white/25 bg-transparent py-3 pl-8 text-sm outline-none placeholder:text-white/25 focus:border-white transition-colors"
              />
              <KeyRound size={16} className="absolute left-1 top-3.5 text-white/30" />
            </div>
          </div>

          <button
            disabled={isPending}
            className="w-full flex items-center justify-between bg-white text-black px-6 py-4 text-[10px] font-bold uppercase tracking-[.18em] transition-transform hover:-translate-y-0.5 disabled:opacity-60"
          >
            <span>{isPending ? "Verifying..." : "Sign In to Dashboard"}</span>
            {isPending ? (
              <LoaderCircle size={16} className="animate-spin" />
            ) : (
              <span className="font-display">→</span>
            )}
          </button>
        </form>

        <div className="border-t border-white/10 pt-4 text-center">
          <p className="mono-label text-[8px] text-white/30 tracking-widest uppercase">
            Himat Textile — Private Portal
          </p>
        </div>
      </div>
    </div>
  );
}
