function Word(x, y, vx, text) {
  this.x = x;
  this.y = y;
  this.vx = vx;
  this.text = text;
  this.element = document.createElement("div");
  this.element.innerHTML = `<span class="word">${this.text}</span>`;
  document.querySelector("body").appendChild(this.element);
}

Word.prototype.update = function updateWord() {
  this.x += this.vx;
  this.element.style.transform = `translate(${this.x}px, ${this.y}px)`;
};
