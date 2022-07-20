import {
  Avatar,
  Button,
  Divider,
  ListItem,
  ListItemAvatar,
  ListItemText,
  makeStyles,
  TextField,
} from '@material-ui/core';
import { useAppDispatch } from 'app/hooks';
import Moment from 'react-moment';
import { deleteComment } from '../articleSlice';
const useStyle = makeStyles(() => ({
  footer: {
    marginTop: '10px',
    display: 'flex',
    justifyContent: 'flex-end',
  },
  container: {
    marginTop: '10px',
    '& .MuiInputBase-root': {
      color: 'black',
    },
  },
}));
interface CommentItemProps {
  commentData: CommentType;
  slug: string;
}
export const CommentItem = (props: CommentItemProps) => {
  const classes = useStyle();
  const dispatch = useAppDispatch();
  const user: any = localStorage.getItem('user');
  const currentUser = JSON.parse(user);
  const handleDeleteComment = () => {
    dispatch({
      type: deleteComment.type,
      payload: { slug: props.slug, id: props.commentData.id },
    });
  };
  return (
    <div className={classes.container} key={props.commentData.id}>
      <ListItem style={{ padding: '0', marginBottom: '5px' }}>
        <ListItemAvatar>
          <Avatar src={props.commentData.author.image} />
        </ListItemAvatar>
        <ListItemText
          primary={props.commentData.author.username}
          secondary={<Moment fromNow>{props.commentData.createdAt}</Moment>}
        />
      </ListItem>
      <TextField
        disabled
        multiline
        fullWidth
        InputProps={{ disableUnderline: true }}
        value={props.commentData.body}
      />
      <div className={classes.footer}>
        {currentUser?.username === props.commentData.author.username && (
          <Button style={{ textTransform: 'none' }} onClick={handleDeleteComment}>
            Delete
          </Button>
        )}
      </div>
      <Divider style={{ marginTop: '10px' }} />
    </div>
  );
};
