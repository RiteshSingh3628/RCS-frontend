import React from 'react';
import { Typography } from '@mui/material';
import ArchiveIcon from '@mui/icons-material/Archive';

const ArchiveContent = () => (
  <div className="bg-white p-6 rounded-lg shadow">
    <Typography variant="h6" className="mb-4">Archived Feedback</Typography>
    <div className="bg-gray-100 p-8 rounded-lg text-center">
      <ArchiveIcon className="mx-auto h-12 w-12 text-gray-400" />
      <Typography variant="body1" className="mt-2 text-gray-500">
        No archived feedback yet
      </Typography>
    </div>
  </div>
);

export default ArchiveContent; 