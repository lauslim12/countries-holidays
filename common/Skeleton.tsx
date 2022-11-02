import { Box, Skeleton as MuiSkeleton } from '@mui/material';
import { memo } from 'react';

function Skeleton() {
  return (
    <Box component="section">
      <MuiSkeleton width="100%" />
      <MuiSkeleton width="100%" />
      <MuiSkeleton width="100%" />
      <MuiSkeleton width="100%" />
      <MuiSkeleton width="100%" />
      <MuiSkeleton width="100%" />
      <MuiSkeleton width="100%" />
      <MuiSkeleton width="100%" />
      <MuiSkeleton width="100%" />
      <MuiSkeleton width="100%" />
      <MuiSkeleton width="100%" />
      <MuiSkeleton width="100%" />
      <MuiSkeleton width="100%" />
      <MuiSkeleton width="100%" />
      <MuiSkeleton width="100%" />
      <MuiSkeleton width="100%" />
      <MuiSkeleton width="100%" />
      <MuiSkeleton width="100%" />
      <MuiSkeleton width="100%" />
      <MuiSkeleton width="100%" />
    </Box>
  );
}

export default memo(Skeleton);
