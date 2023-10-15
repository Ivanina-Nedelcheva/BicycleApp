package com.app.bicycle;

import com.app.bicycle.entities.Role;
import com.app.bicycle.entities.User;
import com.app.bicycle.enums.UserRole;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@Transactional
public class DBInitializer implements CommandLineRunner {
    @PersistenceContext
    EntityManager em;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        List<Role> userRoles = em.createQuery("from Role ", Role.class).setMaxResults(1).getResultList();
        if (userRoles.isEmpty()) {
            Role ordinary = new Role();
            ordinary.setRoleName(UserRole.ROLE_ORDINARY_USER);
            em.persist(ordinary);

            Role admin = new Role();
            admin.setRoleName(UserRole.ROLE_SYSTEM_ADMIN);
            em.persist(admin);

            Role tech = new Role();
            tech.setRoleName(UserRole.ROLE_TECH_SUPPORT_MEMBER);
            em.persist(tech);

            Role observer = new Role();
            observer.setRoleName(UserRole.ROLE_OBSERVER);
            em.persist(observer);


            List<User> userList = em.createQuery("from User", User.class).setMaxResults(1).getResultList();
            if (userList.isEmpty()) {
                User user1 = new User();
                user1.setFirstName("Ivanina");
                user1.setLastName("Nedelcheva");
                user1.setEmail("ivanina@test.com");
                user1.setRole(ordinary);
                user1.setPhoneNumber("0891324500");
                user1.setAge(25);
                user1.setPassword(passwordEncoder.encode("123456"));
                em.persist(user1);


                User user2 = new User();
                user2.setFirstName("Nikolay");
                user2.setLastName("Georgiev");
                user2.setEmail("nikolai@test.com");
                user2.setRole(admin);
                user2.setPhoneNumber("0894224875");
                user2.setAge(35);
                user2.setPassword(passwordEncoder.encode("123456"));
                em.persist(user2);

                User user3 = new User();
                user3.setFirstName("Georgi");
                user3.setLastName("Paskov");
                user3.setEmail("georgi@test.com");
                user3.setRole(observer);
                user3.setPhoneNumber("0893324500");
                user3.setAge(29);
                user3.setPassword(passwordEncoder.encode("123456"));
                em.persist(user3);

                User user4 = new User();
                user4.setFirstName("Stoqn");
                user4.setLastName("Ivanov");
                user4.setEmail("stoqn@test.com");
                user4.setRole(tech);
                user4.setPhoneNumber("0891324922");
                user4.setAge(37);
                user4.setPassword(passwordEncoder.encode("123456"));
                em.persist(user4);
            }

        }
    }
}