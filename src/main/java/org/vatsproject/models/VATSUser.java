package org.vatsproject.models;

import lombok.Data;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import lombok.Getter;
import org.springframework.data.annotation.Id;

import java.time.LocalTime;

@Entity
@Data
public class VATSUser {
    @Getter
    @jakarta.persistence.Id
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String username;
    private String email;
    private String password;
    private String status;
    private LocalTime startHour;
    private LocalTime endHour;
    private String offHoursMessage;

    public VATSUser() {

    }

    public void setId(Long id) {
        this.id = id;
    }

}
