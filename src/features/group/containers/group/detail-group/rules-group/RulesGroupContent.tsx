import React from 'react';
import { Box, Typography, Paper, Button, Divider } from '@mui/material';
import { useOutletContext } from 'react-router-dom';
import {Group} from '../../../../../../interface/interface.ts'

const RulesGroupContent: React.FC = () => {
  const context = useOutletContext<{ group: Group }>(); // Lấy dữ liệu từ Outlet context

  console.log("Context in RulesContent: ", context); // Kiểm tra xem context có dữ liệu hay không

  const { group } = context;

  if (!group) {
    return <div>Không tìm thấy dữ liệu nhóm.</div>; // Xử lý khi không có dữ liệu
  }

  return (
    <Box sx={{
      padding: 2,
      backgroundColor: '#e9e9e9',
      height: '60vh',
      overflowY: 'auto',
      scrollbarWidth: 'none',
      '&::-webkit-scrollbar': {
        display: 'none',
      }
    }}>
      <Paper sx={{ padding: 2 }}>
        {group.rule.map((rule, index) => (
          <Box key={index} sx={{ marginBottom: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Quy định {index + 1}</Typography>
            <Typography variant="body1" sx={{ marginBottom: 1 }}>
              {rule}
            </Typography>
            {index < group.rule.length - 1 && <Divider sx={{ marginY: 2 }} />}
          </Box>
        ))}
        <Button variant="contained" color="primary">Cập nhật</Button>
      </Paper>
    </Box>
  );
};

export default RulesGroupContent;
