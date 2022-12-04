// @ts-check

export default class Aniaml {
  constructor() {
    this.animals = ['dog', 'cat', 'chiken'];
  }

  showAnimals() {
    this.animals.map((value) => console.log(value));
  }
}
