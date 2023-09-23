export default class GameBoard {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  cursorY: number;

  constructor(width: number, height: number) {
    this.canvas = null;
    this.ctx = null;
    this.cursorY = null;

    this.createCanvas(width, height);
  }

  private createCanvas(width: number, height: number) {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    this.ctx = ctx;
    this.canvas = canvas;

    canvas.width = width;
    canvas.height = height;

    canvas.addEventListener("mousemove", e => {
      this.cursorY = e.clientY;
    });
  }

  renderCanvas() {
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.strokeStyle = "white";

    this.ctx.beginPath();
    this.ctx.setLineDash([10]);
    this.ctx.moveTo(this.canvas.width / 2, 0);
    this.ctx.lineTo(this.canvas.width / 2, this.canvas.height);
    this.ctx.stroke();
  }

  initCanvas() {
    this.renderCanvas();

    document.body.innerHTML = "";
    document.body.appendChild(this.canvas);
  }
}
