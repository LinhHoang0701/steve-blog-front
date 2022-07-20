import React from 'react';
import { ErrorMessage, FieldAttributes, useField } from 'formik';
import { Box, TextField } from '@material-ui/core';

type FormikInputProps = {
  label: string;
  type?: string;
  multiline?: boolean;
  minsRow?: number;
  maxsRow?: number;
} & FieldAttributes<{}>;

const FormikInput: React.FC<FormikInputProps> = ({
  label,
  type = 'text',
  multiline = false,
  minsRow,
  maxsRow,
  ...props
}) => {
  const [field] = useField(props);

  return (
    <>
      <TextField
        label={label}
        {...field}
        type={type}
        multiline={multiline}
        minRows={minsRow}
        maxRows={maxsRow}
        variant="outlined"
        autoComplete="off"
        fullWidth
      />
      <ErrorMessage
        name={field.name}
        render={(message) => <Box style={{ color: 'red', marginTop: '10px' }}>{message}</Box>}
      />
    </>
  );
};

export default FormikInput;
