package com.app.bicycle.security.filter;

import com.app.bicycle.entities.User;
import com.app.bicycle.security.JwtTokenProvider;
import com.app.bicycle.security.UserPrincipal;
import com.fasterxml.jackson.databind.ObjectMapper;

import com.google.gson.Gson;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.modelmapper.ModelMapper;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import java.io.IOException;
import java.util.Map;

public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    private final AuthenticationManager authenticationManager;

    private final JwtTokenProvider jwtTokenProvider;

    private final ModelMapper modelMapper;

    public JwtAuthenticationFilter(AuthenticationManager authenticationManager, JwtTokenProvider jwtTokenProvider, ModelMapper modelMapper) {
        this.authenticationManager = authenticationManager;
        this.jwtTokenProvider = jwtTokenProvider;
        this.modelMapper = modelMapper;
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {
        Gson gson = new Gson();
        Map map = null;
        try{
            map = gson.fromJson(request.getReader().readLine(), Map.class);
        }catch (Exception e){
            throw new RuntimeException("Auth not found");
        }
        String username = (String) map.get("username");
        String password = (String) map.get("password");

        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(username, password);

        return authenticationManager.authenticate(authenticationToken);
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authentication) throws IOException, ServletException {
        UserPrincipal userPrincipal = (UserPrincipal)authentication.getPrincipal();
        String token = jwtTokenProvider.generateToken(userPrincipal);
        response.setHeader("Jwt-Token", token);
        User user = this.modelMapper.map(userPrincipal.getUser(), User.class);
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.writeValue(response.getOutputStream(), user);

    }
}