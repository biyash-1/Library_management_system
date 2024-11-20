export const LOGIN_QUERY = `
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        username
        email
        role
      }
    }
  }
`;

export const SIGNUP_QUERY = `
  mutation Signup($email: String!, $username: String!, $password: String!, $confirmPassword: String!, $sid: String!, $phone: String!) {
    signup(email: $email, username: $username, password: $password, confirmPassword: $confirmPassword, sid: $sid, phone: $phone) {
      user {  
        id
        username
        email
        role
        sid
        phone
      }
      token
    }
  }
`;

