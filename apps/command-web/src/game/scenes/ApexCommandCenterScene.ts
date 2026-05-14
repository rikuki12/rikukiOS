import Phaser from "phaser";
import { SCENES } from "@/game/scenes/keys";
import { EventBus } from "@/game/systems/EventBus";
import { APEX_PORTALS } from "@/game/data/portals";
import { APEX_HOTSPOTS } from "@/game/data/hotspots";
import type { Hotspot, Portal } from "@/game/types/room";

const BOSS_SPEED = 240;
const BOSS_SIZE = 32;
const ROOM_PADDING = 40;

type WASDKeys = {
  W: Phaser.Input.Keyboard.Key;
  A: Phaser.Input.Keyboard.Key;
  S: Phaser.Input.Keyboard.Key;
  D: Phaser.Input.Keyboard.Key;
};

export class ApexCommandCenterScene extends Phaser.Scene {
  private boss!: Phaser.GameObjects.Rectangle;
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private wasd!: WASDKeys;

  constructor() {
    super({ key: SCENES.APEX });
  }

  create() {
    const { width, height } = this.scale;

    this.drawBackground(width, height);
    this.drawRoomTitle(width);

    APEX_PORTALS.forEach((p) => this.spawnPortal(p));
    APEX_HOTSPOTS.forEach((h) => this.spawnHotspot(h));

    this.spawnBoss(width / 2, height - 220);
    this.setupInput();

    EventBus.emit("scene:ready", { sceneKey: SCENES.APEX });
  }

  update(_time: number, delta: number) {
    if (!this.boss) return;
    const step = (BOSS_SPEED * delta) / 1000;
    let dx = 0;
    let dy = 0;
    if (this.cursors.left?.isDown || this.wasd.A.isDown) dx -= 1;
    if (this.cursors.right?.isDown || this.wasd.D.isDown) dx += 1;
    if (this.cursors.up?.isDown || this.wasd.W.isDown) dy -= 1;
    if (this.cursors.down?.isDown || this.wasd.S.isDown) dy += 1;
    if (dx !== 0 && dy !== 0) {
      const inv = 1 / Math.SQRT2;
      dx *= inv;
      dy *= inv;
    }
    if (dx === 0 && dy === 0) return;
    const nx = Phaser.Math.Clamp(
      this.boss.x + dx * step,
      ROOM_PADDING,
      this.scale.width - ROOM_PADDING,
    );
    const ny = Phaser.Math.Clamp(
      this.boss.y + dy * step,
      ROOM_PADDING,
      this.scale.height - ROOM_PADDING,
    );
    if (nx !== this.boss.x || ny !== this.boss.y) {
      this.boss.setPosition(nx, ny);
      EventBus.emit("boss:move", { x: nx, y: ny });
    }
  }

  private drawBackground(width: number, height: number) {
    this.cameras.main.setBackgroundColor("#0a0e0a");
    const grid = this.add.graphics();
    grid.lineStyle(1, 0x1f3a1f, 0.6);
    for (let x = 0; x <= width; x += 64) grid.lineBetween(x, 0, x, height);
    for (let y = 0; y <= height; y += 64) grid.lineBetween(0, y, width, y);

    const frame = this.add.graphics();
    frame.lineStyle(2, 0xd4af37, 0.8);
    frame.strokeRect(20, 20, width - 40, height - 40);
  }

  private drawRoomTitle(width: number) {
    this.add
      .text(width / 2, 60, "APEX COMMAND CENTER", {
        fontFamily: "monospace",
        fontSize: "24px",
        color: "#d4af37",
      })
      .setOrigin(0.5);
  }

  private spawnPortal(portal: Portal) {
    const locked = portal.status === "locked";
    const idleColor = locked ? 0x2f7a3f : 0x4ade80;
    const idleLabelColor = locked ? "#6b8a6b" : "#4ade80";

    const rect = this.add
      .rectangle(portal.x, portal.y, portal.width, portal.height, 0x0d130d)
      .setOrigin(0.5);
    rect.setStrokeStyle(2, idleColor);
    if (locked) rect.setAlpha(0.6);

    const label = this.add
      .text(portal.x, portal.y + portal.height / 2 + 14, portal.label, {
        fontFamily: "monospace",
        fontSize: "12px",
        color: idleLabelColor,
      })
      .setOrigin(0.5);

    if (locked) {
      this.add
        .text(portal.x, portal.y, "LOCKED", {
          fontFamily: "monospace",
          fontSize: "10px",
          color: "#6b8a6b",
        })
        .setOrigin(0.5);
    }

    rect.setInteractive({ useHandCursor: true });

    rect.on("pointerover", () => {
      rect.setStrokeStyle(2, 0xd4af37);
      label.setColor("#d4af37");
      EventBus.emit("portal:hover", { id: portal.id, label: portal.label });
    });
    rect.on("pointerout", () => {
      rect.setStrokeStyle(2, idleColor);
      label.setColor(idleLabelColor);
      EventBus.emit("portal:leave", { id: portal.id });
    });
    rect.on("pointerdown", () => {
      EventBus.emit("portal:activate", {
        id: portal.id,
        targetSceneKey: portal.targetSceneKey ?? "",
      });
      if (portal.targetSceneKey) {
        EventBus.emit("scene:transition", {
          from: SCENES.APEX,
          to: portal.targetSceneKey,
        });
        this.scene.start(portal.targetSceneKey);
      }
    });
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

  private spawnBoss(x: number, y: number) {
    this.boss = this.add
      .rectangle(x, y, BOSS_SIZE, BOSS_SIZE, 0xd4af37)
      .setOrigin(0.5);
    this.boss.setStrokeStyle(2, 0xffffff);
  }

  private setupInput() {
    const kb = this.input.keyboard;
    if (!kb) return;
    this.cursors = kb.createCursorKeys();
    this.wasd = kb.addKeys("W,A,S,D") as WASDKeys;
  }
}
