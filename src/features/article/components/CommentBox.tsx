import {
  Avatar,
  Button,
  CircularProgress,
  Divider,
  FormControl,
  ListItem,
  ListItemAvatar,
  ListItemText,
  makeStyles,
  NativeSelect,
  TextField,
  Typography,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { isLoggedInSelector } from 'features/auth/authSlice';
import { getUser, selectUser } from 'features/setting/settingSlice';
import { FormEvent, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import {
  commentList,
  commentRequest,
  commentTextValue,
  getCommentText,
  hideCommentInput,
  isLoadingCmt,
  isShowCmtInput,
  showComment,
  showCommentInput,
  toggleComment,
} from '../articleSlice';
import { CommentItem } from './CommentItem';
const useStyle = makeStyles((theme) => ({
  container: {
    position: 'fixed',
    top: '0',
    right: '0px',
    width: '400px',
    minHeight: '100vh',
    maxHeight: '100%',
    backgroundColor: 'white',
    overflowY: 'scroll',
    paddingTop: '70px',
    boxShadow: 'inset 1px 0px 0px 0px rgba(0, 0, 0, 0.2)',
    transition: 'all 0.5s ease-in-out',
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
  },
  inputBox: {
    border: '1px solid #e8dfec',
    borderRadius: '10px',
    boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 2px 8px 0 rgba(0, 0, 0, 0.19)',
    overflow: 'hidden',
    margin: '15px auto 0px',
    display: 'flex',
    flexDirection: 'column',
    transition: 'height 0.5s ease-in-out',
    padding: '10px 20px',
    backgroundColor: 'white',
  },
  btnGroup: {
    marginTop: '30px',
    display: 'flex',
    justifyContent: 'flex-end',
  },
  content: {
    padding: '20px 30px',
  },
  closeBtn: {
    '&:hover': {
      opacity: '1',
      backgroundColor: '#e8dfec',
      borderRadius: '50%',
    },
    opacity: '0.7',
    cursor: 'pointer',
    padding: '5px',
    fontSize: '40px',
  },
  formControl: {
    minWidth: 120,
    textDecoration: 'none',
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));
interface PropsType {
  slug: string;
}
export const CommentBox = (props: PropsType) => {
  const classes = useStyle();
  const history = useHistory();
  const dispatch = useAppDispatch();
  const isShowComment = useAppSelector(showComment);
  const isLoadingComment = useAppSelector(isLoadingCmt);
  const isShowInput = useAppSelector(isShowCmtInput);
  const commentValues = useAppSelector(commentTextValue);
  const currentUser = useAppSelector(selectUser);
  const comments = useAppSelector(commentList);
  const isLoggedIn = useAppSelector(isLoggedInSelector);
  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);
  const toggle = () => {
    dispatch(toggleComment());
  };
  const handleCancel = () => {
    dispatch(hideCommentInput());
  };
  const handleSubmitComment = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isLoggedIn) {
      history.push('/auth');
    }
    if (commentValues.trim() === '') {
      dispatch(hideCommentInput());
      return;
    }
    dispatch({
      type: commentRequest.type,
      payload: { slug: props.slug, data: commentValues },
    });
  };
  if (!comments) {
    return <h1>Loading...</h1>;
  }
  return (
    <div className={classes.container} style={{ right: !isShowComment ? '-600px' : '0px' }}>
      <div className={classes.content}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6">{`Responses (${comments.length})`}</Typography>
          <CloseIcon onClick={toggle} className={classes.closeBtn} />
        </div>
        <form className={classes.inputBox} onSubmit={handleSubmitComment}>
          {isShowInput && isLoggedIn && (
            <ListItem style={{ padding: '0', marginBottom: '5px' }}>
              <ListItemAvatar>
                <Avatar src={currentUser?.image && currentUser.image} />
              </ListItemAvatar>
              <ListItemText primary={currentUser?.username} />
            </ListItem>
          )}
          <TextField
            placeholder="What are your thoughts?"
            multiline
            fullWidth
            InputProps={{ disableUnderline: true }}
            value={commentValues}
            onChange={(e: any) => dispatch(getCommentText(e.target.value))}
            onClick={() => dispatch(showCommentInput())}
          />
          {isShowInput && (
            <div className={classes.btnGroup}>
              <Button onClick={handleCancel} style={{ textTransform: 'none' }}>
                Cancel
              </Button>
              <Button
                disabled={isLoadingComment}
                type="submit"
                variant="contained"
                color="primary"
                style={{ borderRadius: '25px', marginLeft: '5px', textTransform: 'none' }}
              >
                {isLoadingComment ? <CircularProgress size={14} /> : 'Respond'}
              </Button>
            </div>
          )}
        </form>
      </div>
      <div className={classes.content}>
        <FormControl className={classes.formControl}>
          <NativeSelect className={classes.selectEmpty} name="sortBy" disableUnderline>
            <option value="most-relevant" defaultChecked>
              Most Relevant
            </option>
            <option value="newest">Most Recent</option>
          </NativeSelect>
        </FormControl>
      </div>
      <Divider />
      <div className={classes.content}>
        {comments.map((item: CommentType) => (
          <CommentItem key={item.id} commentData={item} slug={props.slug} />
        ))}
      </div>
    </div>
  );
};
