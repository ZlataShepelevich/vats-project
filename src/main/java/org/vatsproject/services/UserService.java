package org.vatsproject.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;
import org.vatsproject.models.VATSUser;

import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public void register(VATSUser user) {
        user.setStatus("online");
        userRepository.save(user);
    }

    public VATSUser login(VATSUser user) {
        VATSUser cUser = userRepository.findByEmail(user.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!cUser.getPassword().equals(user.getPassword())) {
            throw new RuntimeException("Incorrect password");
        }

        cUser.setStatus("online");
        userRepository.save(cUser);
        return cUser;
    }

    public void logout(String email) {
        VATSUser user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setStatus("offline");
        userRepository.save(user);
    }

    public void changeWorkTime(String email, String startHour, String endHour) {
        VATSUser user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setStartHour(LocalTime.parse(startHour));
        user.setEndHour(LocalTime.parse(endHour));
        userRepository.save(user);
    }

    public void changeOffHoursMessage(String email, String offHoursMessage) {
        VATSUser user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setOffHoursMessage(offHoursMessage);
        userRepository.save(user);
    }

    public List<VATSUser> findAll() {
        return userRepository.findAll();
    }
}

interface UserRepository extends JpaRepository<VATSUser, Long> {
    Optional<VATSUser> findByEmail(String email);
}