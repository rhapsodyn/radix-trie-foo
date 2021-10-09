export class ArrayTree implements Tree {
  private _db: string[];

  constructor() {
    this._db = [];
  }

  insert(str: string): void {
    this._db.push(str);
  }

  delete(str: string): boolean {
    throw new Error("Method not implemented.");
  }

  lookup(str: string): boolean {
    return this._db.indexOf(str) !== -1;
  }
}
