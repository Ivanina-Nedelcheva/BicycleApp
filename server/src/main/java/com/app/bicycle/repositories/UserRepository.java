package com.app.bicycle.repositories;

import com.app.bicycle.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    User getUserById(Long userId);
    User findUserByEmail(String email);
}
