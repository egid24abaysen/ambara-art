import { Suspense, lazy } from 'react';
import Canvas from './canvas';
import Customizer from './pages/Customizer';
import Home from './pages/Home';

// Lazy-load Dither so it doesn't block on initial render
const Dither = lazy(() => import('./components/Dither'));

function App() {
  return (
    <>
      {/* Dither animated background — its own isolated Canvas */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
        <Suspense fallback={<div style={{ background: '#030008', position: 'fixed', inset: 0 }} />}>
          <Dither
            waveColor={[0.52, 0.08, 0.92]}
            waveSpeed={0.04}
            waveFrequency={3.0}
            waveAmplitude={0.38}
            colorNum={21}
            pixelSize={2}
            enableMouseInteraction={true}
            mouseRadius={0.35}
          />
        </Suspense>
      </div>

      <main className="app" style={{ position: 'relative', zIndex: 1 }}>
        <Home />
        <Canvas />
        <Customizer />
      </main>
    </>
  );
}

export default App;
