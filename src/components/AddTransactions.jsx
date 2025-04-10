import React, { useState } from "react";
import { Box, Button, MenuItem, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddTransactions = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    description: "",
    type: "",
    amount: null,
  });
  const [error, setError] = useState({
    description: "",
    type: "",
    amount: "",
  });

  const handleCancel = () => {
    navigate("/");
  };

  const validateForm = () => {
    let isValid = true;
    const newError = {
      description: "",
      type: "",
      amount: "",
    };

    if (!formData.description) {
      newError.description = "Description is required";
      isValid = false;
    }
    if (!formData.type) {
      newError.type = "Transaction type is required";
      isValid = false;
    }
    if (!formData.amount) {
      newError.amount = "Amount is required";
      isValid = false;
    }

    setError(newError);
    return isValid;
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setError((prevError) => ({
      ...prevError,
      [name]: "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
    const valid = validateForm();
    if (valid) {
        const response = await axios.post('http://localhost:8080/add', {
          description: formData.description,
          type: formData.type,
          amount: JSON.parse(formData.amount),
        });
        if (response.status === 201) {
          navigate("/");
        }
        setFormData({
          description: "",
          type: "",
          amount: 0,
        });
      setError({
        description: "",
        type: "",
        amount: "",
      });
    }
    } catch (error) {
      console.error("Error saving transaction:", error);
    }
  };
  return (
    <Box
      p={5}
      mt={5}
      width={500}
      margin="auto"
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Box mb={2} mt={5}>
        <Typography variant="h5">New Transaction</Typography>
      </Box>
      <form onSubmit={handleSubmit}>
        <TextField
          select
          label="Transaction Type"
          fullWidth
          value={formData.type}
          onChange={(e) => handleInputChange(e)}
          sx={{ mb: 2 }}
          error={!!error.type}
          helperText={error.type}
          name="type"
        >
          <MenuItem value="Credit">Credit</MenuItem>
          <MenuItem value="Debit">Debit</MenuItem>
        </TextField>
        <TextField
          label="Amount"
          fullWidth
          type="number"
          value={formData.amount}
          onChange={(e) => handleInputChange(e)}
          sx={{ mb: 2 }}
          error={!!error.amount}
          helperText={error.amount}
          name="amount"
        />
        <TextField
          label="Description"
          fullWidth
          value={formData.description}
          onChange={(e) => handleInputChange(e)}
          error={!!error.description}
          helperText={error.description}
          name="description"
          sx={{ mb: 2 }}
        />
        <Box display="flex" justifyContent="right">
          <Button type="submit" variant="outlined" color="primary">
            Save
          </Button>
          <Button
            variant="outlined"
            color="error"
            sx={{ ml: 2 }}
            onClick={handleCancel}
          >
            Cancel
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default AddTransactions;
