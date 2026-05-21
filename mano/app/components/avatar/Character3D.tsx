"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { Group } from "three";
import type { AvatarConfig } from "@/lib/avatar";

type Character3DProps = {
  config: AvatarConfig;
  autoRotate?: boolean;
};

function Hair({ config }: { config: AvatarConfig }) {
  const { hairStyle, hair } = config;
  if (hairStyle === "long") {
    return (
      <group position={[0, 1.52, 0]}>
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[0.28, 16, 16]} />
          <meshStandardMaterial color={hair} />
        </mesh>
        <mesh position={[0, -0.2, -0.05]}>
          <boxGeometry args={[0.5, 0.35, 0.35]} />
          <meshStandardMaterial color={hair} />
        </mesh>
      </group>
    );
  }
  if (hairStyle === "curly") {
    return (
      <group position={[0, 1.55, 0]}>
        {[0, 1, 2, 3, 4].map((i) => (
          <mesh
            key={i}
            position={[
              Math.cos((i / 5) * Math.PI * 2) * 0.22,
              0,
              Math.sin((i / 5) * Math.PI * 2) * 0.22,
            ]}
          >
            <sphereGeometry args={[0.14, 12, 12]} />
            <meshStandardMaterial color={hair} />
          </mesh>
        ))}
        <mesh>
          <sphereGeometry args={[0.25, 16, 16]} />
          <meshStandardMaterial color={hair} />
        </mesh>
      </group>
    );
  }
  return (
    <mesh position={[0, 1.52, 0]}>
      <sphereGeometry args={[0.26, 16, 16]} />
      <meshStandardMaterial color={hair} />
    </mesh>
  );
}

export default function Character3D({
  config,
  autoRotate = true,
}: Character3DProps) {
  const group = useRef<Group>(null);

  useFrame((_, delta) => {
    if (autoRotate && group.current) {
      group.current.rotation.y += delta * 0.6;
    }
  });

  return (
    <group ref={group} position={[0, -0.9, 0]}>
      {/* Kojos */}
      <mesh position={[-0.14, 0.35, 0]}>
        <boxGeometry args={[0.14, 0.55, 0.14]} />
        <meshStandardMaterial color={config.pants} />
      </mesh>
      <mesh position={[0.14, 0.35, 0]}>
        <boxGeometry args={[0.14, 0.55, 0.14]} />
        <meshStandardMaterial color={config.pants} />
      </mesh>
      <mesh position={[-0.14, 0.05, 0.02]}>
        <boxGeometry args={[0.15, 0.12, 0.2]} />
        <meshStandardMaterial color={config.shoes} />
      </mesh>
      <mesh position={[0.14, 0.05, 0.02]}>
        <boxGeometry args={[0.15, 0.12, 0.2]} />
        <meshStandardMaterial color={config.shoes} />
      </mesh>

      {/* Kūnas */}
      <mesh position={[0, 0.95, 0]}>
        <boxGeometry args={[0.42, 0.55, 0.28]} />
        <meshStandardMaterial color={config.shirt} />
      </mesh>

      {/* Rankos */}
      <mesh position={[-0.32, 0.95, 0]} rotation={[0, 0, 0.2]}>
        <boxGeometry args={[0.1, 0.45, 0.1]} />
        <meshStandardMaterial color={config.shirt} />
      </mesh>
      <mesh position={[0.32, 0.95, 0]} rotation={[0, 0, -0.2]}>
        <boxGeometry args={[0.1, 0.45, 0.1]} />
        <meshStandardMaterial color={config.shirt} />
      </mesh>

      {/* Galva */}
      <mesh position={[0, 1.38, 0]}>
        <sphereGeometry args={[0.24, 20, 20]} />
        <meshStandardMaterial color={config.skin} />
      </mesh>

      <Hair config={config} />

      {config.accessory === "glasses" && (
        <group position={[0, 1.38, 0.2]}>
          <mesh position={[-0.1, 0, 0]}>
            <torusGeometry args={[0.06, 0.015, 8, 16]} />
            <meshStandardMaterial color="#333" />
          </mesh>
          <mesh position={[0.1, 0, 0]}>
            <torusGeometry args={[0.06, 0.015, 8, 16]} />
            <meshStandardMaterial color="#333" />
          </mesh>
          <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <boxGeometry args={[0.08, 0.02, 0.02]} />
            <meshStandardMaterial color="#333" />
          </mesh>
        </group>
      )}

      {config.accessory === "hat" && (
        <group position={[0, 1.62, 0]}>
          <mesh>
            <cylinderGeometry args={[0.3, 0.3, 0.06, 20]} />
            <meshStandardMaterial color={config.shirt} />
          </mesh>
          <mesh position={[0, 0.12, 0]}>
            <cylinderGeometry args={[0.18, 0.2, 0.2, 20]} />
            <meshStandardMaterial color={config.pants} />
          </mesh>
        </group>
      )}
    </group>
  );
}
