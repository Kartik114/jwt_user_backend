package com.techelly.springsecurityexampleusingtoyandbooklibapp.model;

import com.techelly.springsecurityexampleusingtoyandbooklibapp.entities.UserEntity;
import jakarta.persistence.*;
import lombok.*;
import org.apache.catalina.User;
import org.springframework.security.core.userdetails.UserDetails;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@ToString
public class Token {

    @Id
    @GeneratedValue
    public Integer id;

    @Column(unique = true)
    public String token;

    @Enumerated(EnumType.STRING)
    public TokenType tokenType = TokenType.BEARER;

    public boolean revoked;

    public boolean expired;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    public UserEntity user;
}
