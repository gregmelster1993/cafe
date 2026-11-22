import React, { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, ContactShadows } from '@react-three/drei';
import { ArtisanalCup } from './ArtisanalCup';
import { FloatingBeans } from './FloatingBeans';
import { useCafeStore } from '../../store/useCafeStore';
import { Wind, Sparkles } from 'lucide-react';

export const HeroCanvas: React.FC = () => {
  const [hasWebGL, setHasWebGL] = useState<boolean>(true);
  const [isInteracting, setIsInteracting] = useState<boolean>(false);
  const { isSteamActive, toggleSteam, prefersReducedMotion } = useCafeStore();

  // WebGL Availability Check
  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const supported = !!(
        window.WebGLRenderingContext &&
        (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
      );
      setHasWebGL(supported);
    } catch {
      setHasWebGL(false);
    }
  }, []);

  // WebGL Fallback View
  if (!hasWebGL) {
    return (
      <div className="relative w-full h-[520px] rounded-3xl overflow-hidden border border-cafe-line shadow-cafe bg-gradient-to-b from-[#2A1D16] to-[#1C140F] flex items-center justify-center p-8">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 mx-auto rounded-full bg-cafe-caramel/20 flex items-center justify-center mb-4 text-cafe-amber border border-cafe-amber/30">
            <Sparkles className="w-10 h-10" />
          </div>
          <h4 className="font-serif text-2xl text-cafe-paper mb-2">Artisanal Coffee in 3D</h4>
          <p className="text-sm text-[#D7C7B7] mb-4">
            WebGL acceleration is inactive in your browser. Our full digital menu and ordering remains seamlessly accessible.
          </p>
          <img
            src="https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80"
            alt="Artisanal Pour Over"
            className="w-48 h-48 object-cover rounded-2xl mx-auto shadow-xl border border-cafe-amber/20"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[480px] lg:h-[580px] select-none">
      {/* 3D Canvas */}
      <Canvas
        shadows
        camera={{ position: [0, 1.8, 4.0], fov: 42 }}
        className="cursor-grab active:cursor-grabbing rounded-3xl"
        onPointerDown={() => setIsInteracting(true)}
        onPointerUp={() => setIsInteracting(false)}
      >
        <color attach="background" args={['#F7F3ED']} />
        
        {/* Cinematic Studio Lighting */}
        <ambientLight intensity={0.7} color="#FFF8F0" />
        
        {/* Warm Golden Key Light */}
        <directionalLight
          position={[4, 5, 3]}
          intensity={1.6}
          color="#FFEACC"
          castShadow
          shadow-mapSize={[1024, 1024]}
          shadow-bias={-0.0001}
        />

        {/* Soft Cool Fill Light for Depth */}
        <directionalLight
          position={[-4, 3, -2]}
          intensity={0.6}
          color="#A7BACB"
        />

        {/* Golden Backlight for Steam & Rim Sheen */}
        <spotLight
          position={[0, 4, -3]}
          intensity={2.2}
          angle={0.6}
          penumbra={0.8}
          color="#E5A65E"
        />

        {/* 3D Scene Objects with Suspense */}
        <Suspense fallback={null}>
          <ArtisanalCup />
          <FloatingBeans />
          
          {/* Subtle Ground Contact Shadow */}
          <ContactShadows
            position={[0, -0.4, 0]}
            opacity={0.35}
            scale={5}
            blur={2.4}
            far={1.6}
            color="#2E1C12"
          />
        </Suspense>

        {/* Orbit Controls with Damped Movement */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate={!isInteracting && !prefersReducedMotion}
          autoRotateSpeed={0.8}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 2.1}
          dampingFactor={0.06}
        />
      </Canvas>

      {/* Interactive Micro-Controls Badge */}
      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-none px-2">
        <div className="pointer-events-auto bg-cafe-paper/90 backdrop-blur-md border border-cafe-line px-3.5 py-1.5 rounded-full shadow-cafe flex items-center gap-2 text-xs font-medium text-cafe-muted">
          <span className="w-2 h-2 rounded-full bg-cafe-sage animate-pulse" />
          <span>Interactive 3D • Drag to orbit</span>
        </div>

        <div className="pointer-events-auto flex items-center gap-2">
          {/* Steam Toggle Button */}
          <button
            onClick={toggleSteam}
            title={isSteamActive ? "Pause Steam Effect" : "Enable Steam Effect"}
            className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all flex items-center gap-1.5 shadow-sm ${
              isSteamActive
                ? 'bg-cafe-caramel text-white border-cafe-caramel shadow-glow'
                : 'bg-cafe-paper/90 text-cafe-muted border-cafe-line hover:text-cafe-ink'
            }`}
          >
            <Wind className="w-3.5 h-3.5" />
            <span>{isSteamActive ? "Steam On" : "Steam Off"}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
