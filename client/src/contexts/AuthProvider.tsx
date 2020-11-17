import React, { createContext, useContext } from 'react';
import { User, LoginInput, RegisterInput } from 'codegen/graphql-request';
import { SDK as newSDK } from 'lib/graphql-request';
import Loading from 'components/Loading';
import { extractFormErrors } from 'utils/errorHandlers';
import { useToaster } from './ToasterProvider';

const SDK = newSDK();

export type AuthOperationResult<T = undefined> = {
  user?: User;
  error?: T;
  message?: string;
};

interface AuthContextInterface {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (input: LoginInput) => Promise<AuthOperationResult<LoginInput>>;
  register: (input: RegisterInput) => Promise<AuthOperationResult<RegisterInput>>;
  logout: () => Promise<boolean>;
}
interface AuthProviderProps {
  authUser?: User;
}

export const AuthContext: React.Context<AuthContextInterface> = createContext<AuthContextInterface>(
  {} as AuthContextInterface
);

export const useAuth = (): AuthContextInterface => useContext(AuthContext);

const AuthProvider: React.FC<AuthProviderProps> = ({ children, authUser }) => {
  const toast = useToaster();
  const [initLoading, setInitLoading] = React.useState(true);
  const [loading, setLoading] = React.useState(false);
  const [user, setUser] = React.useState<User | null>(authUser || null);

  React.useEffect(() => {
    async function loadMyself() {
      console.log('LOADING MYSELF', user);
      try {
        if (!user) {
          const { myself } = await SDK.Myself();
          console.log('myself', myself);
          setUser(myself as User);
        }
      } catch (error) {
        console.log('Not logged in');
      } finally {
        setInitLoading(false);
      }
    }
    //setInitLoading(true);
    loadMyself();
  }, []);

  const login: AuthContextInterface['login'] = async (variables) => {
    setLoading(true);
    try {
      const { login } = await SDK.Login(variables);
      const user = login as User;
      setUser(user);
      toast.info('Here we go again, ' + user.firstName + ' 😃');
      return { user };
    } catch (err) {
      const errors = err.response?.errors || err;
      return {
        error: extractFormErrors<LoginInput>(errors),
        message: errors[0].message,
        //message: extractMessageErrors(errors),
      };
    } finally {
      setLoading(false);
    }
  };

  const register: AuthContextInterface['register'] = async (variables) => {
    setLoading(true);
    try {
      const { register } = await SDK.Register(variables);
      const user = register as User;
      setUser(user);
      toast.info('Welcome on board, ' + user.firstName + ' 🤘');
      return { user };
    } catch (err) {
      const errors = err.response?.errors || err;
      return {
        error: extractFormErrors<RegisterInput>(errors),
        message: errors[0].message,
        //message: extractMessageErrors(errors),
      };
    } finally {
      setLoading(false);
    }
  };

  const logout: AuthContextInterface['logout'] = async () => {
    setLoading(true);
    try {
      await SDK.Logout();
      toast.info('👋 Bye Bye 👋');
      setUser(null);
      return true;
    } catch (err) {
      console.error('Failed to log out');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const auth: AuthContextInterface = {
    user,
    isAuthenticated: !!user,
    loading,
    login,
    register,
    logout,
  };

  return (
    <AuthContext.Provider value={auth}>
      {initLoading && <Loading />}
      {!initLoading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
