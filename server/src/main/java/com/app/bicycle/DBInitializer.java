package com.app.bicycle;

import com.app.bicycle.entities.User;
import com.app.bicycle.enums.UserRole;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
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

        List<User> userList = em.createQuery("from User", User.class).setMaxResults(1).getResultList();
        if (userList.isEmpty()) {
            User user1 = new User();
            user1.setFirstName("Nik");
            user1.setLastName("Nik");
            user1.setEmail("iva@k.com");
            user1.setRole(UserRole.ORDINARY_USER);
            user1.setPhoneNumber("08946");
            user1.setUsername("Nik");
            user1.setAge(String.valueOf(19));

//            user1.setPassword(passwordEncoder.encode("123456"));
            em.persist(user1);

        }

    }
}