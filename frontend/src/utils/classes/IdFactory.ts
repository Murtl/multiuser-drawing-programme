import { v4 as uuidv4 } from 'uuid';

/**
 * Klasse zur Erzeugung von eindeutigen IDs
 */
export class IDFactory {
  private static prefix: string;

  /**
   * Erzeugt eine neue eindeutige ID
   */
  public static getNewId(): string {
    return `${IDFactory.prefix}#${uuidv4()}`;
  }

  /**
   * Setzt den Präfix für die IDs
   * @param prefix - Präfix für die IDs
   */
  public static setPrefix(prefix: string) {
    this.prefix = prefix;
  }
}
