package org.vatsproject.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import lombok.Data;
import lombok.Getter;
import org.springframework.data.annotation.Id;

import java.util.Date;

@Entity
@Data
public class Call {
    @Getter
    @jakarta.persistence.Id
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String caller;
    private String receiver;
    private Date callStartTime;

    public Call() {

    }

    public void setId(Long id) {
        this.id = id;
    }

}
