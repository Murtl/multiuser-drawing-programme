/**
 * Benutzerdefinierter Type für ein Menüelement im Popup-Menü
 */
type CustomMenuItem = {
  render: () => HTMLLIElement | HTMLHRElement;
};

/**
 * Klasse für ein Popup-Menü
 */
export class PopupMenu {
  private readonly menuElement: HTMLUListElement;
  private readonly menuItems: CustomMenuItem[] = [];

  constructor() {
    this.menuElement = document.createElement('ul');
    /**
     * Event-Listener, um clicks, die innerhalb des Menüs stattfinden, nicht weiter zu propagieren
     */
    this.menuElement.addEventListener('click', (event) => {
      event.stopPropagation();
    });
    this.menuElement.classList.add('popup-menu');

    /**
     * Event-Listener, um das Popup-Menü zu verstecken, wenn der Benutzer außerhalb des Menüs ein Kontextmenü öffnet
     */
    document.addEventListener(
      'contextmenu',
      this.closePopupMenuHandler.bind(this),
      true
    );

    /**
     * Event-Listener, um das Popup-Menü zu verstecken, wenn der Benutzer außerhalb des Menüs klickt
     */
    document.addEventListener(
      'click',
      this.closePopupMenuHandler.bind(this),
      true
    );
  }

  /**
   * Zeigt das Popup-Menü an der angegebenen Position
   * @param x - x-Koordinate
   * @param y - y-Koordinate
   */
  show(x: number, y: number): void {
    this.styleMenuElement(x, y);
    for (const menuItem of this.menuItems) {
      this.menuElement.appendChild(menuItem.render());
    }
    document.body.appendChild(this.menuElement);
  }

  /**
   * Erstellt ein Menüelement mit dem angegebenen Text und Klick-Handler
   * @param itemText - text des Menüelements
   * @param onClick - Klick-Handler
   */
  createMenuItem(
    itemText: string,
    onClick: (menuElement?: PopupMenu) => void
  ): CustomMenuItem {
    const menuItem = document.createElement('li');
    menuItem.textContent = itemText;
    menuItem.addEventListener('click', () => {
      onClick(this);
    });
    return {
      render: () => menuItem,
    };
  }

  /**
   * Erstellt einen Trenner für das Popup-Menü in Form eines li-Elements
   */
  createSeparator(): CustomMenuItem {
    const separator = document.createElement('hr');
    return {
      render: () => separator,
    };
  }

  /**
   * Erstellt ein Menüelement mit Radio-Buttons
   * @param itemText - text des Menüelements
   * @param options - Optionen für die Radio-Buttons
   * @param currentOption - aktuelle Option
   * @param onChange - Änderungs-Handler
   */
  createRadioOption(
    itemText: string,
    options: { [key: string]: string },
    currentOption?: string,
    onChange?: (option: string, menuElement?: PopupMenu) => void
  ): CustomMenuItem {
    const menuItem = document.createElement('li');
    const label = document.createElement('label');
    label.textContent = itemText;
    menuItem.appendChild(label);
    for (const option in options) {
      const radio = document.createElement('input');
      radio.type = 'radio';
      radio.name = itemText;
      radio.value = option;
      radio.checked = option === currentOption;
      radio.addEventListener('change', () => {
        currentOption = option;
        if (onChange) {
          onChange(option, this);
        }
      });
      const radioLabel = document.createElement('label');
      radioLabel.textContent = options[option];
      menuItem.appendChild(radio);
      menuItem.appendChild(radioLabel);
    }
    return {
      render: () => menuItem,
    };
  }

  /**
   * Fügt ein Menüelement zum Popup-Menü hinzu
   * @param menuItem - neues Menüelement, das hinzugefügt werden soll
   */
  addMenuItem(menuItem: CustomMenuItem): void {
    if (this.menuItems.indexOf(menuItem) === -1) {
      this.menuItems.push(menuItem);
    }
  }

  /**
   * Fügt mehrere Menüelemente zum Popup-Menü hinzu
   * @param menuItems - neue Menüelemente, die hinzugefügt werden sollen
   */
  addMenuItems(...menuItems: CustomMenuItem[]): void {
    for (const menuItem of menuItems) {
      this.addMenuItem(menuItem);
    }
  }

  /**
   * Fügt ein Menüelement an einer bestimmten Position im Popup-Menü hinzu
   * @param menuItem - Menüelement, das hinzugefügt werden soll
   * @param index - Position, an der das Menüelement hinzugefügt werden soll
   * Achtung: Auch die "Separator" werden als Menüelemente gezählt
   */
  addMenuItemAt(menuItem: CustomMenuItem, index: number): void {
    if (this.menuItems.indexOf(menuItem) === -1) {
      this.menuItems.splice(index, 0, menuItem);
    }
  }

  /**
   * Entfernt ein Menüelement aus dem Popup-Menü
   * @param menuItem - Menüelement, das entfernt werden soll
   */
  removeMenuItem(menuItem: CustomMenuItem): void {
    const index = this.menuItems.indexOf(menuItem);
    if (index !== -1) {
      this.menuItems.splice(index, 1);
    }
  }

  /**
   * Versteckt das Popup-Menü
   */
  hide(): void {
    this.menuElement.replaceChildren();
    document.body.removeChild(this.menuElement);
  }

  /**
   * Stylt das Popup-Menü
   * @param x - x-Koordinate
   * @param y - y-Koordinate
   */
  private styleMenuElement(x: number, y: number): void {
    this.menuElement.style.position = 'fixed';
    this.menuElement.style.left = x + 'px';
    this.menuElement.style.top = y + 'px';
    this.menuElement.style.backgroundColor = 'white';
    this.menuElement.style.border = '1px solid black';
    this.menuElement.style.padding = '2px';
    this.menuElement.style.margin = '0';
    this.menuElement.style.boxShadow = '2px 2px 5px black';
    this.menuElement.style.listStyleType = 'none';
  }

  /**
   * Event-Handler, um das Popup-Menü zu verstecken, wenn der Benutzer außerhalb des Menüs klickt/contextmenu
   * @param e - Event
   */
  private closePopupMenuHandler(e: Event): void {
    if (
      e.target !== this.menuElement &&
      this.menuElement.parentNode !== null &&
      !this.menuElement.contains(e.target as Node)
    ) {
      e.preventDefault();
      e.stopPropagation();
      this.hide();
    }
  }
}
