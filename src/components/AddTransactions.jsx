import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectAllCategories } from 'redux/transactions/selectors';
import { fetchAddTransactions } from 'redux/transactions/operations';

export const AddTransactions = () => {
  const dispatch = useDispatch();
  const categories = useSelector(selectAllCategories);

  const [type, setType] = useState('');
  const [transactionDate, setTransactionDate] = useState('');
  const [amountNumber, setAmountNumber] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [comment, setComment] = useState('');

  const handleSubmit = event => {
    event.preventDefault();
    console.log('type', type);
    console.log('date', transactionDate);
    console.log('amountNumber', amountNumber);
    console.log('categoryId', categoryId);
    console.log('comment', comment);
    const amount = Number(amountNumber);
    dispatch(
      fetchAddTransactions({
        type,
        transactionDate,
        categoryId,
        amount,
        comment,
      })
    );
  };

  const handleChange = event => {
    const { name, value } = event.target;

    switch (name) {
      case 'type':
        setType(value);
        break;

      case 'transactionDate':
        setTransactionDate(value);
        break;

      case 'amount':
        setAmountNumber(value);
        break;

      case 'categoryId':
        setCategoryId(value);
        break;

      case 'comment':
        setComment(value);
        break;

      default:
        return;
    }
  };
  return (
    <>
      <h2>Create Transaction</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '30px' }}>
        <input type="text" name="type" value={type} onChange={handleChange} />
        <label htmlFor="email">Date</label>
        <input
          type="date"
          name="transactionDate"
          value={transactionDate}
          required
          onChange={handleChange}
        />
        <label htmlFor="password">categoryId</label>
        <select name="categoryId" onChange={handleChange}>
          {categories.map(category => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <label htmlFor="email">Amount</label>
        <input
          type="number"
          name="amount"
          required
          value={amountNumber}
          onChange={handleChange}
        />
        <input
          type="text"
          name="comment"
          value={comment}
          onChange={handleChange}
        />
        <button type="submit">Submit</button>
      </form>
    </>
  );
};
