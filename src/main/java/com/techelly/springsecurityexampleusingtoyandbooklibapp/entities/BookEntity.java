package com.techelly.springsecurityexampleusingtoyandbooklibapp.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(	name = "book_details")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class BookEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer bookId;
	
	private String title;
	
	private Float price;
	
	private String author;
	
	private String category;

	private String publication;
	
}
