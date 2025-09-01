import { Amplify } from 'aws-amplify';

const awsConfig = {
  Auth: {
    region: process.env.REACT_APP_COGNITO_REGION || 'us-east-1',
    userPoolId: process.env.REACT_APP_COGNITO_USER_POOL_ID || 'us-east-1_H8k7tGm0O',
    userPoolWebClientId: process.env.REACT_APP_COGNITO_USER_POOL_CLIENT_ID || '5kovmbaag1265p23tbbt6ljj8h',
    identityPoolId: process.env.REACT_APP_COGNITO_IDENTITY_POOL_ID || 'us-east-1:e16ad6fc-f437-4ae6-85c7-194c50cd8109',
    authenticationFlowType: 'USER_SRP_AUTH',
    oauth: {
      domain: `${process.env.REACT_APP_COGNITO_USER_POOL_ID?.split('_')[1]}.auth.${process.env.REACT_APP_COGNITO_REGION}.amazoncognito.com`,
      scope: ['email', 'openid', 'aws.cognito.signin.user.admin'],
      redirectSignIn: process.env.REACT_APP_COGNITO_REDIRECT_SIGN_IN || 'http://localhost:3000/',
      redirectSignOut: process.env.REACT_APP_COGNITO_REDIRECT_SIGN_OUT || 'http://localhost:3000/',
      responseType: 'code'
    }
  },
  API: {
    endpoints: [
      {
        name: 'LogisticsAPI',
        endpoint: process.env.REACT_APP_API_URL || 'https://unv0m2gbd3.execute-api.us-east-1.amazonaws.com/dev',
        region: process.env.REACT_APP_COGNITO_REGION || 'us-east-1'
      }
    ]
  }
};

Amplify.configure(awsConfig);

export default awsConfig;
