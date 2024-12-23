import React from 'react';
import { Box } from '@chakra-ui/react';

interface StyleProps {
  [key: string]: any;
}

interface ProgressBarProps extends StyleProps {
  value: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ value, ...props }) => {
  return (
    <Box width="100%" bg="gray.200" borderRadius="full" {...props}>
      <Box width={`${value}%`} bg="blue.500" height="4px" borderRadius="full" />
    </Box>
  );
};

export default ProgressBar;