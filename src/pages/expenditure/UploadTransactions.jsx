import { useState, useRef } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { useBudget } from '../budget/BudgetContext';
import { UploadOutlined } from '@ant-design/icons';
import {useCreateExpenditures} from "../../api/graph";
import dayjs from "dayjs";

export default function AddTransactionDialog({ open, onClose }) {
  const { budget } = useBudget();
  const [transactions, setTransactions] = useState([{
    amount: '',
    date: new Date().toISOString().split('T')[0],
    name: '',
    method: '',
    budget_category: '',
    reward_category: '',
    comment: '',
    source: 'user'
  }]);
  const fileInputRef = useRef(null);
  const [createExpenditures] = useCreateExpenditures(transactions);

    const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
        const text = e.target.result;
        const lines = text.split('\n');
        const headers = lines[0].toLowerCase().split(',');

        const newTransactions = lines.slice(1)
            .filter(line => line.trim())
            .map(line => {
                const values = line.split(',');
                const transaction = {
                    amount: '',
                    date: new Date().toISOString().split('T')[0],
                    name: '',
                    method: '',
                    budget_category: '',
                    reward_category: '',
                    comment: '',
                    source: file.name,
                };

                headers.forEach((header, index) => {
                    const value = values[index]?.trim();
                    if (value) {
                        switch (header.trim()) {
                            case 'amount':
                                transaction.amount = parseFloat(value) || '';
                                break;
                            case 'date':
                                transaction.date = dayjs(value).toISOString().split('T')[0];
                                break;
                            case 'name':
                            case 'description':
                                transaction.name = value;
                                break;
                            case 'method':
                                transaction.method = value.toLowerCase();
                                break;
                            case 'budget_category':
                                transaction.budget_category = value;
                                break;
                            case 'reward_category':
                                transaction.reward_category = value.toLowerCase();
                                break;
                            case 'comment':
                                transaction.comment = value;
                                break;
                            default:
                                console.log("Header not valid: " + header);
                        }
                    }
                });
                return transaction;
            });

            setTransactions(newTransactions);
        };

        reader.readAsText(file);
        event.target.value = null;
    };

  const handleChange = (index, field, value) => {
    const newTransactions = [...transactions];
    newTransactions[index] = {
      ...newTransactions[index],
      [field]: value
    };
    setTransactions(newTransactions);
  };

  const addRow = () => {
    setTransactions([...transactions, {
      amount: '',
      date: new Date().toISOString().split('T')[0],
      name: '',
      method: '',
      budget_category: '',
      reward_category: '',
      comment: '',
      source: 'user'
    }]);
  };

  const removeRow = (index) => {
    setTransactions(transactions.filter((_, i) => i !== index));
  };

  const clearTransactions = () => {
      setTransactions([{
          amount: '',
          date: new Date().toISOString().split('T')[0],
          name: '',
          method: '',
          budget_category: '',
          reward_category: '',
          comment: '',
          source: 'user'
      }]);
  };

  const handleClose = () => {
      clearTransactions();
      onClose();
  };

  const handleSubmit = () => {
      let x = createExpenditures({ variables: { expenditures: transactions } });
      x.catch(
            (e) => {
                console.log(e)
                alert("Error: " + e.message)
            }
      )
      handleClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xl" fullWidth>
      <DialogTitle>Add Transactions</DialogTitle>
      <DialogContent>
        {transactions.map((transaction, index) => (
          <Stack direction="row" spacing={1} key={index} sx={{ mt: 2 }}>
            <TextField
              name="amount"
              label="Amount"
              type="number"
              value={transaction.amount}
              onChange={(e) => handleChange(index, 'amount', e.target.value)}
              sx={{ width: '10%' }}
            />
            <TextField
              name="date"
              label="Date"
              type="date"
              value={transaction.date}
              onChange={(e) => handleChange(index, 'date', e.target.value)}
              sx={{ width: '12%' }}
            />
            <TextField
              name="name"
              label="Name"
              value={transaction.name}
              onChange={(e) => handleChange(index, 'name', e.target.value)}
              sx={{ width: '15%' }}
            />
            <TextField
                name="method"
                label="Method"
                value={transaction.method}
                onChange={(e) => handleChange(index, 'method', e.target.value)}
                sx={{ width: '12%' }}
            />
            <FormControl sx={{ width: '15%' }}>
              <InputLabel>Budget Category</InputLabel>
              <Select
                name="budget_category"
                value={transaction.budget_category}
                onChange={(e) => handleChange(index, 'budget_category', e.target.value)}
                label="Budget Category"
              >
                {budget?.expenses?.map((expense) => (
                  <MenuItem key={expense.category} value={expense.category}>
                    {expense.category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl sx={{ width: '15%' }}>
              <InputLabel>Reward Category</InputLabel>
              <Select
                name="reward_category"
                value={transaction.reward_category}
                onChange={(e) => handleChange(index, 'reward_category', e.target.value)}
                label="Reward Category"
              >
                  <MenuItem value="">None</MenuItem>
                  <MenuItem value="DRUG_STORE">Drug Store</MenuItem>
                  <MenuItem value="ENTERTAINMENT">Entertainment</MenuItem>
                  <MenuItem value="FURNITURE">Furniture</MenuItem>
                  <MenuItem value="GAS">Gas</MenuItem>
                  <MenuItem value="GROCERY">Grocery</MenuItem>
                  <MenuItem value="HOME_IMPROVEMENT">Home Improvement</MenuItem>
                  <MenuItem value="HOTEL">Hotel</MenuItem>
                  <MenuItem value="PUBLIC_TRANSPORTATION">Public Transportation</MenuItem>
                  <MenuItem value="RECURRING_BILL">Recurring Bill</MenuItem>
                  <MenuItem value="RESTAURANT">Restaurant</MenuItem>
              </Select>
            </FormControl>
            <TextField
              name="comment"
              label="Comment"
              value={transaction.comment}
              onChange={(e) => handleChange(index, 'comment', e.target.value)}
              sx={{ width: '15%' }}
            />
            <IconButton
              onClick={() => removeRow(index)}
              disabled={transactions.length === 1}
            >
              <DeleteOutlined />
            </IconButton>
          </Stack>
        ))}
      </DialogContent>
      <DialogActions>
      <input
          type="file"
          accept=".csv"
          ref={fileInputRef}
          onChange={handleFileUpload}
          style={{ display: 'none' }}
      />
      <Button
          startIcon={<UploadOutlined />}
          onClick={() => fileInputRef.current.click()}
          size="small"
      >
          Upload CSV
      </Button>
        <Button
          startIcon={<PlusOutlined />}
          onClick={addRow}
        >
          Add Row
        </Button>
          <Button
              color="error"
              onClick={clearTransactions}
          >
              Clear All
          </Button>
        <Stack direction="row" spacing={1}>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">Save</Button>
        </Stack>
      </DialogActions>
    </Dialog>
  );
}