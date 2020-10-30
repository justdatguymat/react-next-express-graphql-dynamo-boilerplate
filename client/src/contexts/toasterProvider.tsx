import React, { createContext, useContext } from 'react';
import { Grow, Snackbar, SnackbarOrigin } from '@material-ui/core';
import { Alert } from 'components/Alert';
import { TransitionProps } from '@material-ui/core/transitions/transition';

const AUTOHIDE_DURATION = 6000;

type Severity = 'info' | 'warning' | 'success' | 'error';

interface ToasterContextInterface {
  success(message: string): void;
  warn(message: string): void;
  error(message: string): void;
  info(message: string): void;
}

interface ToasterProviderProps {
  autoHideDuration?: number;
}

const GrowTransition = (props: TransitionProps) => {
  return <Grow {...props} />;
};

export const ToasterContext: React.Context<ToasterContextInterface> = createContext<
  ToasterContextInterface
>({} as ToasterContextInterface);
export const useToaster = (): ToasterContextInterface => useContext(ToasterContext);

const ToasterProvider: React.FC<ToasterProviderProps> = ({
  children,
  autoHideDuration = AUTOHIDE_DURATION,
}) => {
  const [open, setOpen] = React.useState(false);
  const [severity, setSeverity] = React.useState<Severity>('info');
  const [message, setMessage] = React.useState('');
  const [anchor] = React.useState<SnackbarOrigin>({
    horizontal: 'center',
    vertical: 'bottom',
  });

  const handleClose = (_event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const invokeToast = (severity: Severity, message: string) => {
    console.log('TOASTER', severity, message);
    setMessage(message);
    setSeverity(severity);
    setOpen(true);
  };

  const toast: ToasterContextInterface = {
    success: (message) => invokeToast('success', message),
    warn: (message) => invokeToast('warning', message),
    error: (message) => invokeToast('error', message),
    info: (message) => invokeToast('info', message),
  };

  return (
    <ToasterContext.Provider value={toast}>
      <div style={{ width: '100%', height: '100%', position: 'absolute' }}>
        <Snackbar
          open={open}
          onClose={handleClose}
          autoHideDuration={autoHideDuration}
          anchorOrigin={anchor}
          TransitionComponent={GrowTransition}
          key={message}
        >
          <Alert onClose={handleClose} severity={severity}>
            {message}
          </Alert>
        </Snackbar>
      </div>
      {children}
    </ToasterContext.Provider>
  );
};

export default ToasterProvider;
