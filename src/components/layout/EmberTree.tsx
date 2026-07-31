/**
 * SIGNATURE ELEMENT
 * ------------------------------------------------------------------
 * The reference site closes with a lone figure walking toward a tower.
 * Ours closes with the image this author's own book is built on: a tree
 * whose trunk is a double helix, rooted in scattered embers.
 *
 * At rest it is ash-grey and still. On hover the branches draw themselves
 * outward stroke by stroke and ember rays rise behind the crown — the
 * "orange branches" the client asked for. Entirely original artwork,
 * hand-authored SVG, no image request.
 */

const branches = [
  "M210 168 C 186 150, 168 132, 150 104",
  "M210 168 C 236 148, 256 132, 276 106",
  "M210 132 C 190 116, 176 100, 170 76",
  "M210 132 C 232 114, 244 98, 252 74",
  "M210 200 C 182 188, 158 178, 128 172",
  "M210 200 C 240 188, 264 178, 294 172",
  "M150 104 C 140 92, 134 82, 132 66",
  "M276 106 C 288 94, 293 82, 296 66",
  "M170 76 C 164 64, 162 56, 163 44",
  "M252 74 C 258 62, 260 54, 260 42",
];

const rays = [
  { x: 210, len: 62, w: 2.2 },
  { x: 178, len: 44, w: 1.6 },
  { x: 242, len: 46, w: 1.6 },
  { x: 150, len: 30, w: 1.2 },
  { x: 270, len: 32, w: 1.2 },
  { x: 124, len: 20, w: 1 },
  { x: 296, len: 22, w: 1 },
];

const sparks = [
  { cx: 172, cy: 268, r: 2.6 },
  { cx: 196, cy: 274, r: 1.8 },
  { cx: 222, cy: 270, r: 2.2 },
  { cx: 248, cy: 276, r: 1.6 },
  { cx: 152, cy: 276, r: 1.4 },
  { cx: 268, cy: 272, r: 2 },
  { cx: 208, cy: 280, r: 1.5 },
  { cx: 236, cy: 282, r: 1.2 },
];

export default function EmberTree({ className = "" }: { className?: string }) {
  return (
    <div
      className={`ember-tree group relative ${className}`}
      tabIndex={0}
      role="img"
      aria-label="A tree whose trunk is a double helix, rooted in embers."
    >
      <svg
        viewBox="0 0 420 300"
        fill="none"
        className="h-auto w-full overflow-visible"
      >
        <defs>
          <linearGradient id="rayGrad" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" className="tree-ray-from" />
            <stop offset="45%" className="tree-ray-mid" />
            <stop offset="100%" className="tree-ray-to" />
          </linearGradient>
          <radialGradient id="crownGlow">
            <stop offset="0%" className="tree-crown-from" />
            <stop offset="100%" className="tree-crown-to" />
          </radialGradient>
          <radialGradient id="rootGlow">
            <stop offset="0%" className="tree-root-from" />
            <stop offset="100%" className="tree-root-to" />
          </radialGradient>
        </defs>

        {/* Rays behind the crown */}
        <g>
          {rays.map((r) => (
            <rect
              key={r.x}
              className="ray"
              x={r.x - r.w / 2}
              y={40 - r.len}
              width={r.w}
              height={r.len + 40}
              fill="url(#rayGrad)"
              style={{ transitionDelay: `${Math.abs(210 - r.x) * 1.6}ms` }}
            />
          ))}
        </g>

        <ellipse
          className="glow"
          cx="210"
          cy="86"
          rx="130"
          ry="82"
          fill="url(#crownGlow)"
        />

        {/* Ember branches — drawn in on hover */}
        <g strokeLinecap="round" strokeWidth="2.1" fill="none">
          {branches.map((d, i) => (
            <path
              key={d}
              className="branch tree-branch"
              d={d}
              style={{ transitionDelay: `${i * 55}ms` }}
            />
          ))}
        </g>

        {/* Resting silhouette of the branches, always faintly present */}
        <g
          strokeLinecap="round"
          strokeWidth="1.1"
          strokeOpacity="0.3"
          fill="none"
          className="tree-line"
        >
          {branches.map((d) => (
            <path key={`ghost-${d}`} d={d} />
          ))}
        </g>

        {/* Trunk: two strands and their rungs */}
        <g strokeLinecap="round" fill="none">
          <path
            className="helix-strand tree-line"
            d="M198 268 C 186 232, 232 220, 220 184 C 210 154, 198 148, 204 120"
            strokeOpacity="0.85"
            strokeWidth="3"
          />
          <path
            className="helix-strand tree-cool"
            d="M222 268 C 234 232, 188 220, 200 184 C 210 154, 222 148, 216 120"
            strokeOpacity="0.7"
            strokeWidth="3"
          />
          {[
            "M200 252 L 220 252",
            "M196 232 L 224 232",
            "M203 212 L 217 212",
            "M199 192 L 221 192",
            "M203 170 L 217 170",
            "M205 148 L 215 148",
          ].map((d) => (
            <path
              key={d}
              d={d}
              className="tree-line"
              strokeOpacity="0.45"
              strokeWidth="1.4"
            />
          ))}
        </g>

        {/* Ground line + scattered embers at the roots */}
        <ellipse
          className="glow"
          cx="210"
          cy="274"
          rx="96"
          ry="20"
          fill="url(#rootGlow)"
        />
        <path
          d="M96 274 C 150 264, 274 264, 330 274"
          className="tree-line"
          strokeOpacity="0.35"
          strokeWidth="1.2"
        />
        <g className="tree-spark">
          {sparks.map((s, i) => (
            <circle
              key={`${s.cx}-${s.cy}`}
              className="spark"
              cx={s.cx}
              cy={s.cy}
              r={s.r}
              style={{ transitionDelay: `${i * 45}ms` }}
            />
          ))}
        </g>
      </svg>
    </div>
  );
}
