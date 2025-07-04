import { useState } from 'react';
import { bestFoodCompany, type Shift } from '@/lib/classes';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './select';

export function TimeTable() {
  const [store, setStore] = useState('Hamburg');

  const stores = bestFoodCompany.getStoreNames();
  const selectedStore = bestFoodCompany.getStore(store);

  const grid = Array.from({ length: 25 }).map((_e, i) => (i === 24 ? 0 : i));

  return (
    <section className="p-8">
      <Select onValueChange={setStore} value={store}>
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {stores.map((s) => (
            <SelectItem key={s} value={s}>
              {s}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <div className="flex w-[1500px] justify-between divide-x p-4 ">
        {grid.map((hour) => (
          <span className="flex w-full items-center justify-center" key={hour}>
            {hour}
          </span>
        ))}
      </div>
      {selectedStore?.getEmployees().map((employee, index) => (
        <div className="relative w-full px-4" key={employee.name}>
          {employee.shifts?.map((shift) => (
            <TimeSlot
              index={index}
              key={shift.from}
              name={employee.name}
              shift={shift}
            />
          ))}
        </div>
      ))}
    </section>
  );
}

function TimeSlot({
  shift,
  name,
  index,
}: {
  index: number;
  shift: Shift;
  name: string;
}) {
  const { from, to } = shift;

  const start = timeToPx(from);
  const end = timeToPx(to);
  const rowHeight = 40;

  return (
    <div
      className="absolute rounded bg-gray-700 pl-8 text-sm text-white"
      style={{
        left: start,
        width: end - start,
        top: index * rowHeight,
      }}
    >
      {name}
    </div>
  );
}

function timeToPx(time: string) {
  const [hours, minutes] = time.split(':');

  return Number(hours) * 60 + (60 / 100) * Number(minutes);
}
