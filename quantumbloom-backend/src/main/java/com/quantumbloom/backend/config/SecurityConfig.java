package com.quantumbloom.backend.config;

import com.quantumbloom.backend.mapper.UserMapper;
import com.quantumbloom.backend.model.Role;
import com.quantumbloom.backend.model.UserDTO;
import com.quantumbloom.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Lazy;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final JwtTokenProvider jwtTokenProvider;

    public SecurityConfig(@Lazy JwtTokenProvider jwtTokenProvider) {
        this.jwtTokenProvider = jwtTokenProvider;
    }

    @Bean
    public JwtTokenProvider jwtTokenProvider(@Value("${jwt.secret}") String jwtSecret) {
        return new JwtTokenProvider(jwtSecret);
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(AbstractHttpConfigurer::disable)
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))
            .headers(headers -> headers
                .contentSecurityPolicy(csp -> csp
                    .policyDirectives("script-src-elem 'self' https://maps.googleapis.com https://maps-api-v3.google.com 'unsafe-inline'; " +
                            "script-src 'self' https://maps.googleapis.com https://maps-api-v3.google.com 'unsafe-inline' 'unsafe-eval'; " +
                            "connect-src 'self' http://localhost:8080 https://maps.googleapis.com https://maps-api-v3.google.com; " +
                            "default-src 'self';")
                )
            )
            .authorizeHttpRequests(auth -> auth
                .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                .requestMatchers("/api/users/login", "/api/users/register").permitAll()
                .requestMatchers("/api/products/**").permitAll()
                .requestMatchers("/uploads/**").permitAll()
                .requestMatchers("/api/reviews/**").permitAll()
                .requestMatchers("/api/features").permitAll()
                .requestMatchers("/api/products/suggestions").permitAll()

                .requestMatchers("/api/users/favorites/**").authenticated()
                .requestMatchers("/admin/**", "/api/admin/**").hasAuthority("ADMIN")
                .requestMatchers("/api/users/**").authenticated()

                .anyRequest().authenticated()
            )
            .addFilterBefore(new JwtAuthenticationFilter(jwtTokenProvider), UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Autowired
    private UserRepository userRepository;

    @Bean
    public UserDetailsService userDetailsService() {
        // Crear admin por defecto si no existe
        if (userRepository.findByEmail("admin@admin.com").isEmpty()) {
            UserDTO adminDTO = new UserDTO();
            adminDTO.setEmail("admin@admin.com");
            adminDTO.setPassword(passwordEncoder().encode("admin123"));
            adminDTO.setRole(Role.ADMIN);
            adminDTO.setName("Admin");
            userRepository.save(UserMapper.toEntity(adminDTO));
        }

        // Crear usuario normal por defecto si no existe
        if (userRepository.findByEmail("user@user.com").isEmpty()) {
            UserDTO userDTO = new UserDTO();
            userDTO.setEmail("user@user.com");
            userDTO.setPassword(passwordEncoder().encode("user123"));
            userDTO.setRole(Role.USER);
            userDTO.setName("User");
            userRepository.save(UserMapper.toEntity(userDTO));
        }

        UserDetails adminDetails = User.withUsername("admin@admin.com")
                .password(passwordEncoder().encode("admin123"))
                .authorities("ADMIN")
                .build();

        UserDetails userDetails = User.withUsername("user@user.com")
                .password(passwordEncoder().encode("user123"))
                .authorities("USER")
                .build();

        return new InMemoryUserDetailsManager(adminDetails, userDetails);
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public UrlBasedCorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        config.addAllowedOrigin("http://localhost:3000");
        config.addAllowedMethod("*");
        config.addAllowedHeader("*");
        config.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }

    @Bean
    public CorsFilter corsFilter() {
        return new CorsFilter(corsConfigurationSource());
    }
}
