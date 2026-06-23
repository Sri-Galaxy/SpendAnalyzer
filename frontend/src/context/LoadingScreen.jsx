import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence, animate } from 'framer-motion'

// ─── Design Tokens (same system as Page.jsx) ──────────────────────
const C = {
  salmon: '#F2A09F',
  black:  '#1A1A1A',
  white:  '#FFFFFF',
  bg:     '#F8F7F5',
  muted:  '#9A9A9A',
}

const DEFAULT_MESSAGES = [
  'Crunching your numbers',
  'Finding insights you need',
  'Spotting where it went',
  'Almost there',
]

// ─── Component ────────────────────────────────────────────────────
// Usage:
//   <LoadingScreen />                                  → self-animates 0→100
//   <LoadingScreen progress={uploadPercent} />         → driven by real progress
//   <LoadingScreen onComplete={() => setReady(true)} />
export default function LoadingScreen({
  progress,
  messages = DEFAULT_MESSAGES,
  duration = 4.2,
  onComplete,
}) {
  const [display, setDisplay]   = useState(0)
  const [msgIndex, setMsgIndex] = useState(0)
  const firedComplete            = useRef(false)

  // Drive the counter — either follow external `progress` or self-animate
  useEffect(() => {
    if (typeof progress === 'number') {
      const controls = animate(display, progress, {
        duration: 1.4,
        ease: 'easeOut',
        onUpdate: (v) => setDisplay(Math.round(v)),
      })
      return () => controls.stop()
    }

    const controls = animate(0, 100, {
      duration,
      ease: [0.12, 0.52, 0.06, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    })
    return () => controls.stop()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [progress, duration])

  // Cycle through messages while loading
  useEffect(() => {
    if (display >= 100) return

    const id = setInterval(() => {
      setMsgIndex((i) => (i + 1) % messages.length)
    }, 500)

    return () => clearInterval(id)
  }, [display, messages.length])

  // Fire onComplete exactly once
  useEffect(() => {
    if (display >= 100 && !firedComplete.current) {
      firedComplete.current = true
      const t = setTimeout(() => onComplete && onComplete(), 350)
      return () => clearTimeout(t)
    }
  }, [display, onComplete])

  return (
    <div style={s.root}>
      {/* Ambient ₹100 watermark — same brand cue as the landing page */}
      <motion.div
        style={s.watermark}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.035 }}
        transition={{ duration: 1.4 }}
        aria-hidden="true"
      >
        ₹100
      </motion.div>

      <div style={s.center}>
        {/* Wordmark */}
        <motion.span
          style={s.logo}
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          MyHundred
        </motion.span>

        {/* Big percentage counter */}
        <div style={s.percentRow}>
          <span style={s.percentNum}>{display}</span>
          <span style={s.percentSign}>%</span>
        </div>

        {/* Equalizer-style loader bars — echoes the ANALYZE/RECORD/SPEND motif */}
        <div style={s.barsRow}>
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              style={{
                ...s.bar,
                backgroundColor: i === 1 ? C.black : C.salmon,
              }}
              animate={
                display < 100
                  ? { scaleY: [0.3, 1, 0.45, 0.85, 0.3] }
                  : { scaleY: 1 }
              }
              transition={
                display < 100
                  ? {
                      duration: 1.1 + i * 0.15,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }
                  : { duration: 0.3 }
              }
            />
          ))}
        </div>

        {/* Cycling status text */}
        <div style={s.msgWrap}>
          <AnimatePresence mode="wait">
            <motion.p
              key={display >= 100 ? 'done' : msgIndex}
              style={s.msg}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.28 }}
            >
              {display >= 100 ? "You're all set" : messages[msgIndex]}
              <span style={s.ellipsis}>{display >= 100 ? '' : '…'}</span>
            </motion.p>
          </AnimatePresence>
        </div>
      </div>

      {/* Thin progress bar pinned to the bottom — literal progress reference */}
      <div style={s.trackWrap}>
        <motion.div
          style={s.track}
          animate={{ width: `${display}%` }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
        />
      </div>
    </div>
  )
}

// ─── Styles ───────────────────────────────────────────────────────
const s = {
  root: {
    position:        'fixed',
    inset:            0,
    backgroundColor: C.bg,
    display:         'flex',
    flexDirection:   'column',
    alignItems:      'center',
    justifyContent:  'center',
    fontFamily:      "'DM Sans', sans-serif",
    overflow:        'hidden',
    zIndex:          9999,
  },

  watermark: {
    position:      'absolute',
    right:         '-2%',
    bottom:        '-6%',
    fontFamily:    "'Syne', sans-serif",
    fontWeight:    800,
    fontSize:      'clamp(140px, 26vw, 320px)',
    color:         C.black,
    lineHeight:    1,
    userSelect:    'none',
    pointerEvents: 'none',
    letterSpacing: '-8px',
  },

  center: {
    display:       'flex',
    flexDirection: 'column',
    alignItems:    'center',
    gap:           '18px',
    zIndex:        2,
  },

  logo: {
    fontFamily:    "'Syne', sans-serif",
    fontWeight:    800,
    fontSize:      '15px',
    letterSpacing: '0.5px',
    color:         C.black,
    marginBottom:  '6px',
  },

  percentRow: {
    display:    'flex',
    alignItems: 'flex-start',
    lineHeight: 1,
  },
  percentNum: {
    fontFamily:    "'Syne', sans-serif",
    fontWeight:    800,
    fontSize:      'clamp(72px, 14vw, 130px)',
    color:         C.black,
    letterSpacing: '-4px',
  },
  percentSign: {
    fontFamily: "'Syne', sans-serif",
    fontWeight: 700,
    fontSize:   'clamp(28px, 5vw, 44px)',
    color:      C.salmon,
    marginTop:  '14px',
  },

  barsRow: {
    display:    'flex',
    alignItems: 'center',
    gap:        '6px',
    height:     '22px',
    marginTop:  '2px',
  },
  bar: {
    display:         'inline-block',
    width:           '7px',
    height:          '22px',
    borderRadius:    '3px',
    transformOrigin: 'center',
  },

  msgWrap: {
    height:    '20px',
    marginTop: '8px',
  },
  msg: {
    fontSize:      '13px',
    color:         C.muted,
    letterSpacing: '0.2px',
    margin:        0,
  },
  ellipsis: {
    display: 'inline-block',
    width:   '14px',
  },

  trackWrap: {
    position:        'absolute',
    bottom:           0,
    left:             0,
    width:           '100%',
    height:          '3px',
    backgroundColor: 'rgba(26,26,26,0.06)',
  },
  track: {
    height:          '100%',
    backgroundColor: C.salmon,
  },
}
