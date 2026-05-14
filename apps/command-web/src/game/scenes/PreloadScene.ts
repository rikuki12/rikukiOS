import Phaser from "phaser";
import { SCENES } from "@/game/scenes/keys";
import { EventBus } from "@/game/systems/EventBus";

export class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: SCENES.PRELOAD });
  }

  preload() {
    this.cameras.main.setBackgroundColor("#0a0e0a");
    // V1 has no real assets yet. Higgsfield outputs will be registered
    // here via this.load.image/spritesheet and the bar below will
    // animate via this.load.on("progress", ...).
  }

  create() {
    const { width, height } = this.scale;

    this.add
      .text(width / 2, height / 2 - 30, "HOUSE OF MITCHELL", {
        fontFamily: "monospace",
        fontSize: "32px",
        color: "#d4af37",
      })
      .setOrigin(0.5);

    this.add
      .text(width / 2, height / 2 + 10, "Apex Command Center  ·  v1", {
        fontFamily: "monospace",
        fontSize: "14px",
        color: "#6b8a6b",
      })
      .setOrigin(0.5);

    const barWidth = 400;
    const barHeight = 10;
    const barX = (width - barWidth) / 2;
    const barY = height / 2 + 50;
    const outline = this.add
      .rectangle(barX, barY, barWidth, barHeight, 0x0d130d)
      .setOrigin(0, 0);
    outline.setStrokeStyle(1, 0x2f7a3f);
    this.add
      .rectangle(
        barX + 1,
        barY + 1,
        barWidth - 2,
        barHeight - 2,
        0x4ade80,
      )
      .setOrigin(0, 0);

    EventBus.emit("scene:ready", { sceneKey: SCENES.PRELOAD });

    this.time.delayedCall(700, () => {
      EventBus.emit("scene:transition", {
        from: SCENES.PRELOAD,
        to: SCENES.APEX,
      });
      this.scene.start(SCENES.APEX);
    });
  }
}
