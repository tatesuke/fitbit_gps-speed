export class Page {

  protected elem: Element;

  constructor(elem: Element) {
    this.elem = elem;
  }

  public show() {
    (this.elem as any).style.display = "inline";
  }

  public hide() {
    (this.elem as any).style.display = "none";
  }

  public onClick(callback: (e: MouseEvent) => any) {
    this.elem.addEventListener("click", (e) => {
      callback(e);
    });
  }


}
