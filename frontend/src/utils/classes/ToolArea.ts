import { ShapeFactory } from '../interfaces-types/typesShapes';

/**
 * Klasse für die ToolArea, die die Werkzeuge für die Zeichenfläche bereitstellt.
 */
export class ToolArea {
  private selectedShape: ShapeFactory | undefined;
  constructor(shapesSelector: ShapeFactory[], menue: Element) {
    const domElms: HTMLElement[] = [];
    shapesSelector.forEach((sl) => {
      const domSelElement = document.createElement('li');
      domSelElement.innerText = sl.label;
      menue.appendChild(domSelElement);
      domElms.push(domSelElement);

      domSelElement.addEventListener('click', () => {
        selectFactory.call(this, sl, domSelElement);
      });
    });

    const selectFactory = (sl: ShapeFactory, domElm: HTMLElement) => {
      // remove class from all elements
      for (let j = 0; j < domElms.length; j++) {
        domElms[j].classList.remove('marked');
      }
      this.selectedShape = sl;
      // add class to the one that is selected currently
      domElm.classList.add('marked');
    };
  }

  getSelectedShape(): ShapeFactory {
    return this.selectedShape as ShapeFactory;
  }
}
