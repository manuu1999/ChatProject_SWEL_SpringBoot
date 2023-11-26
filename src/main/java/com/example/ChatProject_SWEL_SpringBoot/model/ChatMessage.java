package com.example.ChatProject_SWEL_SpringBoot.model;

import com.example.ChatProject_SWEL_SpringBoot.model.MessageType;
import lombok.*;

// classic java object class

// all annotations we need for our application
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ChatMessage {

    private MessageType type;
    private String content;
    private String user;
    private String password;

}
