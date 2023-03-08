import { createContext, useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
import Amplify, { Auth } from 'aws-amplify';
import { amplifyConfig } from '../config';

Amplify.configure(amplifyConfig);

var ActionType;
(function (ActionType) {
  ActionType['INITIALIZE'] = 'INITIALIZE';
  ActionType['LOGIN'] = 'LOGIN';
  ActionType['UPDATE_USER'] = 'UPDATE_USER';
  ActionType['LOGOUT'] = 'LOGOUT';
  // ActionType['REGISTER'] = 'REGISTER';
})(ActionType || (ActionType = {}));

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
  updatedListings: [],
};

const handlers = {
  INITIALIZE: (state, action) => {
    const { isAuthenticated, user } = action.payload;

    // console.log(user);

    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user
    };
  },
  LOGIN: (state, action) => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user
    };
  },
  UPDATE_USER: (state, action) => {
    const { user } = action.payload;

    return {
      ...state,
      user
    };
  },
  LOGOUT: (state) => ({
    ...state,
    isAuthenticated: false,
    user: null,
    profile: null,
  }),

  SET_UPDATED_LISTINGS: (state, action) => ({
    ...state,
    updatedListings: action.payload,
  }),

  // REGISTER: (state, action) => ({
  //   ...state,
  //   profile: action.payload.profile,
  // }),



};

const reducer = (state, action) => (handlers[action.type]
  ? handlers[action.type](state, action)
  : state);

export const AuthContext = createContext({
  ...initialState,
  platform: 'Amplify',
  login: () => Promise.resolve(),
  update_user: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  register: () => Promise.resolve(),
  verifyCode: () => Promise.resolve(),
  resendCode: () => Promise.resolve(),
  passwordRecovery: () => Promise.resolve(),
  passwordReset: () => Promise.resolve()
});

const isAdmin = (user) => {
  try {
    if (user
      && user.signInUserSession
      && user.signInUserSession.accessToken
      && user.signInUserSession.accessToken.payload
      && user.signInUserSession.accessToken.payload["cognito:groups"]
    ) {
      return user.signInUserSession.accessToken.payload["cognito:groups"].find(v => v == "admin");
    }
    return false;
  } catch (error) {
    console.error(error);
    return false;
  }
}

const userStripped = (user) => ({
  id: user.username,
  avatar: '/avstatic/mock-images/avatars/avatar-anika_visser.png',
  email: user.attributes.email,
  name: user.attributes["custom:firstname"] + ' ' + user.attributes["custom:surname"],
  firstname: user.attributes["custom:firstname"],
  surname: user.attributes["custom:surname"],
  firm: user.attributes["custom:firm"],
  phone: user.attributes["custom:phone"],
  plan: user.attributes["custom:firm"],
  listings: user.attributes["custom:listings"],
  stripeCustomerId: user.attributes["custom:stripeCustomerId"],
  subscriptionPlan: user.attributes["custom:subscriptionPlan"],
  verifiedEmails: user.attributes["custom:verifiedEmails"],
  admin: isAdmin(user),
})

export const AuthProvider = (props) => {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const initialize = async () => {
      try {
        const user = await Auth.currentAuthenticatedUser();

        // console.log(user)

        // Here you should extract the complete user profile to make it
        // available in your entire app.
        // The auth state only provides basic information.

        dispatch({
          type: ActionType.INITIALIZE,
          payload: {
            isAuthenticated: true,
            user: userStripped(user)
          }
        });
      } catch (error) {
        dispatch({
          type: ActionType.INITIALIZE,
          payload: {
            isAuthenticated: false,
            user: null
          }
        });
      }
    };

    initialize();
  }, []);

  const login = async (email, password) => {
    const user = await Auth.signIn(email, password);

    if (user.challengeName) {
      console.error(`Unable to login, because challenge "${user.challengeName}" is mandated and we did not handle this case.`);
      return;
    }

    dispatch({
      type: ActionType.LOGIN,
      payload: {
        user: userStripped(user)
      }
    });
  };

  const update_user = async (user) => {
    dispatch({
      type: ActionType.UPDATE_USER,
      payload: {
        user: userStripped(user)
      }
    });
  };

  const logout = async () => {
    await Auth.signOut();
    dispatch({
      type: ActionType.LOGOUT
    });
  };

  const register = async (
    email,
    password,
    firstname,
    surname,
    firm,
    phone,
  ) => {
    const result = await Auth.signUp({
      username: email,
      password,
      attributes: {
        email,
        "custom:firstname": firstname,
        "custom:surname": surname,
        "custom:firm": firm,
        "custom:phone": phone,
      }
    });
  };

  const verifyCode = async (username, code) => {
    await Auth.confirmSignUp(username, code);
  };

  const resendCode = async (username) => {
    await Auth.resendSignUp(username);
  };

  const passwordRecovery = async (username) => {
    await Auth.forgotPassword(username);
  };

  const passwordReset = async (username, code, newPassword) => {
    await Auth.forgotPasswordSubmit(username, code, newPassword);
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        platform: 'Amplify',
        login,
        update_user,
        logout,
        register,
        verifyCode,
        resendCode,
        passwordRecovery,
        passwordReset
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export const AuthConsumer = AuthContext.Consumer;
