import { Box } from '@material-ui/core';
import Loader from 'react-loader-spinner';

const Loading = () => {
  return (
    <Box style={{ textAlign: 'center' }}>
      <Loader type="Oval" color="#00BFFF" height={80} width={80} />
    </Box>
  );
};

export default Loading;
