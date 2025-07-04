# BUBT Central Library

## Overview

BUBT Central Library is a web application designed to manage books and borrowing activities efficiently. Built with React, Tailwind CSS, Shadcn UI, TypeScript, and Redux Toolkit, this application provides a seamless user experience for both administrators and patrons.

## Features

### Public Routes

- **All Books**: View a comprehensive list of all available books.
- **Add Book**: Create new books with essential details.
- **Borrow Summary**: Review borrowed books and their quantities.

### Book Management

- **Book List Table**: 
  - Title, Author, Genre, ISBN, Copies, Availability
  - Edit Book: Update existing book information.
  - Delete Book: Remove unwanted books.
  - Borrow Book: Initiate borrowing process.

### Borrow Book

- **Borrow Form**:
  - Quantity selection
  - Due date picker
- **Business Logic**:
  - Quantity cannot exceed available copies
  - Book status updates automatically

## Technologies Used

- **Frontend**: React, TypeScript, Redux Toolkit
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn UI
- **State Management**: Redux Toolkit

## Development Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/bubt-central-library.git
   cd bubt-central-library
   ```
2. Install dependencies:
   ```bash
   npm i / npm install
   ```
3. Run the project:
   ```bash
   npm run dev
   ```
