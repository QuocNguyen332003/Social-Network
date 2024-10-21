/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { Box, Typography, Paper, Button, Divider, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { useOutletContext } from 'react-router-dom';
import { Group } from '../../../../../../interface/interface.ts';
import axios from 'axios';
import { toast } from 'react-toastify';

const RulesGroupContent: React.FC = () => {
  const token = sessionStorage.getItem('token');
  const context = useOutletContext<{ group: Group; role: string; handleUpdateRules: (rules: string[]) => void }>(); // Nhận thêm role từ context
  const { group, role, handleUpdateRules } = context;

  const [openDialog, setOpenDialog] = useState(false);
  const [newRule, setNewRule] = useState('');
  const [rules, setRules] = useState<string[]>(group.rule);

  if (!group) {
    return <div>Không tìm thấy dữ liệu nhóm.</div>;
  }

  const handleUpdateRulesAPI = async () => {
    try {
      const response = await axios.put(`http://localhost:3000/v1/group/${group._id}/rules`, {
        rules: rules,
        userId: sessionStorage.getItem('userId'),
      },
      {
        headers: {
          Authorization: `Bearer ${token}`, // Thêm token vào header
        },
      });
      toast.success(response.data.message);
      handleUpdateRules(rules);
      setOpenDialog(false);
    } catch (error: any) {
      toast.error(error.response?.data.message || 'Có lỗi xảy ra khi cập nhật quy định.');
    }
  };

  const handleAddRule = () => {
    if (newRule.trim() !== '') {
      setRules((prevRules) => [...prevRules, newRule.trim()]);
      setNewRule('');
    }
  };

  const handleDeleteRule = (index: number) => {
    setRules((prevRules) => prevRules.filter((_, i) => i !== index));
  };

  return (
    <Box
      sx={{
        padding: 2,
        backgroundColor: '#e9e9e9',
        height: '60vh',
        overflowY: 'auto',
      }}
    >
      <Paper sx={{ padding: 2 }}>
        {rules.length > 0 ? (
          rules.map((rule, index) => (
            <Box key={index} sx={{ marginBottom: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                Quy định {index + 1}
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: 1 }}>
                {rule}
              </Typography>
              <Divider sx={{ marginY: 2 }} />
            </Box>
          ))
        ) : (
          <Typography variant="body1">Không có quy định nào.</Typography>
        )}
      </Paper>

      {role === 'owner' && (
        <Button variant="contained" color="primary" onClick={() => setOpenDialog(true)} sx={{ marginTop: 2 }}>
          Cập Nhật Quy Định
        </Button>
      )}

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle sx={{ textAlign: 'center', padding: 2 }}>Cập Nhật Quy Định Nhóm</DialogTitle>
        <DialogContent>
          {rules.length > 0 ? (
            rules.map((rule, index) => (
              <Box key={index} sx={{ marginBottom: 1 }}>
                <Typography sx={{ mb: 2 }} variant="body1">{`Quy định ${index + 1}: ${rule}`}</Typography>
                <Button variant="outlined" color="error" onClick={() => handleDeleteRule(index)}>
                  Xóa
                </Button>
                <Divider sx={{ marginY: 1 }} />
              </Box>
            ))
          ) : (
            <Typography variant="body1">Không có quy định nào.</Typography>
          )}
          <TextField
            autoFocus
            margin="dense"
            label="Thêm quy định mới"
            type="text"
            fullWidth
            variant="outlined"
            value={newRule}
            onChange={(e) => setNewRule(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Hủy</Button>
          <Button onClick={handleAddRule}>Thêm Quy Định</Button>
          <Button onClick={handleUpdateRulesAPI}>Cập Nhật Quy Định</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default RulesGroupContent;
