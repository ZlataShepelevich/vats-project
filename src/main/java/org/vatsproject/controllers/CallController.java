package org.vatsproject.controllers;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.vatsproject.models.Call;
import org.vatsproject.services.CallService;

import java.util.List;

@Controller
@RequestMapping("/api/v1/calls")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
@Slf4j
public class CallController {

    private final CallService service;
    private static boolean call = false;

    @PostMapping
    @ResponseBody
    public void register(@RequestBody Call call) {
        service.register(call);
    }

    @PostMapping("/call")
    @ResponseBody
    public void makeCall(@RequestBody String str) {
        call = true;
    }

    @PostMapping("/stop-call")
    @ResponseBody
    public void stopCall(@RequestBody String str) {
        call = false;
    }

    @GetMapping("/call")
    @ResponseBody
    public ResponseData call() {
        if (call) {
            return new ResponseData("call");
        } else {
            return new ResponseData("not");
        }
    }

    // Класс для представления данных, которые будут преобразованы в JSON
    @Getter
    public static class ResponseData {
        private final String message;

        public ResponseData(String message) {
            this.message = message;
        }

    }

    @GetMapping()
    @ResponseBody
    public List<Call> findAll() {
        return service.findAll();
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> handle(Exception exception) {
        exception.printStackTrace();
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(exception.getMessage());
    }
}
