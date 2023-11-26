package com.example.ChatProject_SWEL_SpringBoot.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.ChatProject_SWEL_SpringBoot.model.User;

public interface UserRepository extends JpaRepository<User, Long> {

}
