package com.app.bicycle.entities;

import com.app.bicycle.enums.UserRole;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;


@Entity
public class Role extends BaseEntity {
    @Enumerated(value = EnumType.STRING)
    @Column(name = "name")
    private UserRole roleName;

    public Role(UserRole userRole) {
        super();
    }

    public Role() {

    }

    public UserRole getRoleName() {
        return roleName;
    }

    public void setRoleName(UserRole roleName) {
        this.roleName = roleName;
    }
}
