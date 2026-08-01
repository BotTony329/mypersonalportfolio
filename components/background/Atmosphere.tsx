/** Static overlay stack: vignette, dimmer, HUD grid, scanlines, grain. */
export default function Atmosphere() {
  return (
    <>
      <div className="veil" aria-hidden />
      <div id="dim" aria-hidden />
      <div className="grid-overlay" aria-hidden />
      <div className="scanlines" aria-hidden />
      <div className="grain" aria-hidden />
    </>
  );
}
