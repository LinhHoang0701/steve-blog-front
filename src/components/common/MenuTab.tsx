import { Box, makeStyles } from '@material-ui/core';
import { blue } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    display: 'flex',
    [theme.breakpoints.down('md')]: {
      textAlign: 'center',
    },
    [theme.breakpoints.down('lg')]: {
      padding: '0 24px',
    },
    [theme.breakpoints.down('xs')]: {
      padding: '0',
    },
  },
  item: {
    cursor: 'pointer',
    marginRight: '20px',
    fontSize: '1.3rem',
    [theme.breakpoints.down('xs')]: {
      width: '50%',
      marginRight: '0',
    },
  },
  itemActive: {
    borderBottom: '2px solid',
    borderBottomColor: blue[500],
    cursor: 'pointer',
    marginRight: '20px',
    fontSize: '1.3rem',
    [theme.breakpoints.down('xs')]: {
      width: '50%',
      marginRight: '0',
    },
  },
}));

interface Props {
  option: number;
  handleDisplay: (choose: number) => void;
  tab1: string;
  tab2: string;
}

const MenuTab: React.FC<Props> = ({ option, handleDisplay, tab1, tab2 }) => {
  const classes = useStyles();
  const local: any = localStorage.getItem('user');
  const curUser = JSON.parse(local);

  const handleClick = (value: number) => {
    handleDisplay(value);
  };

  return (
    <Box className={classes.root} width="100%">
      <Box
        className={option === 0 ? classes.itemActive : classes.item}
        onClick={() => handleClick(0)}
      >
        {tab1}
      </Box>
      {curUser && (
        <Box
          className={option === 1 ? classes.itemActive : classes.item}
          onClick={() => handleClick(1)}
        >
          {tab2}
        </Box>
      )}
    </Box>
  );
};

export default MenuTab;
