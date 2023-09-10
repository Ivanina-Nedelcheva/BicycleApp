package com.app.bicycle;

import com.app.bicycle.entities.Role;
import com.app.bicycle.entities.User;
import com.app.bicycle.enums.UserRole;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

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
                user1.setFirstName("Iva");
                user1.setLastName("Ned");
                user1.setEmail("iva@gmail.com");
                user1.setRole(ordinary);
                user1.setPhoneNumber("08946");
                user1.setAge(String.valueOf(25));
                user1.setPassword("123456");
                em.persist(user1);


                User user2 = new User();
                user2.setFirstName("Niki");
                user2.setLastName("Georg");
                user2.setEmail("nik@gmail.com");
                user2.setRole(admin);
                user2.setPhoneNumber("08942");
                user2.setAge(String.valueOf(35));
                user2.setPassword("234567");
                em.persist(user2);

                User user3 = new User();
                user3.setFirstName("Mil");
                user3.setLastName("Ned");
                user3.setEmail("mil@gmail.com");
                user3.setRole(observer);
                user3.setPhoneNumber("089754");
                user3.setAge(String.valueOf(29));
                user3.setPassword("2345678");
                em.persist(user3);

                User user4 = new User();
                user4.setFirstName("Ive");
                user4.setLastName("Georg");
                user4.setEmail("ive@gmail.com");
                user4.setRole(tech);
                user4.setPhoneNumber("08966");
                user4.setAge(String.valueOf(37));
                user4.setPassword("456789");
                em.persist(user4);
            }

        }
    }
}