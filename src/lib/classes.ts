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

  /**
   * I am not sure what the expected behaviour might be in prod. Currently this would fail silently and forces
   * TS into an optional check. Maybe it is better to throw an Error…
   */
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
    const directMatch = this.stores.find((a) => a.getName() === arg);
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

  getStoreNames() {
    const result: string[] = [];

    for (const store of this.stores) {
      result.push(store.getName());
    }

    for (const area of this.areas) {
      result.push(...area.getStoreNames());
    }

    return result;
  }

  getEmployees() {
    const result: Employee[] = [];

    for (const store of this.stores) {
      result.push(...store.getEmployees());
    }

    for (const area of this.areas) {
      result.push(...area.getEmployees());
    }

    return result;
  }

  getEmployee(name: string): Employee | undefined {
    const allEmployees = this.getEmployees();

    return allEmployees.find((e) => e.name === name);
  }
}

/**
 * Don’t know how I feel about this – helps with naming but currently it is the same as RootNode
 * Maybe if the Headquarter gets unique methods this would make more sense
 */
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

/**
 * For this exercise I chose the simple approach to just store the actual string time.
 * This works for this project, on larger scale save it as Date and maybe already sort them by month/day
 */
export interface Shift {
  from: string;
  to: string;
}

export interface Employee {
  name: string;
  shifts?: Shift[];
}

export class Store {
  private name: string;
  private employees: Employee[];

  constructor(name: string) {
    this.name = name;
    this.employees = [];
  }

  getName() {
    return this.name;
  }

  addEmployee(name: string) {
    this.employees.push({ name });
    return this;
  }

  getEmployees() {
    return this.employees;
  }

  addShifts({ name, shifts }: { name: string; shifts: Shift[] }) {
    const employee = this.employees.find((e) => e.name === name);
    const filteredShifts = filterDuplicates(shifts, employee?.shifts ?? []);

    if (employee?.shifts) {
      employee.shifts.push(...filteredShifts);
    } else if (employee) {
      employee.shifts = filteredShifts;
    }

    return this;
  }
}

/**
 * This is a bit hacky. React Strict Mode renders twice and pushes the shift two times, so I
 * make a quick duplicate check. In prod this should be handled differently. E.g. unique Ids generated
 * with the timestamp or check the actual Date and compare the timeslot via date-fns isSameDay and/or isWithinInterval
 */
function filterDuplicates(newShifts: Shift[], oldShifts: Shift[]) {
  const cleanedShifts: Shift[] = [];

  for (const shift of newShifts) {
    const slotTaken = oldShifts.some(
      (s) => JSON.stringify(s) === JSON.stringify(shift)
    );
    if (!slotTaken) {
      cleanedShifts.push(shift);
    }
  }

  return cleanedShifts;
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

bestFoodCompany
  .getStore('Hamburg')
  ?.addShifts({
    name: 'Claus',
    shifts: [{ from: '8:00', to: '16:00' }],
  })
  .addShifts({ name: 'Claire', shifts: [{ from: '10:00', to: '14:00' }] });

bestFoodCompany
  .getStore('Karlsruhe')
  ?.addShifts({
    name: 'Daisy',
    shifts: [{ from: '12:00', to: '20:00' }],
  })
  .addShifts({
    name: 'Daniel',
    shifts: [
      { from: '11:00', to: '13:00' },
      { from: '15:00', to: '21:00' },
    ],
  });

bestFoodCompany.getStore('Stuttgart')?.addShifts({
  name: 'Emil',
  shifts: [{ from: '13:00', to: '23:00' }],
});

bestFoodCompany.getStore('München')?.addShifts({
  name: 'Fred',
  shifts: [{ from: '12:00', to: '18:00' }],
});

export { bestFoodCompany };
