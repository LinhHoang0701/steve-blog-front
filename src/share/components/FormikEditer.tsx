import { makeStyles } from '@material-ui/core';
import { Editor } from '@tinymce/tinymce-react';
import { useField } from 'formik';
import React from 'react';

interface EditorFieldProps {
  label?: string;
  name: string;
}
const useStyles = makeStyles((theme) => ({
  error: {
    color: 'red !important',
    marginTop: '10px',
  },
}));

function FormikEditer(props: EditorFieldProps) {
  const { label, name, ...otherProps } = props;
  const [field, meta] = useField(name);
  const type = 'text';
  const handleEditorChange = (value: string) => {
    field.onChange({ target: { type, name, value } });
  };

  const handleBlur = () => {
    field.onBlur({ target: { name } });
  };
  const classes = useStyles();
  return (
    <>
      {label && <label>{label}</label>}
      <Editor
        {...otherProps}
        apiKey="jb12i6p3jdt0oeipnd0l60gym5ehjx8t67dt4t49tcci14h8"
        init={{
          height: 500,
          menubar: false,
          plugins: [
            'advlist autolink lists link image charmap print preview anchor',
            'searchreplace visualblocks code fullscreen',
            'insertdatetime media table paste code help wordcount',
          ],
          toolbar:
            'undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media template link anchor codesample | ltr rtl',
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
        }}
        value={field.value}
        onEditorChange={handleEditorChange}
        onBlur={handleBlur}
      ></Editor>
      {meta.touched && meta.error ? <div className={classes.error}>{meta.error}</div> : null}
    </>
  );
}

export default FormikEditer;
