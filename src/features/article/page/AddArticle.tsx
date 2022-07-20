import { Box, Button, Container, makeStyles } from '@material-ui/core';
import { postArticle } from 'features/articles/articlesSlice';
import { Field, Form, Formik } from 'formik';
import { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import FormikEditer from 'share/components/FormikEditer';
import FormikInput from 'share/components/FormikInput';
import * as Yup from 'yup';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import FormikTags from '../../../share/components/FormikTags';
import { getArticle, selectArticle, UpdateArticle } from '../articleSlice';

const useStyles = makeStyles((theme) => ({
  form: {
    marginTop: theme.spacing(3),
    minHeight: theme.spacing(100),
  },
  title: {
    marginTop: 15,
    marginBottom: 15,
    width: '100%',
  },
  button: {
    marginTop: 10,
    float: 'right',
    marginBottom: 20,
  },
  error: {
    color: 'red !important',
  },
  textEditer: {
    width: '100%',
    marginTop: 15,
    marginBottom: 15,
  },
}));

const validationSchema = Yup.object().shape({
  title: Yup.string().required('This field is required!'),
  body: Yup.string().required('This field is required!'),
  description: Yup.string().required('This field is required!'),
  tagList: Yup.array()
    .min(1, 'tagList must have at least 1 tag')
    .required('This field is required!'),
});

function AddArticle() {
  const { slug }: { slug: string } = useParams();
  const dispatch = useAppDispatch();
  const history = useHistory();
  const article: ArticleType = useAppSelector(selectArticle);
  const initialValues: FormInputArticleType = {
    title: slug ? (article.title ? article.title : '') : '',
    description: slug ? (article.description ? article.description : '') : '',
    body: slug ? (article.body ? article.body : '') : '',
    tagList: slug ? (article.tagList ? article.tagList : []) : [],
  };

  useEffect(() => {
    if (slug) {
      dispatch({
        type: getArticle.type,
        payload: slug,
      });
    }
  }, [dispatch, slug]);

  const onSubmit = (values: FormInputArticleType) => {
    if (slug) {
      dispatch({
        type: UpdateArticle.type,
        payload: { slug: slug, data: { article: values } },
      });
    } else {
      dispatch({
        type: postArticle.type,
        payload: { data: { article: values }, history },
      });
    }
  };

  const classes = useStyles();

  return (
    <Container component="main" maxWidth="md">
      <Formik
        enableReinitialize
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({ isValid, dirty }) => {
          return (
            <Form className={classes.form}>
              <Box>
                <Box className={classes.title}>
                  <Field label="Article Title" name="title" as={FormikInput} />
                </Box>
                <Box className={classes.title}>
                  <Field label="What's this article about?" name="description" as={FormikInput} />
                </Box>
                <Box className={classes.textEditer}>
                  <FormikEditer name="body" />
                </Box>
                <Box>
                  <Field name="tagList" component={FormikTags} />
                </Box>
                <Box className={classes.button}>
                  <Button
                    variant="contained"
                    color="primary"
                    disabled={!isValid || !dirty}
                    type="submit"
                  >
                    Publish Article
                  </Button>
                </Box>
              </Box>
            </Form>
          );
        }}
      </Formik>
    </Container>
  );
}

export default AddArticle;
