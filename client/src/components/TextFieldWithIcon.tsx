import React, { InputHTMLAttributes } from 'react';
import {
  Box,
  Grid,
  TextField,
  InputAdornment,
  IconButton,
  TextFieldProps,
  useTheme,
} from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';

type TextFieldWithIconProps = InputHTMLAttributes<HTMLInputElement> &
  TextFieldProps & {
    icon: React.ReactElement;
    password?: boolean;
    loading?: boolean;
  };

const usePasswordProps = (show: boolean, onClick: () => void) => ({
  type: show ? 'text' : 'password',
  InputProps: {
    endAdornment: (
      <InputAdornment aria-label="toggle password visibility" onClick={onClick} position="end">
        <IconButton style={{ opacity: '0.7' }}>
          {show ? <Visibility /> : <VisibilityOff />}
        </IconButton>
      </InputAdornment>
    ),
  },
});

const TextFieldWithIcon: React.FC<TextFieldWithIconProps> = ({
  icon = null,
  password = false,
  helperText = ' ',
  ...props
}) => {
  const theme = useTheme();
  const [showPassword, setShowPassword] = React.useState(false);

  const passwordProps = password
    ? usePasswordProps(showPassword, () => setShowPassword((prev) => !prev))
    : {};

  return (
    <Box my={1}>
      <Grid container alignItems="flex-start">
        <Grid item xs={2}>
          <Box p={1}>{icon}</Box>
        </Grid>
        <Grid item xs={10}>
          <TextField
            {...props}
            {...passwordProps}
            variant={theme.inputVariant}
            InputLabelProps={{ required: false }}
            helperText={helperText ? helperText : ' '}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default TextFieldWithIcon;
