import React from 'react';
import { Box, Typography, Paper, Button, Divider } from '@mui/material';

const rules = [
  {
    title: "Rule No 1",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
  },
  {
    title: "Rule No 2",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
  },
  {
    title: "Rule No 3",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
  },
  {
    title: "Rule No 4",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
  },
  {
    title: "Rule No 5",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
  },
  {
    title: "Rule No 6",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
  },
];

const RulesContent: React.FC = () => {
  return (
    <Box sx={{ padding: 2, backgroundColor: '#e9e9e9', height: '60vh',
      overflowY: 'auto', 
      scrollbarWidth: 'none',
      '&::-webkit-scrollbar': {
        display: 'none',
      } }}>
      <Paper sx={{ padding: 2 }}>
        {rules.map((rule, index) => (
          <Box key={index} sx={{ marginBottom: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{rule.title}</Typography>
            <Typography variant="body1" sx={{ marginBottom: 1 }}>
              {rule.description}
            </Typography>
            {index < rules.length - 1 && <Divider sx={{ marginY: 2 }} />}
          </Box>
        ))}
        <Button variant="contained" color="primary">Cập nhật</Button>
      </Paper>
    </Box>
  );
};

export default RulesContent;

