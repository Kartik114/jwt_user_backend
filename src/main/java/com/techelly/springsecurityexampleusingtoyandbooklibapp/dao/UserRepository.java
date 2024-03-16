package com.techelly.springsecurityexampleusingtoyandbooklibapp.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.techelly.springsecurityexampleusingtoyandbooklibapp.entities.UserEntity;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Integer> {
	public Optional<UserEntity> findByUsername(String username);
	public Optional<UserEntity> findByEmail(String email);
	public Boolean existsByUsername(String username);

	public Boolean existsByEmail(String email);
}
