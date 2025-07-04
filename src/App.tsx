import './App.css';

import { EmployeeList } from './components/ui/employee-list';
import { bestFoodCompany } from './lib/classes';

function App() {
  const employees = bestFoodCompany.getEmployees();

  return (
    <div className="p-8">
      <EmployeeList employees={employees} />
    </div>
  );
}

export default App;
