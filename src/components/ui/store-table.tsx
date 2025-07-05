import { bestFoodCompany } from '@/lib/classes';

export function StoreTable({ storeName }: { storeName: string }) {
  const store = bestFoodCompany.getStore(storeName);

  if (!store) {
    return null;
  }

  return (
    <ul className="space-y-2 pb-2">
      <h2 className="font-semibold">Time table {store.name}:</h2>
      {store.getEmployees().map((e) => (
        <li className="font-light text-sm" key={e.name}>
          * {e.name}:{' '}
          {e.shifts?.map((s, index) => (
            <span key={s.to}>
              {' '}
              {`${s.from} – ${s.to}${index === (e.shifts && e.shifts?.length - 1) ? '' : ', '}`}
            </span>
          ))}
        </li>
      ))}
    </ul>
  );
}
