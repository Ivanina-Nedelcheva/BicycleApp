package com.app.bicycle.security.filter;

import com.app.bicycle.security.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Arrays;
import java.util.List;

import static com.app.bicycle.security.SecurityConfig.PUBLIC_URLS;

@Component
public class JwtAuthorizationFilter extends OncePerRequestFilter {
    @Autowired
    private JwtTokenProvider tokenProvider;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        if (request.getMethod().equalsIgnoreCase("OPTIONS")) {
            response.setStatus(HttpStatus.OK.value());
        } else {
            String authorizationHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
            if (authorizationHeader == null || !authorizationHeader.startsWith("Bearer ") || Arrays.asList(PUBLIC_URLS).contains(request.getServletPath())) {
                filterChain.doFilter(request, response);
            } else {
                try {
                    String token = authorizationHeader.substring("Bearer ".length());
                    String username = tokenProvider.getSubject(token);
                    if (tokenProvider.isTokenValid(token) && SecurityContextHolder.getContext().getAuthentication() == null) {
                        List<GrantedAuthority> authorities = tokenProvider.getAuthority(token);

                        Authentication authentication = tokenProvider.getAuthentication(username, authorities, request);
                        SecurityContextHolder.getContext().setAuthentication(authentication);
                    } else {
                        SecurityContextHolder.clearContext();
                    }
                } catch (Exception e) {
                    SecurityContextHolder.clearContext();
                }
                filterChain.doFilter(request, response);
            }
        }
    }
}