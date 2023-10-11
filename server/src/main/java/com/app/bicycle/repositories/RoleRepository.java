package com.app.bicycle.repositories;

import com.app.bicycle.entities.Role;
import com.app.bicycle.enums.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role, Long> {
    Role findByRoleName(UserRole roleName);
}