package org.vatsproject.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;
import org.vatsproject.models.Call;

import java.util.ArrayList;
import java.util.List;

@Service
public class CallService {

    private final CallRepository callRepository;

    @Autowired
    public CallService(CallRepository callRepository) {
        this.callRepository = callRepository;
    }

    public void register(Call call) {
        callRepository.save(call);
    }

    public List<Call> findAll() {
        return callRepository.findAll();
    }
}

interface CallRepository extends JpaRepository<Call, Long> {
}