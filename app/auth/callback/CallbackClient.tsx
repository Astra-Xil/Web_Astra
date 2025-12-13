"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

export default function CallbackClient() {
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get("next") || "/";

  useEffect(() => {
    const supabase = createClient();

    const run = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        router.replace(next);
      } else {
        router.replace("/login");
      }
    };

    run();
  }, [router, next]);

  return <div>ログイン中...</div>;
}
