export default function BottleArt({ className = '' }) {
  return (
    <svg viewBox="0 0 420 720" role="img" aria-label="Dr. Mushtaq’s Blackseed Oil amber bottle" className={className}>
      <defs>
        <linearGradient id="glass" x1="0" x2="1">
          <stop stopColor="#6d2e0d" />
          <stop offset="0.45" stopColor="#bc6320" />
          <stop offset="1" stopColor="#55200b" />
        </linearGradient>
        <linearGradient id="cap" x1="0" x2="1">
          <stop stopColor="#161616" />
          <stop offset="0.5" stopColor="#363331" />
          <stop offset="1" stopColor="#111111" />
        </linearGradient>
      </defs>
      <ellipse cx="210" cy="676" rx="132" ry="20" fill="#493d30" opacity="0.22" />
      <rect x="170" y="18" width="80" height="135" rx="35" fill="url(#cap)" />
      <rect x="145" y="138" width="130" height="80" rx="10" fill="#1b1a19" />
      <g stroke="#4b4843" strokeWidth="3">
        <path d="M155 145v65M167 145v65M179 145v65M191 145v65M203 145v65M215 145v65M227 145v65M239 145v65M251 145v65M263 145v65" />
      </g>
      <path
        d="M130 215h160v42c0 22 45 35 45 80v280c0 34-24 47-45 47H130c-21 0-45-13-45-47V337c0-45 45-58 45-80z"
        fill="url(#glass)"
      />
      <path d="M123 283c28 17 146 17 174 0v350c0 17-9 25-22 25H145c-13 0-22-8-22-25z" fill="#201e1e" />
      <path d="M125 288c29 15 140 16 171 0" stroke="#d29a50" opacity="0.55" fill="none" />
      <g fill="#d4a04d">
        <circle cx="210" cy="350" r="30" fill="none" stroke="#d4a04d" strokeWidth="2" />
        <path d="M210 330l13 20-13 21-13-21z" />
        <text x="210" y="416" textAnchor="middle" fontFamily="Georgia, serif" fontSize="29" fontWeight="bold">
          Dr. Mushtaq’s
        </text>
        <text x="210" y="446" textAnchor="middle" fontFamily="Helvetica, Arial" fontSize="14" letterSpacing="3">
          BLACKSEED OIL
        </text>
        <circle cx="210" cy="512" r="39" fill="none" stroke="#d4a04d" strokeWidth="2" />
        <text x="210" y="508" textAnchor="middle" fontFamily="Helvetica, Arial" fontSize="9">
          COLD PRESSED
        </text>
        <text x="210" y="523" textAnchor="middle" fontFamily="Helvetica, Arial" fontSize="9">
          NIGELLA SATIVA
        </text>
        <text x="210" y="592" textAnchor="middle" fontFamily="Georgia, serif" fontSize="12">
          THE MOLECULE, NOT THE MYTH.
        </text>
      </g>
      <path
        d="M148 245c-22 80-10 224 4 280"
        stroke="#efa15d"
        strokeWidth="11"
        opacity="0.25"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  )
}
