"use client";

import { useCallback, useState } from "react";
import Silicon from "../background/Silicon";
import Boot from "../hud/Boot";
import Cursor from "../hud/Cursor";
import Rails from "../hud/Rails";
import Hero from "../sections/Hero";
import Skills from "../sections/Skills";
import Contact from "../sections/Contact";
import { AboutPreview, CopilotIntro, Positioning, SelectedMissions } from "./HomeSections";
import { useSectorDirector } from "@/lib/useSectorDirector";

/**
 * The home page composition root.
 *
 * This is the only route that mounts the WebGL scene. Case studies and the
 * rest of the site use the CSS backdrop instead — a visitor reading three
 * thousand words about an aerospace platform does not need a render loop
 * running behind the text.
 */
export default function HomeExperience() {
  const [sector, setSector] = useState("HERO");

  const onSector = useCallback((label: string) => setSector(label), []);
  useSectorDirector(onSector);

  return (
    <>
      <Silicon />
      <Boot />
      <Cursor />
      <Rails sector={sector} />

      <main id="main">
        <Hero />
        <Positioning />
        <SelectedMissions />
        <Skills />
        <CopilotIntro />
        <AboutPreview />
        <Contact />
      </main>
    </>
  );
}
