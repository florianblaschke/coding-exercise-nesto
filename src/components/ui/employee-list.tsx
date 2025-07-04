import type { Employee } from '@/lib/classes';

export function EmployeeList({ employees }: { employees: Employee[] }) {
  return (
    <ul className="space-y-2">
      <h2 className="pb-2 font-semibold">Employees of BestFood Company</h2>
      {employees.map((e) => (
        <li className="font-light text-sm" key={e.name}>
          * {e.name}
        </li>
      ))}
    </ul>
  );
}
