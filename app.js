class TypeWritter {
  constructor(textElement, words, waitTime = 3000) {
    this.textElement = textElement;
    this.words = words;
    this.text = '';
    this.waitTime = parseInt(waitTime, 10);
    this.wordIndex = 0;
    this.type();
    this.isDeleting = false;
  }

  type() {
    const currentIndex = this.wordIndex % this.words.length;

    const currentWordText = this.words[currentIndex];

    if (this.isDeleting) {
      this.text = currentWordText.substring(0, this.text.length - 1);
    } else {
      this.text = currentWordText.substring(0, this.text.length + 1);
    }

    this.textElement.innerHTML = `<span class="text">${this.text}</span>`;

    let typeSpeed = 300;
    if (this.isDeleting) {
      typeSpeed /= 2;
    }

    if (!this.isDeleting && this.text == currentWordText) {
      typeSpeed = this.waitTime;
      this.isDeleting = true;
    } else if (this.isDeleting && this.text == '') {
      this.isDeleting = false;
      this.wordIndex++;
      typeSpeed = 500;
    }

    setTimeout(() => {
      this.type();
    }, typeSpeed);
  }
}

const init = () => {
  const textElement = document.querySelector('.text-effect');
  const words = JSON.parse(textElement.getAttribute('data-words'));
  const waitTime = textElement.getAttribute('data-wait');
  new TypeWritter(textElement, words, waitTime);
};

document.addEventListener('DOMContentLoaded', init);
