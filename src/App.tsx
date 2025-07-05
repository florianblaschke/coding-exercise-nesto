import './App.css';

import { EmployeeList } from './components/employee-list';
import { StoreTable } from './components/store-table';
import { TimeTable } from './components/time-table';
import { bestFoodCompany } from './lib/classes';

function App() {
  const employees = bestFoodCompany.getEmployees();

  return (
    <>
      <div className="flex w-full justify-between p-8">
        <EmployeeList employees={employees} />

        <div className="space-y-2">
          <StoreTable storeName={'Hamburg'} />
          <StoreTable storeName={'Karlsruhe'} />
          <StoreTable storeName={'Stuttgart'} />
          <StoreTable storeName={'München'} />
        </div>
      </div>
      <TimeTable />
    </>
  );
}

export default App;
