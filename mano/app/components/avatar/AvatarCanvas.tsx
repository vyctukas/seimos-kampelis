"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import type { AvatarConfig } from "@/lib/avatar";

const Character3D = dynamic(() => import("./Character3D"), { ssr: false });

type AvatarCanvasProps = {
  config: AvatarConfig;
  height?: number;
  interactive?: boolean;
};

export default function AvatarCanvas({
  config,
  height = 280,
  interactive = false,
}: AvatarCanvasProps) {
  return (
    <div
      className="w-full overflow-hidden rounded-2xl border-2 border-primary-light bg-gradient-to-b from-primary-light/40 to-background"
      style={{ height }}
    >
      <Canvas camera={{ position: [0, 1.1, 2.8], fov: 42 }} shadows>
        <ambientLight intensity={0.65} />
        <directionalLight position={[4, 6, 4]} intensity={1.1} castShadow />
        <directionalLight position={[-3, 2, -2]} intensity={0.35} />
        <Suspense fallback={null}>
          <Character3D config={config} autoRotate={!interactive} />
        </Suspense>
        {interactive && (
          <OrbitControls
            enableZoom={false}
            minPolarAngle={Math.PI / 3}
            maxPolarAngle={Math.PI / 2}
          />
        )}
      </Canvas>
    </div>
  );
}
