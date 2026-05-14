import Phaser from "phaser";
import { SCENES } from "@/game/scenes/keys";
import { EventBus } from "@/game/systems/EventBus";

export class BootScene extends Phaser.Scene {
  constructor() {
    super({ key: SCENES.BOOT });
  }

  create() {
    this.registry.set("hom:version", "v1");
    EventBus.emit("scene:ready", { sceneKey: SCENES.BOOT });
    this.scene.start(SCENES.PRELOAD);
  }
}
