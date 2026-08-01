"use client";

import { useCallback, useState } from "react";
import Silicon from "./background/Silicon";
import Atmosphere from "./background/Atmosphere";
import Boot from "./hud/Boot";
import Nav from "./hud/Nav";
import Rails from "./hud/Rails";
import Cursor from "./hud/Cursor";
import Hero from "./sections/Hero";
import Missions from "./sections/Missions";
import CaseStudyAI from "./sections/CaseStudyAI";
import CaseStudyEnterprise from "./sections/CaseStudyEnterprise";
import DeliveryTimeline from "./sections/DeliveryTimeline";
import Responsibilities from "./sections/Responsibilities";
import Skills from "./sections/Skills";
import Contact from "./sections/Contact";
import { useSectorDirector } from "@/lib/useSectorDirector";

/**
 * Composition root. Owns only what genuinely crosses section boundaries:
 * the renderer, the HUD chrome, and the active-sector readout.
 */
export default function Experience() {
  const [sector, setSector] = useState("HERO");
  const [activeNav, setActiveNav] = useState("hero");

  const onSector = useCallback((label: string, navId: string) => {
    setSector(label);
    setActiveNav(navId);
  }, []);

  useSectorDirector(onSector);

  return (
    <>
      <Silicon />
      <Atmosphere />
      <Boot />
      <Cursor />
      <Nav active={activeNav} />
      <Rails sector={sector} />

      <main>
        <Hero />
        <Missions />
        <CaseStudyAI />
        <CaseStudyEnterprise />
        <DeliveryTimeline />
        <Responsibilities />
        <Skills />
        <Contact />
      </main>
    </>
  );
}
