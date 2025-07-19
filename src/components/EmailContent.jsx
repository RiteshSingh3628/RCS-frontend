import React from 'react';
import { Typography, Button, MenuItem, Select, TextField } from '@mui/material';

const EmailContent = () => {
  const [template, setTemplate] = React.useState('default');
  return (
    <div className="bg-white p-6 rounded-lg shadow max-w-2xl mx-auto">
      <Typography variant="h6" className="mb-4">Send Feedback Requests</Typography>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Recipient Emails</label>
          <TextField
            multiline
            rows={3}
            placeholder="Enter emails separated by commas"
            fullWidth
            variant="outlined"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email Template</label>
          <Select
            value={template}
            onChange={e => setTemplate(e.target.value)}
            fullWidth
            variant="outlined"
          >
            <MenuItem value="default">Default Feedback Request</MenuItem>
            <MenuItem value="followup">Follow-up Feedback Request</MenuItem>
            <MenuItem value="custom">Custom Template</MenuItem>
          </Select>
        </div>
        <div className="flex justify-end">
          <Button variant="contained" color="primary">Send Emails</Button>
        </div>
      </div>
    </div>
  );
};

export default EmailContent; 