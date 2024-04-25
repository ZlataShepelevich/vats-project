package org.vatsproject.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;
import org.vatsproject.models.Customer;

import java.util.List;

@Service
public class CustomerService {

    private final CustomerRepository customerRepository;

    @Autowired
    public CustomerService(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    public void register(Customer customer) {
        customerRepository.save(customer);
    }

    public List<Customer> findAll() {
        return customerRepository.findAll();
    }

    public void changeStatus(String id, String status){
        Customer customer = customerRepository.findById(Long.parseLong(id))
                .orElseThrow(() -> new RuntimeException("Customer not found"));

        customer.setStatus(!Boolean.parseBoolean(status));
        customerRepository.save(customer);
    }
}

interface CustomerRepository extends JpaRepository<Customer, Long> {
}