const colors = {
  ink: "#172b3a",
  muted: "#526777",
  line: "#a8bac2",
  teal: "#0f766e",
  tealLight: "#e7f5f2",
  blue: "#315c8c",
  blueLight: "#edf3fb",
  amber: "#a85d12",
  amberLight: "#fff4e5",
  rose: "#a43e51",
  roseLight: "#fff0f1",
};

function Card({
  x,
  y,
  width,
  title,
  detail,
  fill,
  accent,
}: {
  x: number;
  y: number;
  width: number;
  title: string;
  detail: string;
  fill: string;
  accent: string;
}) {
  return (
    <g>
      <rect x={x} y={y} width={width} height="76" rx="14" fill={fill} stroke={accent} strokeOpacity=".3" />
      <rect x={x} y={y + 13} width="4" height="50" rx="2" fill={accent} />
      <text x={x + 18} y={y + 32} fill={colors.ink} fontSize="15" fontWeight="700">{title}</text>
      <text x={x + 18} y={y + 53} fill={colors.muted} fontSize="12">{detail}</text>
    </g>
  );
}

export function ReliabilityControlLoop() {
  return (
    <figure className="my-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-neutral-700 dark:bg-neutral-900">
      <div className="border-b border-slate-200 bg-slate-50 px-5 py-4 dark:border-neutral-700 dark:bg-neutral-800/70">
        <p className="m-0 text-xs font-semibold uppercase tracking-[0.16em] text-teal-700 dark:text-teal-300">Reliability operating model</p>
        <p className="mb-0 mt-1 text-sm text-slate-600 dark:text-neutral-300">User outcomes drive signals, policy, and engineering action.</p>
      </div>
      <div className="overflow-x-auto px-3 py-5 sm:px-5">
        <svg
          aria-labelledby="reliability-loop-title reliability-loop-description"
          className="mx-auto block h-auto min-w-[680px] max-w-full"
          role="img"
          viewBox="0 0 960 500"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title id="reliability-loop-title">The reliability control loop</title>
          <desc id="reliability-loop-description">
            Critical user journeys pass through services and dependencies. Telemetry becomes SLIs and SLOs, whose error-budget state guides delivery, incident response, or reliability investment. Engineering changes feed back into the service.
          </desc>
          <defs>
            <marker id="loop-arrow" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto">
              <path d="M0 0 9 4.5 0 9Z" fill={colors.line} />
            </marker>
            <marker id="loop-arrow-teal" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto">
              <path d="M0 0 9 4.5 0 9Z" fill={colors.teal} />
            </marker>
          </defs>

          <text x="40" y="28" fill={colors.muted} fontSize="11" fontWeight="700" letterSpacing="1.5">1 · SERVE</text>
          <text x="40" y="51" fill={colors.ink} fontSize="17" fontWeight="700">Protect the critical journey</text>
          <Card x={40} y={70} width={250} title="User journey" detail="Sign in · checkout · core task" fill={colors.tealLight} accent={colors.teal} />
          <Card x={355} y={70} width={250} title="Service path" detail="Edge · services · data · dependencies" fill={colors.blueLight} accent={colors.blue} />
          <path d="M290 108H344" stroke={colors.line} strokeWidth="2" markerEnd="url(#loop-arrow)" />

          <path d="M480 146V176" stroke={colors.line} strokeWidth="2" markerEnd="url(#loop-arrow)" />
          <text x="40" y="199" fill={colors.muted} fontSize="11" fontWeight="700" letterSpacing="1.5">2 · MEASURE</text>
          <text x="40" y="222" fill={colors.ink} fontSize="17" fontWeight="700">Turn experience into a decision signal</text>
          <Card x={40} y={239} width={250} title="Telemetry → SLIs" detail="Success rate · latency · saturation" fill={colors.blueLight} accent={colors.blue} />
          <Card x={355} y={239} width={250} title="SLO + error budget" detail="Target, window, burn rate, policy" fill={colors.tealLight} accent={colors.teal} />
          <path d="M290 277H344" stroke={colors.line} strokeWidth="2" markerEnd="url(#loop-arrow)" />

          <path d="M605 277H642M642 277V457" fill="none" stroke={colors.line} strokeWidth="2" />
          <path d="M642 277H658M642 367H658M642 457H658" fill="none" stroke={colors.line} strokeWidth="2" markerEnd="url(#loop-arrow)" />
          <text x="670" y="199" fill={colors.muted} fontSize="11" fontWeight="700" letterSpacing="1.5">3 · RESPOND</text>
          <text x="670" y="222" fill={colors.ink} fontSize="17" fontWeight="700">Match action to budget state</text>
          <Card x={670} y={239} width={250} title="Healthy · deliver" detail="Keep shipping with safe rollout controls" fill={colors.tealLight} accent={colors.teal} />
          <Card x={670} y={329} width={250} title="Fast burn · mitigate" detail="Page, stabilize, and learn" fill={colors.amberLight} accent={colors.amber} />
          <Card x={670} y={419} width={250} title="Exhausted · invest" detail="Prioritize reliability; adjust release policy" fill={colors.roseLight} accent={colors.rose} />

          <path d="M670 367H625V450H605" fill="none" stroke={colors.line} strokeWidth="2" markerEnd="url(#loop-arrow)" />
          <path d="M670 457H615" stroke={colors.line} strokeWidth="2" markerEnd="url(#loop-arrow)" />
          <Card x={355} y={412} width={250} title="Improve the system" detail="Architecture · automation · capacity" fill="#f1f5f6" accent={colors.ink} />
          <path d="M355 450H320V108H300" fill="none" stroke={colors.teal} strokeWidth="2" strokeDasharray="5 5" markerEnd="url(#loop-arrow-teal)" />
          <text x="40" y="481" fill={colors.muted} fontSize="12">The loop closes when evidence changes how the service is built or operated.</text>
        </svg>
      </div>
      <figcaption className="sr-only">The reliability control loop connects user experience to measurement, operational policy, and system improvements.</figcaption>
    </figure>
  );
}
