"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface UpdateData {
  version: string;
  title: string;
  changelogUrl: string;
}

export default function UpdateAnnouncer() {
  const router = useRouter();
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (!hasMounted) return;

    const checkUpdate = async () => {
      try {
        const res = await fetch("/announcements/latest.json?" + new Date().getTime());
        if (!res.ok) return;

        const data: UpdateData = await res.json();
        const lastSeen = localStorage.getItem("wiki_last_seen_version");

        if (data.version && lastSeen !== data.version) {
          toast(`Cập nhật ${data.version}: ${data.title}`, {
            duration: 10000,
            action: {
              label: "Xem chi tiết",
              onClick: () => {
                localStorage.setItem("wiki_last_seen_version", data.version);
                router.push(data.changelogUrl);
              },
            },
            onDismiss: () => {
              localStorage.setItem("wiki_last_seen_version", data.version);
            },
          });
        }
      } catch (error) {
        console.error("Failed to fetch latest update info", error);
      }
    };

    const timer = setTimeout(checkUpdate, 1500);
    return () => clearTimeout(timer);
  }, [hasMounted, router]);

  return null;
}
