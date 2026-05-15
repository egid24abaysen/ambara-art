import { motion, AnimatePresence } from 'framer-motion';
import { useSnapshot } from 'valtio';
import { headContainerAnimation, headContentAnimation, headTextAnimation, slideAnimation } from '../config/motion';
import BlurText from '../components/BlurText';
import GlassSurface from '../components/GlassSurface';
import state from '../store';

const Home = () => {
  const snap = useSnapshot(state);

  return (
    <AnimatePresence>
      {snap.intro && (
        <motion.section className="home" {...slideAnimation('left')}>
          {/* Brand header */}
          <motion.header {...slideAnimation('down')}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{
                width: 42, height: 42, borderRadius: '50%',
                background: 'linear-gradient(135deg, rgba(201,162,39,0.15), rgba(123,47,255,0.15))',
                border: '1.5px solid rgba(201,162,39,0.45)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 0 18px rgba(201,162,39,0.3), 0 0 6px rgba(123,47,255,0.2) inset',
                padding: 7,
                flexShrink: 0,
              }}>
                <img
                  src="/logo.png"
                  alt="Ambara Art logo"
                  style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
                />
              </div>
              <span className="mono" style={{
                fontSize: '0.78rem', letterSpacing: '0.2em',
                background: 'linear-gradient(135deg, #c9a227, #f2d060)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}>
                AMBARA ART
              </span>
            </div>
          </motion.header>

          <motion.div {...headContainerAnimation}>
            <motion.div {...headTextAnimation}>
              <p className="home-tagline">afro-futurist fashion · kigali</p>
              <div className="afro-line" style={{ marginBottom: 20 }} />

              {/* BlurText animated headline */}
              <BlurText
                text="WEAR YOUR UNIVERSE"
                delay={120}
                animateBy="words"
                direction="top"
                className="head-text"
                stepDuration={0.5}
              />
            </motion.div>

            <motion.div {...headContentAnimation} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <BlurText
                text="Design your signature piece. Place your art, choose your merch — own your identity."
                delay={60}
                animateBy="words"
                direction="bottom"
                stepDuration={0.3}
                style={{
                  maxWidth: '22rem', fontFamily: "'Outfit', sans-serif",
                  fontWeight: 300, color: 'rgba(232,213,255,0.7)',
                  lineHeight: 1.75, fontSize: '0.92rem',
                }}
              />

              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                {/* ── Customize Now — gold glass ── */}
                <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} style={{ cursor: 'pointer' }}>
                  <GlassSurface
                    width="auto" height={46} borderRadius={12}
                    distortionScale={-140} brightness={55} opacity={0.88}
                    backgroundOpacity={0.08} blur={10}
                    onClick={() => { state.intro = false; state.shopOpen = false; }}
                    role="button" tabIndex={0}
                    style={{
                      border: '1px solid rgba(201,162,39,0.55)',
                      boxShadow: '0 0 22px rgba(201,162,39,0.2)',
                      padding: '0 1.6rem',
                      fontFamily: "'Major Mono Display', monospace",
                      fontSize: '0.7rem', letterSpacing: '0.08em',
                      color: '#f2d060', whiteSpace: 'nowrap',
                    }}
                  >
                    ✦ customize now
                  </GlassSurface>
                </motion.div>

                {/* ── Shop Merch — plasma glass ── */}
                <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} style={{ cursor: 'pointer' }}>
                  <GlassSurface
                    width="auto" height={46} borderRadius={12}
                    distortionScale={-160} brightness={45} opacity={0.85}
                    backgroundOpacity={0.06} blur={12}
                    onClick={() => { state.intro = false; state.shopOpen = true; }}
                    role="button" tabIndex={0}
                    style={{
                      border: '1px solid rgba(123,47,255,0.5)',
                      boxShadow: '0 0 22px rgba(123,47,255,0.18)',
                      padding: '0 1.6rem',
                      fontFamily: "'Major Mono Display', monospace",
                      fontSize: '0.7rem', letterSpacing: '0.08em',
                      color: '#a855f7', whiteSpace: 'nowrap',
                    }}
                  >
                    ⬡ shop merch
                  </GlassSurface>
                </motion.div>
              </div>

              {/* Merch badges */}
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 4 }}>
                {['imvejuru', 'urusengo', 'custom'].map(label => (
                  <span key={label} className="mono" style={{
                    fontSize: '0.58rem', letterSpacing: '0.14em',
                    padding: '4px 10px', borderRadius: 20,
                    background: 'rgba(201,162,39,0.1)',
                    border: '1px solid rgba(201,162,39,0.28)',
                    color: '#c9a227',
                  }}>
                    {label}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </motion.section>
      )}
    </AnimatePresence>
  );
};

export default Home;
