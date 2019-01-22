/**
 * Exports the class Hero
 */
export class Hero {
  /**
   * Classmember id to store the id of the hero.
   */
  id: number;
  /**
   * Classmember name to store the name of the hero.
   */
  name: string;

  /**
   * Constructor for heroes.
   * Needs id and name of the hero to create one.
   * @param id The id of the hero.
   * @param name The name of the hero.
   */
  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }
}
