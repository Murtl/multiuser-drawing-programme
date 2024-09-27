import { ShapeView } from '../interfaces-types/typesShapes';
import { IShapeEvent } from '../interfaces-types/customShapeEvents';

/**
 * Ein EventFan, der Events an verschiedene ShapeViews (listener) weiterleitet
 */
export class EventFan {
  private listeners: ShapeView[];

  constructor() {
    this.listeners = [];
  }

  /**
   * Registriert einen neuen Listener
   * @param newListener - Der neue Listener
   */
  register(newListener: ShapeView) {
    this.listeners.push(newListener);
  }

  /**
   * Entfernt einen Listener
   * @param listener - Der zu entfernende Listener
   */
  unregister(listener: ShapeView) {
    this.listeners = this.listeners.filter((l) => l !== listener);
  }

  /**
   * Wendet die Events auf alle Listener an
   * @param events - Die Events, die angewendet werden sollen
   */
  applyEvents(events: IShapeEvent[]): this {
    this.listeners.forEach((listener) => listener.applyEvents(events));
    return this;
  }
}
