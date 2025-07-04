import './App.css';

import { EmployeeList } from './components/ui/employee-list';
import { StoreTable } from './components/ui/store-table';
import { TimeTable } from './components/ui/time-table';
import { bestFoodCompany } from './lib/classes';

function App() {
  const employees = bestFoodCompany.getEmployees();

  const hamburg = bestFoodCompany.getStore('Hamburg');
  const karlsruhe = bestFoodCompany.getStore('Karlsruhe');
  const stuttgart = bestFoodCompany.getStore('Stuttgart');
  const münchen = bestFoodCompany.getStore('München');

  return (
    <>
      <div className="flex w-full justify-between p-8">
        <EmployeeList employees={employees} />

        <div className="space-y-2">
          {hamburg && <StoreTable store={hamburg} />}
          {karlsruhe && <StoreTable store={karlsruhe} />}
          {stuttgart && <StoreTable store={stuttgart} />}
          {münchen && <StoreTable store={münchen} />}
        </div>
      </div>
      <TimeTable />
    </>
  );
}

export default App;
