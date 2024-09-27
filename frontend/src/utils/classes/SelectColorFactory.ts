export class SelectColorFactory {
  /**
   * Die Farbe, die für das Auswählen von Shapes verwendet wird.
   * Default ist schwarz
   */
  private static selectColor: string = '#000000';

  /**
   * Gibt die aktuelle Farbe für das Auswählen von Shapes zurück
   */
  public static getSelectColor(): string {
    return this.selectColor;
  }

  /**
   * Setzt die Farbe für das Auswählen von Shapes
   * @param selectColor - Die Farbe, die für das Auswählen von Shapes verwendet werden soll
   */
  public static setSelectColor(selectColor: string) {
    this.selectColor = selectColor;
  }
}
