import { Box, makeStyles } from '@material-ui/core';
import PaginationComponent from 'components/common/PaginationComponent';

const useStyles = makeStyles({
  noArticle: {
    marginTop: '50px',
    marginLeft: '30px',
  },
});

interface ProfilePaginationProps {
  totalPage: number;
  pathName: string;
  tagByArticle: string | undefined;
}

const ProfilePagination: React.FC<ProfilePaginationProps> = ({
  totalPage,
  pathName,
  tagByArticle,
}) => {
  const classes = useStyles();
  return (
    <>
      {totalPage > 0 ? (
        <PaginationComponent
          pathName={pathName}
          totalPage={totalPage}
          tagByArticle={tagByArticle}
        />
      ) : (
        <Box className={classes.noArticle}>No Article To Show...</Box>
      )}
    </>
  );
};

export default ProfilePagination;
