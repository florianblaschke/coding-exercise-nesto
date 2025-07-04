export function EmployeeList({ employees }: { employees: string[] }) {
  return (
    <ul className="space-y-2">
      <h2 className="pb-2 font-semibold">Employees of BestFood Company</h2>
      {employees.map((e) => (
        <li className="font-light text-sm" key={e}>
          * {e}
        </li>
      ))}
    </ul>
  );
}
