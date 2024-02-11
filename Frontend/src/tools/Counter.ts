export default class Counter {
  counter: HTMLDivElement;
  counterValue: HTMLSpanElement;

  constructor() {
    this.counter = null;
    this.counterValue = null;

    this.createCounter();
  }

  countAfterScore(value: number) {
    document.body.appendChild(this.counter);

    return new Promise<true>(resolve => {
      this.counterValue.innerText = value.toString();

      let counter = value - 1;

      const index = setInterval(() => {
        if (counter <= 0) {
          clearInterval(index);
          resolve(true);
          this.counter.remove();
        }

        this.counterValue.innerText = counter.toString();
        counter--;
      }, 1000);
    });
  }

  private createCounter() {
    const counter = document.createElement("div");
    counter.className = "counter";

    const counterValue = document.createElement("span");
    counterValue.className = "counterValue";

    counter.appendChild(counterValue);

    this.counter = counter;
    this.counterValue = counterValue;
  }
}
