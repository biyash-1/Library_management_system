// src/queries/bookQuery.js

// Query to fetch all books
export const GET_ALL_BOOKS_QUERY = `
  query Books {
    books {
      id
      name
      author
      publishedYear
      genre
      ISBN
     price
    
      imageUrl
      issuedDate
    }
  }
`;

// Query to fetch books issued to a specific user


// Query to fetch a specific book by ID

export const GET_ISSUED_BOOKS_QUERY = `
  query GetIssuedBooks($userId: ID!) {
    getIssuedBooks(userId: $userId) {
      id
      name
      author
      publishedYear
      genre
      ISBN
      price
      issuedDate
      imageUrl
          
    }
  }
`;
// Mutation to create a new book
export const CREATE_BOOK_MUTATION = `
  mutation CreateBook($name: String!, $author: String!, $publishedYear: Int!, $genre: String!, $ISBN: String!, $price: Float!, $image: String) {
    createBook(name: $name, author: $author, publishedYear: $publishedYear, genre: $genre, ISBN: $ISBN, price: $price, image: $image) {
      id
      name
      author
      publishedYear
      genre
      ISBN
      price
      imageUrl
    }
  }
`;

// Mutation to update an existing book by ID
export const UPDATE_BOOK_MUTATION = `
  mutation UpdateBook($id: ID!, $name: String, $author: String, $publishedYear: Int, $genre: String, $ISBN: String, $price: Float, $image: String) {
    updateBook(id: $id, name: $name, author: $author, publishedYear: $publishedYear, genre: $genre, ISBN: $ISBN, price: $price, image: $image) {
      id
      name
      author
      publishedYear
      genre
      ISBN
      price
      imageUrl
    }
  }
`;



export const DELETE_BOOK_MUTATION = `
  mutation DelteBook($id:ID!){
    deleteBook(id:$id){
      id
      name
      author
    }
}
`;

export const ISSUE_BOOK_MUTATION = `
  mutation IssueBook($bookISBN: String!, $sid: String!) {
    issueBook(bookISBN: $bookISBN, sid: $sid) {
      message
      student
      issuedDate
    }
  }
`;


export const GET_ALL_STUDENTS_QUERY = `
  query students {
    users {
      id
      username
      email
      phone
      role
      sid
    }
  }
`;

export const getIssuedBook_Query = `
  query GetIssuedBooks($userId: ID!) {
    getIssueBooks(userId: $userId) {
      id
      name
      author
      publishedYear
      genre
      ISBN
      price
      imageUrl
    }
  }
`;


export const GET_DASHBOARD_DATA_QUERY = `
  query GetDashboardData {
    getDashboardData {
      totalBooks
      issuedBooks
      totalStudents
    }
  }
`;

export const ADD_BOOK_MUTATION = `
  mutation AddBook($name: String!, $author: String!, $publishedYear: String!, $genre: String!, $ISBN: String!, $price: String!, $imageUrl: String!) {
    addBook(name: $name, author: $author, publishedYear: $publishedYear, genre: $genre, ISBN: $ISBN, price: $price, imageUrl: $imageUrl) {
      id
      name
      author
      imageUrl
    }
  }
`;
