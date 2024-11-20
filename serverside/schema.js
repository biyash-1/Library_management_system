import { gql } from 'graphql-tag';

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    email: String!
    phone: String
    role: String
    sid: String!
  }

  type Book {
    id: ID!
    name: String!
    author: String!
    publishedYear: Int!
    genre: String!
    ISBN: String!
    price: Float!
    issuedDate: String
    imageUrl: String!
  }

  type AuthPayload {
    id: ID! 
    token: String!
    user: User!
  }

  type getIssueBooks {
    id: ID!
    name: String!
    author: String!
    publishedYear: Int!
    genre: String!
    ISBN: String!
    price: Float!
    imageUrl: String
  }

  type IssueBookResponse {
    message: String!
    book: Book
    student: String
    issuedDate: String
  }

  type DashboardData {
    totalBooks: Int!
    issuedBooks: Int!
    totalStudents: Int!
  }

  type Query {
    books: [Book!]!
    book(id: ID!): Book
    users: [User!]!
    getIssuedBooks(userId: ID!): [Book]
    
    getDashboardData: DashboardData!
  }

  type Mutation {
    signup(
      username: String!,
      email: String!,
      password: String!,
      confirmPassword: String!,   
      sid: String!,
      phone: String
    ): AuthPayload!

    login(email: String!, password: String!): AuthPayload!

    addBook(
      name: String!,
      author: String!,
      publishedYear: String!,
      genre: String!,
      ISBN: String!,
      price: String!,
      imageUrl: String!  
    ): Book!

    deleteBook(id: ID!): Book!
    updateBook(
      id: ID!,
      name: String,
      author: String,
      publishedYear: Int,
      genre: String,
      ISBN: String,
      price: Float,
      imageUrl: String  # Updated to match the addBook mutation
    ): Book!

    issueBook(bookISBN: String!, sid: String!): IssueBookResponse!
  }
`;

export default typeDefs;
