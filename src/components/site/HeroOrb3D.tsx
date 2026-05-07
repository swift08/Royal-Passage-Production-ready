import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import type { Group } from "three";
import * as THREE from "three";
import { cn } from "@/lib/utils";

function EmberOrb({ scrollTilt }: { scrollTilt: number }) {
  const group = useRef<Group>(null);

  useFrame((_, delta) => {
    if (!group.current) return;
    group.current.rotation.y += delta * 0.38;
    const targetX = scrollTilt * 0.55;
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, targetX, 0.06);
  });

  return (
    <group ref={group}>
      <mesh castShadow>
        <icosahedronGeometry args={[1.12, 1]} />
        <meshStandardMaterial
          color="#d4af37"
          metalness={0.68}
          roughness={0.16}
          emissive="#3d2810"
          emissiveIntensity={0.28}
        />
      </mesh>
      <mesh scale={1.08} rotation={[0.4, 0.7, 0]}>
        <torusGeometry args={[1.45, 0.018, 12, 64]} />
        <meshBasicMaterial color="#f7ecd8" transparent opacity={0.42} />
      </mesh>
    </group>
  );
}

type HeroOrb3DProps = {
  scrollTilt: number;
  /** Controls layout/size — parent should set explicit width/height */
  className?: string;
};

export function HeroOrb3D({ scrollTilt, className }: HeroOrb3DProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        className={cn(
          "rounded-full bg-[radial-gradient(ellipse_at_30%_30%,oklch(0.72_0.12_86_/_0.35),transparent_55%),radial-gradient(ellipse_at_70%_80%,oklch(0.55_0.08_72_/_0.18),transparent_50%)]",
          className,
        )}
        aria-hidden
      />
    );
  }

  return (
    <div className={cn("pointer-events-none relative h-full w-full min-h-[140px]", className)}>
      <Canvas
        className="h-full w-full touch-none"
        camera={{ position: [0, 0, 4.4], fov: 40 }}
        dpr={[1, 2]}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.28} color="#3d1518" />
        <directionalLight position={[5, 8, 6]} intensity={1.25} color="#fff6e8" />
        <directionalLight position={[-5, -3, 2]} intensity={0.55} color="#4a0404" />
        <pointLight position={[2, -2, 3]} intensity={0.85} color="#e8c547" />
        <EmberOrb scrollTilt={scrollTilt} />
      </Canvas>
    </div>
  );
}
