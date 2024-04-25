package org.vatsproject.controllers;


import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.vatsproject.models.Customer;
import org.vatsproject.services.CustomerService;

import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/api/v1/customers")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
@Slf4j
public class CustomerController {
    private final CustomerService service;

    @PostMapping
    @ResponseBody
    public void register(@RequestBody Customer customer) {
        service.register(customer);
    }

    @PostMapping("/changeStatus")
    public void changeStatus(@RequestBody Map<String, String> request) {
        String id = request.get("id");
        String status = request.get("status");
        service.changeStatus(id, status);
    }

    @GetMapping()
    @ResponseBody
    public List<Customer> findAll() {
        return service.findAll();
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> handle(Exception exception) {
        exception.printStackTrace();
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(exception.getMessage());
    }
}
