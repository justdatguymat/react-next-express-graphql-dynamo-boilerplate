import React, { createContext, useContext } from 'react';
import {
  LoginInput,
  LoginMutation,
  RegisterInput,
  RegisterMutation,
  User,
  useLoginMutation,
  useRegisterMutation,
  useMyselfQuery,
  useLogoutMutation,
} from 'codegen/graphql-apollo';
import {
  extractMessageErrors,
  extractValidationErrors,
  inputValidation,
} from 'utils/errorHandlers';
import { useToaster } from 'contexts/toasterProvider';
import Loading from 'components/Loading';
import { withApollo } from 'lib/apollo/withApollo';
import { FetchResult } from '@apollo/client';

type AuthResponse<T = undefined> = {
  user?: User;
  errors?: T;
  message?: string;
};

type FetchingLoads = {
  login: boolean;
  register: boolean;
  logout: boolean;
  myself: boolean;
};

interface AuthContextInterface {
  login(input: LoginInput): Promise<AuthResponse<LoginInput>>;
  register(input: RegisterInput): Promise<AuthResponse<RegisterInput>>;
  logout(): Promise<AuthResponse>;
  user: User;
  isAuthenticated: boolean;
  loading: FetchingLoads;
}

interface AuthProviderProps {}

export const AuthContext: React.Context<AuthContextInterface> = createContext<AuthContextInterface>(
  {} as AuthContextInterface
);
export const useAuth = (): AuthContextInterface => useContext(AuthContext);

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const toast = useToaster();
  const [user, setUser] = React.useState<User>({} as User);

  const { data: myselfData, loading: myselfFetching } = useMyselfQuery();
  const [registerMutation, { loading: registerFetching }] = useRegisterMutation();
  const [loginMutation, { loading: loginFetching }] = useLoginMutation();
  const [logoutMutation, { loading: logoutFetching }] = useLogoutMutation();

  const [loading, setLoading] = React.useState({
    login: loginFetching,
    register: registerFetching,
    logout: logoutFetching,
    myself: myselfFetching,
  });

  React.useEffect(() => {
    if (myselfData) {
      toast.info('Welcome back ' + myselfData.myself.firstName);
    }
  }, []);

  React.useEffect(() => {
    if (myselfData?.myself) {
      const myself = { ...myselfData.myself } as User;
      setUser(myself);
    } else {
      setUser({} as User);
    }
  }, [myselfData]);

  React.useEffect(() => {
    setLoading({
      login: loginFetching,
      register: registerFetching,
      logout: logoutFetching,
      myself: myselfFetching,
    });
  }, [registerFetching, loginFetching, logoutFetching, myselfFetching]);

  const processMutationResponse = <T extends LoginInput | RegisterInput>(
    response: FetchResult<LoginMutation | RegisterMutation>,
    property: 'login' | 'register'
  ): AuthResponse<T> => {
    if (response.errors) {
      const graphQLErrors = response.errors;
      const validation = extractValidationErrors(graphQLErrors);
      const errors = inputValidation<T>(validation);
      const message = extractMessageErrors(graphQLErrors);
      return { errors, message };
    } else {
      const user = response.data?.[property] as User;
      if (property === 'login') {
        toast.success(`Welcome back, ${user.firstName}`);
      } else if (property === 'register') {
        toast.success(`${user.firstName}, welcome on board!`);
      }
      setUser(user);
      return { user };
    }
  };

  const register = async (input: RegisterInput): Promise<AuthResponse<RegisterInput>> => {
    //const response = await registerMutation(input);
    const response = await registerMutation({ variables: input });
    console.log('response', response);
    return processMutationResponse<RegisterInput>(response, 'register');
  };

  const login = async (input: LoginInput): Promise<AuthResponse<LoginInput>> => {
    const response = await loginMutation({ variables: input });
    console.log('response', response);
    return processMutationResponse<LoginInput>(response, 'login');
  };

  const logout = async (): Promise<AuthResponse> => {
    const response = await logoutMutation();
    console.log('response', response);
    let message = 'User failed to logout';
    if (response.data?.logout) {
      setUser({} as User);
      message = 'User logged out';
      toast.info(`See you next time, ${user.firstName}`);
    } else if (response.errors) {
      message = extractMessageErrors(response.errors);
    }
    return { message };
  };

  const auth: AuthContextInterface = {
    register,
    login,
    logout,
    user,
    isAuthenticated: !!user.id,
    loading,
  };

  React.useEffect(() => {
    console.log('USER', user);
  }, [user]);

  return (
    <AuthContext.Provider value={auth}>
      {loading.myself ? <Loading backdrop size={60} /> : children}
    </AuthContext.Provider>
  );
};

export default withApollo()(AuthProvider);
