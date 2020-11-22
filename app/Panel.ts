export class Panel {

  protected elem: Element;

  constructor(elem: Element) {
    this.elem = elem;
  }

  get x() {
    return (this.elem as any).x;
  }
  set x(x: number) {
    (this.elem as any).x = x; // TODO as anyやめる
  }
  get y() {
    return (this.elem as any).y;
  }
  set y(y: number) {
    (this.elem as any).y = y; // TODO as anyやめる
  }

  get width():number {
    return (this.elem as any).width;
  }

  set width(width: number) {
    (this.elem as any).width = width;
  }
  
  get height():number {
    return (this.elem as any).height;
  }

  set height(height: number) {
    (this.elem as any).height = height;
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

  public onMouseDown(callback: (e: MouseEvent) => any) {
    this.elem.addEventListener("mousedown", (e) => {
      callback(e);
    });
  }

  public onMouseUp(callback: (e: MouseEvent) => any) {
    this.elem.addEventListener("mouseup", (e) => {
      callback(e);
    });
  }

  public onMouseMove(callback: (e: MouseEvent) => any) {
    this.elem.addEventListener("mousemove", (e) => {
      callback(e);
    });
  }


}
