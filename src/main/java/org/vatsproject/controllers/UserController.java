package org.vatsproject.controllers;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.vatsproject.models.VATSUser;
import org.vatsproject.services.UserService;

import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
@Slf4j
public class UserController {

    private final UserService service;

    @PostMapping
    @ResponseBody
    public void register(@RequestBody VATSUser user) {
        service.register(user);
    }

    @PostMapping("/login")
    @ResponseBody
    public VATSUser login(@RequestBody VATSUser user) {
       return service.login(user);
    }

    @PostMapping("/logout")
    public void logout(@RequestBody String email) {
        service.logout(email);
    }

    @PostMapping("/workTime")
    public void changeWorkTime(@RequestBody Map<String, String> request) {
        String email = request.get("userEmail");
        String startHour = request.get("startHour");
        String endHour = request.get("endHour");
        service.changeWorkTime(email, startHour, endHour);
    }

    @PostMapping("/offHoursMessage")
    public void changeOffHoursMessage(@RequestBody Map<String, String> request) {
        String email = request.get("userEmail");
        String offHoursMessage = request.get("offHoursMessage");
        service.changeOffHoursMessage(email, offHoursMessage);
    }

    @GetMapping()
    @ResponseBody
    public List<VATSUser> findAll() {
        return service.findAll();
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> handle(Exception exception) {
        exception.printStackTrace();
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(exception.getMessage());
    }
}
