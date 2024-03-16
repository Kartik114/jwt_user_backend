package com.techelly.springsecurityexampleusingtoyandbooklibapp.payload.request;

import java.util.Set;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class SignupRequest {
	@NotBlank
	private String username;

	@NotBlank
	@Size(max = 50)
	@Email
	private String email;

	private Set<String> role;

	@NotBlank
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

}