package com.example.ChatProject_SWEL_SpringBoot.model;


import jakarta.persistence.*;
import com.example.ChatProject_SWEL_SpringBoot.model.User;
import com.example.ChatProject_SWEL_SpringBoot.repository.UserRepository;
import com.example.ChatProject_SWEL_SpringBoot.exeption.ResourceNotFoundException;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column(name = "user_name") // Update: Correct usage of Column name attribute
    private String userName;

    @Column(name = "password") // Update: Correct usage of Column name attribute
    private String password;

}
