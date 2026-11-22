import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useCafeStore } from '../../store/useCafeStore';

export const FloatingBeans: React.FC = () => {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const { prefersReducedMotion } = useCafeStore();

  const count = 12;

  // Generate random positions, scales, and rotation offsets for each bean
  const beansData = useMemo(() => {
    const data = [];
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const radius = 2.0 + Math.random() * 1.5;
      const x = Math.cos(angle) * radius;
      const y = -0.5 + Math.random() * 2.2;
      const z = Math.sin(angle) * radius;
      
      const speedX = (Math.random() - 0.5) * 0.4;
      const speedY = 0.2 + Math.random() * 0.3;
      const speedZ = (Math.random() - 0.5) * 0.4;

      const scale = 0.14 + Math.random() * 0.08;

      data.push({ x, y, z, speedX, speedY, speedZ, scale, angle, radius });
    }
    return data;
  }, [count]);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((state) => {
    if (!meshRef.current || prefersReducedMotion) return;

    const time = state.clock.elapsedTime;

    beansData.forEach((bean, i) => {
      // Gentle orbital motion around the cup
      const currentAngle = bean.angle + time * 0.15;
      const currentY = bean.y + Math.sin(time * bean.speedY + i) * 0.15;
      const currentX = Math.cos(currentAngle) * bean.radius;
      const currentZ = Math.sin(currentAngle) * bean.radius;

      dummy.position.set(currentX, currentY, currentZ);
      dummy.rotation.set(
        time * bean.speedX + i,
        time * 0.2 + i,
        time * bean.speedZ
      );
      dummy.scale.set(bean.scale, bean.scale * 1.35, bean.scale * 0.85); // Organic bean proportions
      dummy.updateMatrix();

      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh
      ref={meshRef}
      args={[undefined, undefined, count]}
      castShadow
    >
      {/* Spheroid representation of coffee bean */}
      <sphereGeometry args={[1, 16, 16]} />
      <meshStandardMaterial
        color="#321D11" // Dark French roast color
        roughness={0.4}
        metalness={0.15}
      />
    </instancedMesh>
  );
};
