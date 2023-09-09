package com.app.bicycle;

import com.app.bicycle.entities.Role;
import com.app.bicycle.entities.User;
import com.app.bicycle.enums.UserRole;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
//import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import java.util.List;

@Component
@Transactional
public class DBInitializer implements CommandLineRunner {
    @PersistenceContext
    EntityManager em;
//    @Autowired
//    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {


        List<Role> userRoles = em.createQuery("from Role ", Role.class).setMaxResults(1).getResultList();
        if (userRoles.isEmpty()) {
            Role ordinary = new Role();
            ordinary.setRoleName(UserRole.ORDINARY_USER);
            em.persist(ordinary);

            Role admin = new Role();
            admin.setRoleName(UserRole.SYSTEM_ADMIN);
            em.persist(admin);

            Role tech = new Role();
            tech.setRoleName(UserRole.TECH_SUPPORT_MEMBER);
            em.persist(tech);

            Role observer = new Role();
            observer.setRoleName(UserRole.OBSERVER);
            em.persist(observer);


            List<User> userList = em.createQuery("from User", User.class).setMaxResults(1).getResultList();
            if (userList.isEmpty()) {
                User user1 = new User();
                user1.setFirstName("Nik");
                user1.setLastName("Nik");
                user1.setEmail("iva@k.com");
                user1.setRole(ordinary);
                user1.setPhoneNumber("08946");
                user1.setUsername("Nik");
                user1.setAge(String.valueOf(19));
                user1.setPassword("123456");
//            user1.setPassword(passwordEncoder.encode("123456"));
                em.persist(user1);
            }

        }
    }
}