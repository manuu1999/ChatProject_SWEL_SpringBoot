package com.example.ChatProject_SWEL_SpringBoot.service;


import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.example.ChatProject_SWEL_SpringBoot.model.User;
import com.example.ChatProject_SWEL_SpringBoot.repository.UserRepository;
import com.example.ChatProject_SWEL_SpringBoot.exeption.ResourceNotFoundException;



@Service
@Transactional
public class UserServiceImpl implements UserService{


    @Autowired
    private UserRepository userRepository;


    @Override
    public User createUser(User user) {
        return userRepository.save(user);
    }


    @Override
    public User getUserById(long productId) {

        Optional<User> productDb = this.userRepository.findById(productId);

        if (productDb.isPresent()) {
            return productDb.get();
        } else {
            throw new ResourceNotFoundException("Record not found with id : " + productId);
        }
    }

}