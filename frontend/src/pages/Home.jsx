import { useEffect } from 'react'
import { motion, transform } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

const C = {
  salmon: '#F2A09F',
  black:  '#1A1A1A',
  white:  '#FFFFFF',
  bg:     '#F8F7F5',
  border: '#E5E5E5',
  muted:  '#9A9A9A',
}

const BARS = [
  {
    id:        'analyze',
    label:     'ANALYZE',
    desc:      'See where your money goes',
    bg:        C.salmon,
    textColor: C.black,
    descColor: 'rgba(26,26,26,0.55)',
    bt: 'none', bl: 'none', br: 'none',
    height: '36vh',
    delay:  0.35,
    flex:   1,
  },
  {
    id:        'record',
    label:     'RECORD',
    desc:      'Record every transaction',
    bg:        C.white,
    textColor: C.black,
    descColor: C.muted,
    bt: `1.5px solid ${C.black}`,
    bl: `1.5px solid ${C.black}`,
    br: `1.5px solid ${C.black}`,
    height: '54vh',
    delay:  0.55,
    flex:   1,
  },
  {
    id:        'spend',
    label:     'SPEND',
    desc:      'Know your patterns',
    bg:        C.black,
    textColor: C.white,
    descColor: 'rgba(255,255,255,0.5)',
    bt: 'none', bl: 'none', br: 'none',
    height: '28vh',
    delay:  0.75,
    flex:   1,
  },
]

const fadeUp = (delay = 0, y = 28) => ({
  initial:    { opacity: 0, y },
  animate:    { opacity: 1, y: 0 },
  transition: { duration: 0.55, delay, ease: [0.25, 0.46, 0.45, 0.94] },
})

export default function Home() {
  const navigate = useNavigate()

  // Inject Google Fonts
  useEffect(() => {
    const link = document.createElement('link')
    link.rel  = 'stylesheet'
    link.href =
      'https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap'
    document.head.appendChild(link)
    return () => {
      if (document.head.contains(link)) document.head.removeChild(link)
    }
  }, []);

  return (
    <div style={s.root}>

      {/* ── Navbar ──────────────────────────────────────────────── */}
      <motion.nav
        style={s.nav}
        initial={{ opacity: 0, y: -18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <span style={s.logo}>MyHundred</span>

        <div style={s.navRight}>
          <motion.button
            style={s.loginBtn}
            onClick={() => navigate('/login')}
            whileHover={{
              backgroundColor: C.salmon,
              color: C.white,
              borderColor: C.salmon,
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.16 }}
          >
            login
          </motion.button>

          <motion.span
            style={s.signupLink}
            onClick={() => navigate('/register')}
            whileHover={{ color: C.black }}
            transition={{ duration: 0.16 }}
          >
            or Sign Up
          </motion.span>
        </div>
      </motion.nav>

      <div style={s.main}>

        <motion.div
          style={s.watermark}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.042 }}
          transition={{ duration: 1.6, delay: 0.7 }}
          aria-hidden="true"
        >
          ₹100
        </motion.div>

        <div style={s.hero}>
          <motion.h1 style={s.headline} {...fadeUp(0.18)}>
            Understand Your
            <br />
            <span style={{ color: C.salmon }}>SPEND</span>
          </motion.h1>

          <motion.p style={s.tagline} {...fadeUp(0.46, 12)}>
            in hundreds
          </motion.p>

          <motion.button
            style={s.ctaBtn}
            onClick={() => navigate('/register')}
            {...fadeUp(0.7, 12)}
            whileHover={{ scale: 1.04, backgroundColor: '#2e2e2e' }}
            whileTap={{ scale: 0.96 }}
          >
            Get Started{' '}
            <span style={s.ctaSubtext}>— it's free</span>
          </motion.button>
        </div>

        {/* ── Bars ─────────────────────────────────────────────── */}
        <div style={s.barsContainer}>
          {BARS.map((bar) => (
            <motion.div
              key={bar.id}
              style={{
                ...s.bar,
                flex:            bar.flex,
                height:          bar.height,
                backgroundColor: bar.bg,
                borderTop:       bar.bt,
                borderLeft:      bar.bl,
                borderRight:     bar.br,
                borderBottom:    'none',
                originY: 1,
              }}
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              whileHover={{ y: -10 }}
              transition={{
                scaleY: {
                  duration: 0.72,
                  delay: bar.delay,
                  ease: [0.34, 1.18, 0.64, 1],
                },
                y: { type: 'spring', stiffness: 400, damping: 30 },
              }}
            >
              <motion.div
                style={s.barContent}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: bar.delay + 0.6, duration: 0.35 }}
              >
                <p style={{ ...s.barLabel, color: bar.textColor }}>
                  {bar.label}
                </p>
                <p style={{ ...s.barDesc, color: bar.descColor }}>
                  {bar.desc}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  )
}

// ─── Styles ───────────────────────────────────────────────────────
const s = {
  root: {
    height:          '100vh',
    backgroundColor: C.bg,
    fontFamily:      "'DM Sans', sans-serif",
    display:         'flex',
    flexDirection:   'column',
    overflow:        'hidden',
    position:        'relative',
  },

  // Navbar
  nav: {
    display:         'flex',
    justifyContent:  'space-between',
    alignItems:      'center',
    padding:         '0 40px',
    height:          '68px',
    borderBottom:    `1px solid ${C.border}`,
    flexShrink:      0,
    backgroundColor: C.bg,
    zIndex:          10,
  },
  logo: {
    fontFamily:    "'Syne', sans-serif",
    fontWeight:    800,
    fontSize:      '18px',
    color:         C.black,
    letterSpacing: '-0.5px',
  },
  navRight: {
    display:    'flex',
    alignItems: 'center',
    gap:        '12px',
  },
  loginBtn: {
    padding:         '8px 22px',
    border:          `1.5px solid ${C.salmon}`,
    borderRadius:    '8px',
    backgroundColor: 'transparent',
    color:           C.black,
    fontFamily:      "'DM Sans', sans-serif",
    fontWeight:      600,
    fontSize:        '14px',
    cursor:          'pointer',
  },
  signupLink: {
    color:      C.muted,
    fontSize:   '14px',
    fontWeight: 500,
    cursor:     'pointer',
  },

  // Main container
  main: {
    flex:          1,
    display:       'flex',
    flexDirection: 'column',
    position:      'relative',
    overflow:      'hidden',
  },

  // ₹100 Watermark
  watermark: {
    width: '100px',
    position:      'absolute',
    right:         '50%',
    bottom:        '-2%',
    fontFamily:    "'Syne', sans-serif",
    fontWeight:    800,
    fontSize:      'clamp(110px, 20vw, 260px)',
    color:         C.black,
    lineHeight:    1,
    userSelect:    'none',
    pointerEvents: 'none',
    letterSpacing: '-6px',
    zIndex:        3,
  },

  // Hero
  hero: {
    padding:  '44px 40px 0',
    zIndex:   2,
    position: 'relative',
  },
  headline: {
    fontFamily:    "'Syne', sans-serif",
    fontWeight:    800,
    fontSize:      'clamp(40px, 6.8vw, 88px)',
    color:         C.black,
    lineHeight:    1.03,
    letterSpacing: '-2px',
    margin:        0,
  },
  tagline: {
    marginTop:     '10px',
    color:         C.muted,
    fontSize:      '11px',
    fontWeight:    600,
    letterSpacing: '3px',
    textTransform: 'uppercase',
    margin:        '10px 0 0',
  },
  ctaBtn: {
    marginTop:       '26px',
    display:         'inline-block',
    padding:         '13px 30px',
    backgroundColor: C.black,
    color:           C.white,
    border:          'none',
    borderRadius:    '10px',
    fontFamily:      "'DM Sans', sans-serif",
    fontWeight:      600,
    fontSize:        '15px',
    cursor:          'pointer',
    letterSpacing:   '-0.2px',
  },
  ctaSubtext: {
    opacity:    0.48,
    fontWeight: 400,
  },

  // Bars
  barsContainer: {
    display:    'flex',
    alignItems: 'flex-end',
    gap:        '3px',
    flex:       1,
    marginTop:  '20px',
    zIndex:     2,
    position:   'relative',
  },
  bar: {
    display:        'flex',
    flexDirection:  'column',
    justifyContent: 'center',
    padding:        '18px 20px',
    cursor:         'default',
  },
  barContent: {
    display:       'flex',
    flexDirection: 'column',
    gap:           '4px',
  },
  barLabel: {
    fontFamily:    "'Syne', sans-serif",
    fontWeight:    800,
    fontSize:      '14px',
    letterSpacing: '2.5px',
    margin:        0,
  },
  barDesc: {
    fontSize:   '12px',
    fontWeight: 500,
    lineHeight: 1.45,
    maxWidth:   '160px',
    margin:     0,
  },
}
