import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import './../../src/index.css';
import { selectAllTransactions } from 'redux/transactions/selectors';
import { selectToken } from 'redux/auth/selectors';
import { fetchAllTransactions } from 'redux/transactions/operations';
import { fetchDeleteTransactions } from 'redux/transactions/operations';
import { setAuthHeader } from 'redux/auth/operations';

export const TransactionsList = () => {
  const dispatch = useDispatch();
  const transactions = useSelector(selectAllTransactions);
  const token = useSelector(selectToken);

  useEffect(() => {
    if (token) {
      setAuthHeader(token);

      dispatch(fetchAllTransactions());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const getTransactionType = type => {
    return type === 'EXPENSE' ? '-' : '+';
  };

  const getCategory = categoryId => {
    switch (categoryId) {
      case 'c9d9e447-1b83-4238-8712-edc77b18b739':
        return 'Main Expenses';
      case '27eb4b75-9a42-4991-a802-4aefe21ac3ce':
        return 'Products';
      case 'bbdd58b8-e804-4ab9-bf4f-695da5ef64f4':
        return 'Self care';
      case '3caa7ba0-79c0-40b9-ae1f-de1af1f6e386':
        return 'Car';
      case '76cc875a-3b43-4eae-8fdb-f76633821a34':
        return 'Child care';
      case '128673b5-2f9a-46ae-a428-ec48cf1effa1':
        return 'Household products';
      case '1272fcc4-d59f-462d-ad33-a85a075e5581':
        return 'Education';
      case 'c143130f-7d1e-4011-90a4-54766d4e308e':
        return 'Leisure';
      case '719626f1-9d23-4e99-84f5-289024e437a8':
        return 'Other expenses';
      case '3acd0ecd-5295-4d54-8e7c-d3908f4d0402':
        return 'Entertainment';
      case '063f1132-ba5d-42b4-951d-44011ca46262':
        return 'Income';
      default:
        return;
    }
  };

  return (
    <>
      <div className="main">
        <table className="transactionsTable">
          <thead>
            <tr>
              <th className="cell">Date</th>
              <th className="cell">Type</th>
              <th className="cell">Category</th>
              <th className="cell">Comment</th>
              <th className="cell textAlignL">Sum</th>
              <th className="cell"></th>
            </tr>
          </thead>
          <tbody>
            <TransitionGroup>
              {transactions.map(transaction => {
                return (
                  <CSSTransition
                    key={transaction.id}
                    timeout={500}
                    classNames="item"
                  >
                    <tr>
                      <td>{transaction.transactionDate}</td>
                      <td>{getTransactionType(transaction.type)}</td>
                      <td>{getCategory(transaction.categoryId)}</td>
                      <td>{transaction.comment}</td>
                      <td>{transaction.amount}</td>
                      <td>
                        <button className="edit">I</button>
                        <button
                          type="button"
                          className="button button--small"
                          onClick={() =>
                            dispatch(fetchDeleteTransactions(transaction.id))
                          }
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  </CSSTransition>
                );
              })}
            </TransitionGroup>
          </tbody>
        </table>
      </div>
    </>
  );
};
