import React from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Box, makeStyles, TextField } from '@material-ui/core';
import { ErrorMessage, FieldInputProps, FormikProps } from 'formik';

interface Props {
  field: FieldInputProps<any>;
  form: FormikProps<any>;
}

const useStyles = makeStyles((theme) => ({
  error: {
    color: 'red !important',
  },
}));

function FormikTags({ field, form }: Props) {
  const handleKeyDown = (event: any) => {
    switch (event.key) {
      case ',':
      case 'enter': {
        event.preventDefault();
        event.stopPropagation();
        if (event.target.value.length > 0) {
          // form.setFieldValue("tagList", [...field.name, event.target.value]);
          form.setFieldValue('tagList', [...field.value, event.target.value]);
        }

        break;
      }
      default:
    }
  };

  const classes = useStyles();
  return (
    <Autocomplete
      {...field}
      multiple
      freeSolo
      id="tags-outlined"
      options={[]}
      getOptionLabel={(option) => option.title || option}
      onChange={(event, newValue) => form.setFieldValue(field.name, newValue)}
      filterSelectedOptions
      renderInput={(params: any) => {
        params.inputProps.onKeyDown = handleKeyDown;
        return (
          <>
            <TextField
              style={{ marginTop: '0px' }}
              name="tagList"
              {...params}
              variant="outlined"
              label="Enter tags"
              margin="normal"
              fullWidth
            />
            <Box className={classes.error}>
              <ErrorMessage name="tagList" />
            </Box>
          </>
        );
      }}
    />
  );
}

export default FormikTags;
