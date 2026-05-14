import type { EventMap, EventName } from "@/game/types/events";

type Handler<P> = (payload: P) => void;

class TypedEventBus {
  private listeners = new Map<EventName, Set<Handler<unknown>>>();

  on<K extends EventName>(event: K, handler: Handler<EventMap[K]>): () => void {
    const set = (this.listeners.get(event) ?? new Set()) as Set<Handler<unknown>>;
    set.add(handler as Handler<unknown>);
    this.listeners.set(event, set);
    return () => this.off(event, handler);
  }

  off<K extends EventName>(event: K, handler: Handler<EventMap[K]>): void {
    this.listeners.get(event)?.delete(handler as Handler<unknown>);
  }

  emit<K extends EventName>(event: K, payload: EventMap[K]): void {
    const set = this.listeners.get(event);
    if (!set) return;
    for (const handler of set) {
      (handler as Handler<EventMap[K]>)(payload);
    }
  }

  clear(): void {
    this.listeners.clear();
  }
}

export const EventBus = new TypedEventBus();
