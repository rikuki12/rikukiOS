import Phaser from "phaser";
import { SCENES } from "@/game/scenes/keys";
import { EventBus } from "@/game/systems/EventBus";
import { MITCHELLEN_HOTSPOTS } from "@/game/data/hotspots";
import type { Hotspot } from "@/game/types/room";

export class MitchellenDigitalServicesScene extends Phaser.Scene {
  private offPortalActivate: (() => void) | null = null;

  constructor() {
    super({ key: SCENES.MITCHELLEN });
  }

  create() {
    const { width, height } = this.scale;

    this.cameras.main.setBackgroundColor("#0a0e0a");

    const grid = this.add.graphics();
    grid.lineStyle(1, 0x1f3a1f, 0.6);
    for (let x = 0; x <= width; x += 64) grid.lineBetween(x, 0, x, height);
    for (let y = 0; y <= height; y += 64) grid.lineBetween(0, y, width, y);

    const frame = this.add.graphics();
    frame.lineStyle(2, 0xd4af37, 0.8);
    frame.strokeRect(20, 20, width - 40, height - 40);

    this.add
      .text(width / 2, 60, "MITCHELLEN DIGITAL SERVICES", {
        fontFamily: "monospace",
        fontSize: "24px",
        color: "#d4af37",
      })
      .setOrigin(0.5);

    this.spawnArchitect(1500, 540);
    MITCHELLEN_HOTSPOTS.forEach((h) => this.spawnHotspot(h));
    this.spawnBackPortal(width / 2, height - 140);
    this.subscribeToHudNavigation();

    EventBus.emit("scene:ready", { sceneKey: SCENES.MITCHELLEN });
  }

  private spawnArchitect(x: number, y: number) {
    const rect = this.add
      .rectangle(x, y, 32, 32, 0x4a8aff)
      .setOrigin(0.5);
    rect.setStrokeStyle(2, 0xffffff);
    this.add
      .text(x, y + 28, "ARCHITECT", {
        fontFamily: "monospace",
        fontSize: "11px",
        color: "#4a8aff",
      })
      .setOrigin(0.5);
    this.add
      .text(x, y + 44, "// idle", {
        fontFamily: "monospace",
        fontSize: "9px",
        color: "#6b8a6b",
      })
      .setOrigin(0.5);
  }

  private spawnHotspot(spot: Hotspot) {
    const rect = this.add
      .rectangle(spot.x, spot.y, spot.width, spot.height, 0x0d130d)
      .setOrigin(0.5);
    rect.setStrokeStyle(2, 0xd4af37);

    this.add
      .text(spot.x, spot.y + spot.height / 2 + 14, spot.label, {
        fontFamily: "monospace",
        fontSize: "11px",
        color: "#d4af37",
      })
      .setOrigin(0.5);

    rect.setInteractive({ useHandCursor: true });

    rect.on("pointerover", () => {
      rect.setFillStyle(0x1f3a1f);
      EventBus.emit("hotspot:hover", { id: spot.id, label: spot.label });
    });
    rect.on("pointerout", () => {
      rect.setFillStyle(0x0d130d);
      EventBus.emit("hotspot:leave", { id: spot.id });
    });
    rect.on("pointerdown", () => {
      EventBus.emit("hotspot:activate", { id: spot.id });
    });
  }

  private spawnBackPortal(x: number, y: number) {
    const rect = this.add
      .rectangle(x, y, 220, 48, 0x0d130d)
      .setOrigin(0.5);
    rect.setStrokeStyle(2, 0x4ade80);
    this.add
      .text(x, y, "← APEX COMMAND", {
        fontFamily: "monospace",
        fontSize: "14px",
        color: "#4ade80",
      })
      .setOrigin(0.5);

    rect.setInteractive({ useHandCursor: true });
    rect.on("pointerover", () => rect.setStrokeStyle(2, 0xd4af37));
    rect.on("pointerout", () => rect.setStrokeStyle(2, 0x4ade80));
    rect.on("pointerdown", () => {
      EventBus.emit("scene:transition", {
        from: SCENES.MITCHELLEN,
        to: SCENES.APEX,
      });
      this.scene.start(SCENES.APEX);
    });
  }

  private subscribeToHudNavigation() {
    this.offPortalActivate = EventBus.on(
      "portal:activate",
      ({ targetSceneKey }) => {
        if (!targetSceneKey) return;
        if (!this.scene.isActive()) return;
        if (targetSceneKey === SCENES.MITCHELLEN) return;
        EventBus.emit("scene:transition", {
          from: SCENES.MITCHELLEN,
          to: targetSceneKey,
        });
        this.scene.start(targetSceneKey);
      },
    );
    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
      this.offPortalActivate?.();
      this.offPortalActivate = null;
    });
  }
}
