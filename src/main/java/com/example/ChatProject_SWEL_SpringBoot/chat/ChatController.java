package com.example.ChatProject_SWEL_SpringBoot.chat;


import com.example.ChatProject_SWEL_SpringBoot.model.ChatMessage;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.stereotype.Controller;

//
@Controller
public class ChatController {

    // method to send the message
    @MessageMapping("/chat.sendMessage") // URL to invoke the sendMessage method
    @SendTo("/topic/public") // it will automatically send the message to /topic/public
    public ChatMessage sendMessage(
            // instead of request body we use payload for websocket
            @Payload ChatMessage chatMessage // ChatMessage is our message Object - new class
    ) {
        return chatMessage;
    }

    // method to add user
    // when a new user is added others get notified
    @MessageMapping("/chat.addUser") // invoke method addUser
    @SendTo("/topic/public") // the message "new user joined.. " will also be added to the queue in /topic/public
    public ChatMessage addUser(
            @Payload ChatMessage chatMessage,
            SimpMessageHeaderAccessor headerAccessor
    ) {
        // Add username in web socket session
        headerAccessor.getSessionAttributes().put("username", chatMessage.getUser());
        return chatMessage;
    }



}