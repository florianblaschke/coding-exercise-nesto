export class RootNode {
  private name: string;
  private areas: Area[];
  private stores: Store[];

  constructor(name: string) {
    this.name = name;
    this.areas = [];
    this.stores = [];
  }

  addArea(args: AreaProps) {
    this.areas.push(new Area(args));
    return this;
  }

  getArea(arg: string): Area | undefined {
    const directMatch = this.areas.find((a) => a.name === arg);
    if (directMatch) {
      return directMatch;
    }

    if (this.areas.length) {
      for (const area of this.areas) {
        const match = area.getArea(arg);

        if (match) {
          return match;
        }
      }
    }
  }

  addStore(name: string) {
    this.stores.push(new Store(name));
    return this;
  }

  getStore(arg: string): Store | undefined {
    const directMatch = this.stores.find((a) => a.name === arg);
    if (directMatch) {
      return directMatch;
    }

    if (this.areas.length) {
      for (const area of this.areas) {
        const match: Store | undefined = area.getStore(arg);

        if (match) {
          return match;
        }
      }
    }
  }

  getEmployees() {
    const result: string[] = [];

    for (const store of this.stores) {
      result.push(...store.getEmployees());
    }

    for (const area of this.areas) {
      result.push(...area.getEmployees());
    }

    return result;
  }
}

class Headquarter extends RootNode {}

interface AreaProps {
  name: string;
  manager: string;
}

export class Area extends RootNode {
  manager: string;

  constructor({ manager, name }: AreaProps) {
    super(name);
    this.manager = manager;
  }
}

export class Store {
  name: string;
  employees: string[];

  constructor(name: string) {
    this.name = name;
    this.employees = [];
  }

  addEmployee(name: string) {
    this.employees.push(name);
    return this;
  }

  getEmployees() {
    return this.employees;
  }
}

const bestFoodCompany = new Headquarter('BestFood Company').addArea({
  manager: 'Alice',
  name: 'Deutschland',
});

bestFoodCompany
  .getArea('Deutschland')
  ?.addArea({ name: 'Süd', manager: 'Bob' })
  .addStore('Hamburg');

bestFoodCompany
  .getArea('Süd')
  ?.addStore('Karlsruhe')
  .addStore('Stuttgart')
  .addStore('München');

bestFoodCompany.getStore('Hamburg')?.addEmployee('Claus').addEmployee('Claire');

bestFoodCompany
  .getStore('Karlsruhe')
  ?.addEmployee('Daisy')
  .addEmployee('Daniel');

bestFoodCompany.getStore('Stuttgart')?.addEmployee('Emil');
bestFoodCompany.getStore('München')?.addEmployee('Fred');

export { bestFoodCompany };
