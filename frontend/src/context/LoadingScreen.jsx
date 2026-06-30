import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const C = {
  salmon: '#F2A09F',
  black:  '#1A1A1A',
  white:  '#FFFFFF',
  bg:     '#F8F7F5',
  muted:  '#9A9A9A',
}

const BAR_COLORS = [C.salmon, C.black, C.salmon]

const DEFAULT_MESSAGES = [
  'Insights you need',
  'Crunching your numbers',
  'Finding patterns',
  'Abra cadabra - BOOM! analyzed',
  'Almost there...',
]

export default function LoadingScreen({ messages = DEFAULT_MESSAGES }) {
  const [msgIndex, setMsgIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setMsgIndex((i) => (i + 1) % messages.length)
    }, 2000)
    return () => clearInterval(id)
  }, [messages.length])

  return (
    <div style={s.root}>
      <motion.div
        style={s.watermark}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.04 }}
        transition={{ duration: 2 }}
        aria-hidden="true"
      >
        ₹100
      </motion.div>

      <div style={s.center}>
        <motion.span
          style={s.logo}
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          MyHundred
        </motion.span>

        <div style={s.barsRow}>
          {BAR_COLORS.map((color, i) => (
            <motion.span
              key={i}
              style={{ ...s.bar, backgroundColor: color }}
              animate={{ scaleY: [0.35, 1, 0.5, 0.85, 0.35] }}
              transition={{
                duration: 1.8 + i * 0.25,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 0.18,
              }}
            />
          ))}
        </div>

        <div style={s.msgWrap}>
          <AnimatePresence mode="wait">
            <motion.p
              key={msgIndex}
              style={s.msg}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.35 }}
            >
              {messages[msgIndex]}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

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
    gap:           'clamp(20px, 4vh, 36px)',
    zIndex:        2,
    padding:       '0 24px',
  },

  logo: {
    fontFamily:    "'Syne', sans-serif",
    fontWeight:    800,
    fontSize:      'clamp(14px, 2.2vw, 18px)',
    letterSpacing: '0.5px',
    color:         C.black,
  },

  barsRow: {
    display:    'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap:        'clamp(10px, 2vw, 18px)',
    height:     'clamp(80px, 16vh, 140px)',
  },

  bar: {
    display:         'inline-block',
    width:           'clamp(14px, 2.6vw, 22px)',
    height:          '100%',
    borderRadius:    'clamp(7px, 1vw, 11px)',
    transformOrigin: 'center',
  },

  msg: {
    fontSize:      'clamp(13px, 1.6vw, 15px)',
    color:         C.muted,
    letterSpacing: '0.2px',
    margin:        0,
    textAlign:     'center',
  },

  msgWrap: {
    height:        '20px',
    display:       'flex',
    alignItems:    'center',
    justifyContent: 'center',
  },
}