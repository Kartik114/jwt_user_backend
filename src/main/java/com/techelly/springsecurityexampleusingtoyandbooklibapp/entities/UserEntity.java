package com.techelly.springsecurityexampleusingtoyandbooklibapp.entities;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import com.techelly.springsecurityexampleusingtoyandbooklibapp.model.Token;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.ToString.Exclude;

@Entity
@Table(name = "user_details", uniqueConstraints = { @UniqueConstraint(columnNames = "username"),
		@UniqueConstraint(columnNames = "email") })
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class UserEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@NotBlank
	@Size(max = 20)
	private String username;

	@NotBlank
	@Size(max = 50)
	@Email
	private String email;

	@NotBlank
	@Size(max = 120)
	private String password;

//	@NotBlank
//	@Size(max = 10)
//	private String mobile;

	@NotBlank
	@Size(max = 220)
	private String address;
//	@NotBlank
//	@Size(max = 11)
//	private String gender;
@OneToMany(mappedBy = "user")

	private List<Token> tokens;

	@ManyToMany(fetch = FetchType.LAZY)
	@JoinTable(name = "user_roles", joinColumns = @JoinColumn(name = "user_id"), inverseJoinColumns = @JoinColumn(name = "role_id"))
	@Exclude
	private Set<Role> roles = new HashSet<>();

	public UserEntity(String username, String email, String password) {
		this.username = username;
		this.email = email;
		this.password = password;
	}
}