package com.app.bicycle.entities;

import com.app.bicycle.enums.UserRole;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;


@Entity
public class Role extends BaseEntity {
    @Enumerated(value = EnumType.STRING)
    @Column(name = "name", nullable = false)
    private UserRole roleName;

    public UserRole getRoleName() {
        return roleName;
    }

    public void setRoleName(UserRole roleName) {
        this.roleName = roleName;
    }
}
