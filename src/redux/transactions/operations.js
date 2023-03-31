import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

axios.defaults.baseURL = `https://wallet.goit.ua/`;

export const setAuthHeader = token => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = '';
};

export const fetchAllTransactions = createAsyncThunk(
  'transactions/fetchAll',
  async (_, thunkAPI) => {
    try {
      await thunkAPI.dispatch(fetchAllCategories());
      const response = await axios.get('/api/transactions');
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchAddTransactions = createAsyncThunk(
  'transactions/fetchAdd',
  async (credentials, thunkAPI) => {
    console.log(credentials);
    try {
      const response = await axios.post('/api/transactions', credentials);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchDeleteTransactions = createAsyncThunk(
  'transactions/fetchDelete',
  async (transactionId, thunkAPI) => {
    console.log(transactionId);
    try {
      const response = await axios.delete(`/api/transactions/${transactionId}`);
      console.log(response);
      if (response.status === 200) {
        return transactionId;
      } else {
        return;
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchAllCategories = createAsyncThunk(
  'categories/get',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('api/transaction-categories');
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
