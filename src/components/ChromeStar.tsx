export function ChromeStar() {
  return (
    <svg className="chrome-star" viewBox="0 0 200 200" aria-hidden="true">
      <defs>
        <linearGradient id="star-metal" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fdffd0" /><stop offset=".28" stopColor="#d4ff64" />
          <stop offset=".48" stopColor="#718c28" /><stop offset=".55" stopColor="#f4ffb9" />
          <stop offset=".74" stopColor="#b5de4e" /><stop offset="1" stopColor="#4d6626" />
        </linearGradient>
      </defs>
      <path d="M100 10 C112 10 112 54 126 64 C138 72 178 65 183 77 C188 90 145 107 141 120 C136 134 157 169 146 177 C135 184 109 150 96 150 C81 150 53 180 42 171 C30 163 57 129 53 115 C49 102 12 84 17 73 C23 59 64 72 76 63 C88 54 87 10 100 10Z" fill="url(#star-metal)" stroke="#d9ef91" strokeWidth="1" />
      <path d="M99 29 Q96 70 77 78 Q61 84 34 78 M104 99 Q125 101 162 82 M100 114 Q113 139 138 161" fill="none" stroke="#f7ffe2" strokeWidth="3" strokeLinecap="round" opacity=".55" />
    </svg>
  )
}
