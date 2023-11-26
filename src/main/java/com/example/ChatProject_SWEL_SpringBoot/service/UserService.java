package com.example.ChatProject_SWEL_SpringBoot.service;

import java.util.List;

import com.example.ChatProject_SWEL_SpringBoot.model.User;


public interface UserService {
    User createUser(User user);

    User getUserById(long userID);

}