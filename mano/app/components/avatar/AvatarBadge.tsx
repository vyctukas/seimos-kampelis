"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import type { AvatarConfig } from "@/lib/avatar";
import { DEFAULT_AVATAR } from "@/lib/avatar";

const Character3D = dynamic(() => import("./Character3D"), { ssr: false });

type AvatarBadgeProps = {
  config?: AvatarConfig | null;
  size?: number;
};

export default function AvatarBadge({ config, size = 56 }: AvatarBadgeProps) {
  const c = config ?? DEFAULT_AVATAR;

  return (
    <div
      className="shrink-0 overflow-hidden rounded-full border-2 border-primary-light bg-gradient-to-b from-primary-light/50 to-background"
      style={{ width: size, height: size }}
    >
      <Canvas camera={{ position: [0, 1.1, 2.4], fov: 40 }}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[3, 5, 3]} intensity={0.9} />
        <Suspense fallback={null}>
          <Character3D config={c} autoRotate={false} />
        </Suspense>
      </Canvas>
    </div>
  );
}
