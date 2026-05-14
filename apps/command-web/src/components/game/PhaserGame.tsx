"use client";

import { useEffect, useRef } from "react";
import type PhaserNS from "phaser";

export type PhaserGameProps = {
  scenes: PhaserNS.Types.Scenes.SceneType[];
  width?: number;
  height?: number;
  className?: string;
};

export function PhaserGame({
  scenes,
  width = 1920,
  height = 1080,
  className,
}: PhaserGameProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const gameRef = useRef<PhaserNS.Game | null>(null);

  useEffect(() => {
    let cancelled = false;

    void (async () => {
      const Phaser = (await import("phaser")).default;
      if (cancelled || !containerRef.current) return;

      const game = new Phaser.Game({
        type: Phaser.AUTO,
        parent: containerRef.current,
        width,
        height,
        backgroundColor: "#0a0e0a",
        pixelArt: true,
        scale: {
          mode: Phaser.Scale.FIT,
          autoCenter: Phaser.Scale.CENTER_BOTH,
        },
        scene: scenes,
      });
      gameRef.current = game;
    })();

    return () => {
      cancelled = true;
      gameRef.current?.destroy(true);
      gameRef.current = null;
    };
  }, [scenes, width, height]);

  return (
    <div
      ref={containerRef}
      className={className}
      data-testid="phaser-game-root"
    />
  );
}
