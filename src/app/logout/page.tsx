"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/src/lib/hooks";
import { clearUser } from "@/src/lib/features/userSlice";

export default function LogoutPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Clear user from Redux
    dispatch(clearUser());

    // Redirect to home
    router.push("/");
  }, [dispatch, router]);

  return null;
}
