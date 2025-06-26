"use client";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

export default function PageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.classList.remove("opacity-0", "translate-y-4");
    el.classList.add("opacity-0", "translate-y-4");
    // Trigger reflow for transition
    void el.offsetWidth;
    el.classList.remove("opacity-0", "translate-y-4");
    el.classList.add("opacity-100", "translate-y-0");
  }, [pathname]);

  return (
    <div
      ref={ref}
      className="transition-all duration-500 ease-in-out opacity-0 translate-y-4"
      key={pathname}
    >
      {children}
    </div>
  );
}
