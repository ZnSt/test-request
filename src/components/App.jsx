import { LogInForm } from './LogInForm';
import { AddTransactions } from './AddTransactions';
import { TransactionsList } from './TransactionsList';

export const App = () => {
  return (
    <div>
      <LogInForm />
      <AddTransactions />
      <TransactionsList />
    </div>
  );
};
