package com.techelly.springsecurityexampleusingtoyandbooklibapp.service;

import java.util.List;

import com.techelly.springsecurityexampleusingtoyandbooklibapp.exceptions.BookNotFoundException;
import com.techelly.springsecurityexampleusingtoyandbooklibapp.exceptions.ResourceNotFoundException;
import com.techelly.springsecurityexampleusingtoyandbooklibapp.model.Book;

public interface IBookService {
	public Book saveBook(Book book);

	public Book updateBook(Book book) throws BookNotFoundException;

	public Book deleteBook(Integer bookId) throws BookNotFoundException;

	public Book viewBookById(Integer bookId) throws BookNotFoundException;

	public Book viewBookByTitle(String title) throws BookNotFoundException;

	public List<Book> viewAllBooks()throws ResourceNotFoundException;

}
