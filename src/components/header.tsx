"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const navigation = [{ label: "Work", id: "work" }, { label: "Experience", id: "experience" }, { label: "About", id: "about" }];

export function Header() {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    function escape(event: KeyboardEvent) {
      if (event.key === "Escape" && open) {
        setOpen(false);
        toggle.current?.focus();
      }
    }
    window.addEventListener("keydown", escape);
    return () => window.removeEventListener("keydown", escape);
  }, [open]);

  return (
    <header className="site-header">
      <div className="shell header-inner">
        <Link href="/" className="wordmark" aria-label="Tarun Bagewadi home" onClick={() => setOpen(false)}><span className="monogram">tb<span>.</span></span><span className="wordmark-name">Tarun Bagewadi</span></Link>
        <nav className="desktop-nav" aria-label="Main navigation">{navigation.map(item => <Link key={item.id} href={`/#${item.id}`}>{item.label}</Link>)}</nav>
        <Link href="/#contact" className="header-contact">Let’s talk <ArrowUpRight size={16} aria-hidden="true" /></Link>
        <button ref={toggle} className="menu-toggle" aria-label={open ? "Close navigation" : "Open navigation"} aria-expanded={open} aria-controls="mobile-nav" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
      </div>
      {open && <nav id="mobile-nav" className="mobile-nav" aria-label="Mobile navigation">{navigation.map(item => <Link key={`${pathname}-${item.id}`} href={`/#${item.id}`} onClick={() => setOpen(false)}>{item.label}<ArrowUpRight size={18} aria-hidden="true" /></Link>)}<Link href="/#contact" onClick={() => setOpen(false)}>Let’s talk<ArrowUpRight size={18} aria-hidden="true" /></Link></nav>}
    </header>
  );
}
