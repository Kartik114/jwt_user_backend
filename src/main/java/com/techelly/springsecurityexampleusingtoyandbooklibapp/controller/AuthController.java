package com.techelly.springsecurityexampleusingtoyandbooklibapp.controller;


import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;


import com.techelly.springsecurityexampleusingtoyandbooklibapp.dao.TokenRepository;
import com.techelly.springsecurityexampleusingtoyandbooklibapp.model.Token;
import com.techelly.springsecurityexampleusingtoyandbooklibapp.model.TokenType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import com.techelly.springsecurityexampleusingtoyandbooklibapp.dao.RoleRepository;
import com.techelly.springsecurityexampleusingtoyandbooklibapp.dao.UserRepository;
import com.techelly.springsecurityexampleusingtoyandbooklibapp.entities.ERole;
import com.techelly.springsecurityexampleusingtoyandbooklibapp.entities.Role;
import com.techelly.springsecurityexampleusingtoyandbooklibapp.entities.UserEntity;
import com.techelly.springsecurityexampleusingtoyandbooklibapp.payload.request.LoginRequest;
import com.techelly.springsecurityexampleusingtoyandbooklibapp.payload.request.SignupRequest;
import com.techelly.springsecurityexampleusingtoyandbooklibapp.payload.response.JwtResponse;
import com.techelly.springsecurityexampleusingtoyandbooklibapp.payload.response.MessageResponse;
import com.techelly.springsecurityexampleusingtoyandbooklibapp.security.jwt.JwtUtils;
import com.techelly.springsecurityexampleusingtoyandbooklibapp.security.service.UserDetailsImpl;

import jakarta.validation.Valid;


//@CrossOrigin(origins = "*", maxAge = 3600)
@CrossOrigin(origins = { "http://localhost:3002" })
@RestController
@RequestMapping("/api/auth")
public class AuthController {	@Autowired
	AuthenticationManager authenticationManager;

	@Autowired
	UserRepository userRepository;

	@Autowired
	RoleRepository roleRepository;

	@Autowired
	TokenRepository tokenRepository;

	@Autowired
	PasswordEncoder encoder;

	@Autowired
	JwtUtils jwtUtils;

	@PostMapping("/signin")
	public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

		Authentication authentication = authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));

		SecurityContextHolder.getContext().setAuthentication(authentication);
		String jwt = jwtUtils.generateJwtToken(authentication);
		
		UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
//		System.out.println(userDetails.getEmail());
		List<String> roles = userDetails.getAuthorities().stream()
				.map(item -> item.getAuthority())
				.collect(Collectors.toList());
		 Optional<UserEntity> user = userRepository.findByEmail(loginRequest.getEmail());

		 if(!user.isPresent())
		 {
			 System.out.println("null");
		 }
		 else {
			 System.out.println(user.get().getUsername());
		 }

		revokeAllUserTokens(user.get());
		saveUserToken(jwt,user.get());
		return ResponseEntity.ok(new JwtResponse(jwt, 
												 userDetails.getId(), 
												 userDetails.getUsername(), 
												 userDetails.getEmail(), 
												 roles));
	}
	private void saveUserToken(String jwtToken, UserEntity user) {
		var token = Token.builder()
				.user(user)
				.token(jwtToken)
				.tokenType(TokenType.BEARER)
				.expired(false)
				.revoked(false)
				.build();
		tokenRepository.save(token);
	}

	private void revokeAllUserTokens(UserEntity user)
	{
		var validTokens = tokenRepository.findAllValidTokenByUser(Math.toIntExact(user.getId()));
		if(validTokens.isEmpty())
		{
			return;
		}
		validTokens.forEach(t->{
			t.setExpired(true);
			t.setRevoked(true);
		});
		tokenRepository.saveAll(validTokens);

	}

	@PostMapping("/signup")
	public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
		System.out.println("signup hit");
		if (userRepository.existsByUsername(signUpRequest.getUsername())) {
			return ResponseEntity
					.badRequest()
					.body(new MessageResponse("Error: Username is already taken!"));
		}

		if (userRepository.existsByEmail(signUpRequest.getEmail())) {
			return ResponseEntity
					.badRequest()
					.body(new MessageResponse("Error: Email is already in use!"));
		}

		// Create new user's account
		UserEntity user = new UserEntity(signUpRequest.getUsername(), 
							 signUpRequest.getEmail(),
							 encoder.encode(signUpRequest.getPassword()));
		System.out.println(user);
		Set<String> strRoles = signUpRequest.getRole();
		Set<Role> roles = new HashSet<>();

		if (strRoles == null) {
			Role userRole = roleRepository.findByName(ERole.ROLE_USER)
					.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
			roles.add(userRole);
			System.out.println(userRole);

		} else {
			strRoles.forEach(role -> {
				switch (role) {
				case "admin":
					Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
							.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
					roles.add(adminRole);

					break;
				case "child":
					Role childRole = roleRepository.findByName(ERole.ROLE_CHILD)
							.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
					roles.add(childRole);

					break;
				case "parent":
					Role parentRole = roleRepository.findByName(ERole.ROLE_PARENT)
							.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
					roles.add(parentRole);

					break;
				default:
					Role userRole = roleRepository.findByName(ERole.ROLE_USER)
							.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
					roles.add(userRole);
				}
			});
		}

		user.setRoles(roles);
		user.setAddress(signUpRequest.getAddress());
		user.setEmail(signUpRequest.getEmail());
//		user.setMobile(signUpRequest.getMobile());
//		user.setGender(signUpRequest.getGender());

		//saving UserEntity to the database 
		userRepository.save(user);

		return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
	}

}