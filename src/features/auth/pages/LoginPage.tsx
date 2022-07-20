import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { useAppDispatch } from 'app/hooks';
import { Field, Form, Formik } from 'formik';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as yup from 'yup';
import type { RootState } from '../../../app/store';
import FormikInput from '../../../share/components/FormikInput';
import { authActions } from '../authSlice';
// main
interface initialValuesType {
  username: string;
  email: string;
  password: string;
}
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    // borderRadius: '20px',
  },
  error: {
    color: 'red',
    marginTop: theme.spacing(3),
  },
}));

const LoginPage = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const { isRegister, error } = useSelector((state: RootState) => state.auth);
  const classes = useStyles();

  // Validate form with yup (dynamic when switch sign in and sign up mode)
  const formSchema = (isRegister: boolean) => {
    return yup.object({
      username: isRegister
        ? yup
            .string()
            .required('Username is required')
            .min(3, 'Username should be of minimum 3 characters')
        : yup.string(),
      email: yup.string().email('Enter a valid email').required('Email is required'),
      password: yup
        .string()
        .min(6, 'Password should be of minimum 6 characters length')
        .required('Password is required'),
    });
  };
  const [validationSchema, setValidationSchema] = useState(() => formSchema(isRegister));

  useEffect(() => {
    setValidationSchema(formSchema(isRegister));
  }, [isRegister]);
  //  initialValues
  const initialValues: initialValuesType = {
    username: '',
    email: '',
    password: '',
  };
  // Handle submit
  const submitHandler = async (values: any) => {
    let userInfo, endPoint;
    if (!isRegister) {
      userInfo = {
        email: values.email,
        password: values.password,
      };
      endPoint = 'users/login';
    } else {
      userInfo = {
        username: values.username,
        email: values.email,
        password: values.password,
      };
      endPoint = 'users';
    }
    dispatch(authActions.loginPending({ userInfo, endPoint }));
  };
  // switch sign in and sign up
  const switchAuthModeHandler = () => {
    history.push('/auth?action=' + (isRegister ? 'sign-in' : 'sign-up'));
    dispatch(authActions.switchAuthModeHandler());
    dispatch(authActions.loginFail(''));
  };
  // Handle error when sign in and sign up from server
  let errorMessage: any;
  if (error) {
    errorMessage = error;
    if (error.email) {
      errorMessage = `Email ${error.email}`;
    }
    if (error.username) {
      errorMessage = `Username ${error.username}`;
    }
    if (error.email && error.username) {
      errorMessage = `Username and email ${error.email}`;
    }
    if (error['email or password']) {
      errorMessage = `Email or password ${error['email or password']}`;
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {!isRegister ? 'Sign in' : 'Sign up'}
        </Typography>
        {errorMessage && <p className={classes.error}>{errorMessage}</p>}
        <Formik
          initialValues={initialValues}
          onSubmit={submitHandler}
          validationSchema={validationSchema}
        >
          {() => {
            return (
              <Form className={classes.form}>
                <Grid container spacing={2}>
                  {isRegister && (
                    <Grid item xs={12}>
                      <Field label="User Name" name="username" as={FormikInput} />
                    </Grid>
                  )}

                  <Grid item xs={12}>
                    <Field label="Email Address" name="email" as={FormikInput} />
                  </Grid>

                  <Grid item xs={12}>
                    <Field type="password" label="Password" name="password" as={FormikInput} />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  {!isRegister ? 'Sign In' : 'Sign Up'}
                </Button>
                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <button
                      type="reset"
                      style={{
                        color: '#1976d2',
                        cursor: 'pointer',
                        border: 'none',
                        background: 'transparent',
                      }}
                      onClick={switchAuthModeHandler}
                    >
                      {isRegister
                        ? 'Already have an account? Sign in'
                        : "Don't have an acount? Sign up"}
                    </button>
                  </Grid>
                </Grid>
              </Form>
            );
          }}
        </Formik>
      </div>
    </Container>
  );
};

export default LoginPage;
