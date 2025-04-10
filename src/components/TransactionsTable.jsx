import React, { useEffect, useState } from "react";
import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const TransactionsTable = () => {
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState([]);

  const getTransactions = async () => {
    try {
      const response = await axios.get("http://localhost:8080/");
      const responseData = response.data;
      if (responseData.message == "success") {
        setTransactions(responseData.data);
      }
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  useEffect(() => {
    getTransactions();
  }, []);

  return (
    <Box p={3}>
      <Box
        display={"flex"}
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h5">Office Transactions</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => navigate("/add-transaction")}
        >
          Add Transaction
        </Button>
      </Box>
      <TableContainer>
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Credit</TableCell>
                    <TableCell>Debit</TableCell>
                    <TableCell>Running Balance</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {transactions.map((transaction, index) => (
                    <TableRow key={index}>
                        <TableCell>{new Date(transaction.date).toLocaleDateString()}</TableCell>
                        <TableCell>{transaction.description}</TableCell>
                        <TableCell>{transaction.type === 'Credit' ? transaction.amount : '-'}</TableCell>
                        <TableCell>{transaction.type === 'Debit' ? transaction.amount : '-'}</TableCell>
                        <TableCell>{transaction.balance}</TableCell>
                    </TableRow>
                ))}
                {transactions.length === 0 && (
                    <TableRow>
                        <TableCell colSpan={5} align="center">
                            No transactions available.
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default TransactionsTable;
