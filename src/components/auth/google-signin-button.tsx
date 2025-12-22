"use client";

import { Button } from "../ui/button";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";

export const GoogleSigninButton = () => {
  return (
    <Button
      variant="outline"
      className="grow"
      onClick={() => authClient.signIn.social({ provider: "google" })}
    >
      <Image
        src="https://cdn.shadcnstudio.com/ss-assets/brand-logo/google-icon.png"
        alt="google icon"
        className="size-5"
        width={20}
        height={20}
      />
    </Button>
  );
};
