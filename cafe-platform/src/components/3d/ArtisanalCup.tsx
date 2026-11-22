import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useCafeStore } from '../../store/useCafeStore';

export const ArtisanalCup: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);
  const steamRef = useRef<THREE.Points>(null);
  const { isSteamActive, prefersReducedMotion } = useCafeStore();

  // Steam Particle System Configuration
  const particleCount = 45;
  const { positions, speeds } = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const spd = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 0.45; // x spread
      pos[i * 3 + 1] = 0.75 + Math.random() * 0.9; // y height
      pos[i * 3 + 2] = (Math.random() - 0.5) * 0.45; // z spread
      spd[i] = 0.008 + Math.random() * 0.012;
    }
    return { positions: pos, speeds: spd };
  }, [particleCount]);

  // Frame Loop for Gentle Cup Breathing & Steam Animation
  useFrame((state) => {
    if (prefersReducedMotion) return;

    // Subtle gentle bobbing
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.2) * 0.04;
    }

    // Animate rising steam particles
    if (steamRef.current && isSteamActive) {
      const positionAttr = steamRef.current.geometry.attributes.position as THREE.BufferAttribute;
      const posArray = positionAttr.array as Float32Array;

      for (let i = 0; i < particleCount; i++) {
        posArray[i * 3 + 1] += speeds[i]; // Rise upward
        posArray[i * 3] += Math.sin(state.clock.elapsedTime * 2 + i) * 0.001; // Gentle horizontal drift

        // Reset if reached ceiling
        if (posArray[i * 3 + 1] > 2.2) {
          posArray[i * 3 + 1] = 0.75;
          posArray[i * 3] = (Math.random() - 0.5) * 0.45;
          posArray[i * 3 + 2] = (Math.random() - 0.5) * 0.45;
        }
      }
      positionAttr.needsUpdate = true;
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.4, 0]} scale={[1.35, 1.35, 1.35]}>
      {/* 1. CERAMIC SAUCER */}
      <mesh position={[0, 0.05, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[1.5, 1.0, 0.1, 48]} />
        <meshStandardMaterial
          color="#F2EDE4"
          roughness={0.25}
          metalness={0.06}
          envMapIntensity={1.2}
        />
      </mesh>
      
      {/* Saucer Inner Ring Inset */}
      <mesh position={[0, 0.1, 0]}>
        <ringGeometry args={[0.6, 1.35, 48]} />
        <meshStandardMaterial
          color="#E8E1D5"
          roughness={0.3}
          metalness={0.05}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* 2. CERAMIC CUP BODY */}
      <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.82, 0.6, 0.85, 48, 1, true]} />
        <meshStandardMaterial
          color="#F7F3ED"
          roughness={0.2}
          metalness={0.05}
          side={THREE.DoubleSide}
          envMapIntensity={1.4}
        />
      </mesh>

      {/* Cup Base / Solid Bottom */}
      <mesh position={[0, 0.1, 0]}>
        <circleGeometry args={[0.6, 48]} />
        <meshStandardMaterial color="#EAE3D7" roughness={0.3} side={THREE.DoubleSide} />
      </mesh>

      {/* Cup Lip / Smooth Rounded Rim */}
      <mesh position={[0, 0.925, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.82, 0.035, 20, 48]} />
        <meshStandardMaterial color="#F7F3ED" roughness={0.18} metalness={0.05} />
      </mesh>

      {/* 3. CUP HANDLE */}
      <mesh position={[0.88, 0.52, 0]} rotation={[0, 0, -Math.PI / 8]}>
        <torusGeometry args={[0.26, 0.055, 20, 36, Math.PI * 1.15]} />
        <meshStandardMaterial color="#F7F3ED" roughness={0.2} metalness={0.05} />
      </mesh>

      {/* 4. FRESH BREWED ESPRESSO SURFACE */}
      <mesh position={[0, 0.78, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.78, 48]} />
        <meshStandardMaterial
          color="#24130B"
          roughness={0.12}
          metalness={0.2}
          envMapIntensity={1.8}
        />
      </mesh>

      {/* Delicate Latte Art Rosetta / Crema Rim */}
      <mesh position={[0, 0.782, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.45, 0.75, 48]} />
        <meshStandardMaterial
          color="#C98B4B"
          roughness={0.35}
          transparent
          opacity={0.65}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Crema Center Heart Accent */}
      <mesh position={[0, 0.783, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.25, 32]} />
        <meshStandardMaterial
          color="#E8BE88"
          roughness={0.4}
          transparent
          opacity={0.8}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* 5. VOLUMETRIC STEAM PARTICLES */}
      {isSteamActive && (
        <points ref={steamRef}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={particleCount}
              array={positions}
              itemSize={3}
            />
          </bufferGeometry>
          <pointsMaterial
            size={0.18}
            color="#FFF4E6"
            transparent
            opacity={0.25}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </points>
      )}
    </group>
  );
};
