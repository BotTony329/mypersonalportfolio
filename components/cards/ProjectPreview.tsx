import type { Accent, CaseStudy } from "@/content/types";

/**
 * Project visuals, drawn in SVG rather than shipped as images.
 *
 * Cards need a distinct visual per project, and four screenshots would cost
 * more bytes than the rest of the page combined — while also being the thing
 * most likely to go stale. These are inline, themeable, weightless, and they
 * never cause layout shift.
 */
export default function ProjectPreview({
  kind,
  accent,
}: {
  kind: CaseStudy["preview"];
  accent: Accent;
}) {
  const hot = accent === "orange" ? "var(--orange)" : "var(--blue)";
  const cool = accent === "orange" ? "var(--blue)" : "var(--orange)";

  return (
    <svg
      className="preview"
      viewBox="0 0 320 200"
      role="presentation"
      focusable="false"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id={`pg-${kind}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={hot} stopOpacity=".28" />
          <stop offset="1" stopColor={cool} stopOpacity=".06" />
        </linearGradient>
      </defs>
      <rect width="320" height="200" fill={`url(#pg-${kind})`} />

      {kind === "silicon" && (
        <g stroke={hot} fill="none" strokeWidth="1">
          <rect x="112" y="62" width="96" height="76" opacity=".9" />
          <rect x="128" y="78" width="64" height="44" fill={hot} fillOpacity=".22" />
          {[0, 1, 2, 3].map((i) => (
            <g key={i} opacity=".55">
              <path d={`M112 ${74 + i * 18} H80`} />
              <path d={`M208 ${74 + i * 18} H240`} />
            </g>
          ))}
          {[0, 1, 2, 3, 4].map((i) => (
            <circle key={i} cx={132 + i * 14} cy={100} r="2.5" fill={hot} stroke="none" opacity=".8" />
          ))}
        </g>
      )}

      {kind === "grid" && (
        <g stroke={hot} fill="none" strokeWidth="1" opacity=".7">
          {[0, 1, 2, 3, 4].map((r) =>
            [0, 1, 2, 3, 4, 5].map((c) => (
              <rect key={`${r}-${c}`} x={34 + c * 44} y={26 + r * 32} width="34" height="22"
                fillOpacity={(r + c) % 4 === 0 ? ".28" : "0"} fill={hot} />
            )),
          )}
          <path d="M34 122 H288" stroke={cool} strokeWidth="1.5" />
        </g>
      )}

      {kind === "wave" && (
        <g fill="none" strokeWidth="1.4">
          {[0, 1, 2, 3].map((i) => (
            <path
              key={i}
              d={`M0 ${132 - i * 16} C 60 ${100 - i * 16}, 100 ${164 - i * 16}, 160 ${132 - i * 16} S 260 ${100 - i * 16}, 320 ${132 - i * 16}`}
              stroke={i % 2 ? cool : hot}
              opacity={0.8 - i * 0.16}
            />
          ))}
          <circle cx="160" cy="132" r="4" fill={hot} />
        </g>
      )}

      {kind === "ticket" && (
        <g stroke={hot} fill="none" strokeWidth="1">
          {[0, 1].map((i) => (
            <g key={i} transform={`translate(${52 + i * 118} 46) rotate(${i ? 4 : -4} 84 54)`}>
              <path d="M0 8 a8 8 0 0 1 8-8 h84 a8 8 0 0 1 8 8 v18 a10 10 0 0 0 0 20 v18 a8 8 0 0 1-8 8 h-84 a8 8 0 0 1-8-8 v-18 a10 10 0 0 0 0-20 z"
                fill={hot} fillOpacity={i ? ".10" : ".22"} />
              <path d="M22 18 h56 M22 30 h40" stroke={i ? cool : hot} opacity=".8" />
            </g>
          ))}
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <circle key={i} cx={40 + i * 48} cy={168} r="2" fill={cool} stroke="none" opacity=".6" />
          ))}
        </g>
      )}

      {kind === "layers" && (
        <g fill="none" strokeWidth="1">
          {[0, 1, 2, 3].map((i) => (
            <g key={i} opacity={1 - i * 0.2}>
              <rect x={58 + i * 12} y={30 + i * 30} width="150" height="24" rx="2"
                stroke={i % 2 ? cool : hot} fill={hot} fillOpacity={i === 0 ? ".22" : ".05"} />
              <path d={`M${66 + i * 12} ${42 + i * 30} h${60 - i * 6}`} stroke={i % 2 ? cool : hot} opacity=".7" />
            </g>
          ))}
          <rect x="226" y="30" width="42" height="114" rx="4" stroke={cool} opacity=".7" />
          <rect x="232" y="40" width="30" height="86" rx="2" fill={cool} fillOpacity=".16" stroke="none" />
        </g>
      )}

      {/* knowledge graph — semantic nodes and connections, kept restrained */}
      {kind === "graph" && (
        <g fill="none" strokeWidth="1">
          {[[86,58],[236,60],[70,142],[248,140],[160,32],[160,170]].map(([x,y],i)=>(
            <path key={`e${i}`} d={`M160 100 L${x} ${y}`} stroke={i%2?cool:hot} opacity=".38" />
          ))}
          <path d="M86 58 L160 32 L236 60 M70 142 L160 170 L248 140" stroke={cool} opacity=".22" />
          {[[86,58,4],[236,60,4],[70,142,3.4],[248,140,3.4],[160,32,3],[160,170,3]].map(([x,y,r],i)=>(
            <circle key={`n${i}`} cx={x} cy={y} r={r} fill={i%2?cool:hot} stroke="none" opacity=".85" />
          ))}
          <circle cx="160" cy="100" r="15" fill={hot} fillOpacity=".26" stroke={hot} />
          <circle cx="160" cy="100" r="26" stroke={hot} opacity=".3" />
        </g>
      )}

      {/* layered enterprise architecture */}
      {kind === "arch" && (
        <g fill="none" strokeWidth="1">
          {[0,1,2].map((i)=>(
            <g key={i}>
              <rect x="52" y={38+i*44} width="216" height="30" rx="2"
                stroke={i===1?cool:hot} fill={i===1?cool:hot} fillOpacity=".10" />
              {[0,1,2,3].map((c)=>(
                <rect key={c} x={62+c*52} y={45+i*44} width="42" height="16" rx="1"
                  fill={i===1?cool:hot} fillOpacity={(i+c)%3===0?".34":".12"} stroke="none" />
              ))}
            </g>
          ))}
          {[0,1].map((i)=>(
            <path key={i} d={`M160 ${68+i*44} v14`} stroke={cool} opacity=".6" />
          ))}
        </g>
      )}

      {kind === "orbit" && (
        <g fill="none" stroke={hot} strokeWidth="1">
          <ellipse cx="160" cy="100" rx="104" ry="40" opacity=".55" />
          <ellipse cx="160" cy="100" rx="70" ry="70" opacity=".35" stroke={cool} />
          <circle cx="160" cy="100" r="16" fill={hot} fillOpacity=".3" />
          <circle cx="264" cy="100" r="4" fill={hot} stroke="none" />
          <circle cx="160" cy="30" r="3" fill={cool} stroke="none" />
        </g>
      )}
    </svg>
  );
}
