package com.chat.app.chatroomapp.controllers;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.chat.app.chatroomapp.models.Message;


@RestController   //Yeah ek tarike ki api banegi, humne json return karna hai. so rest controller
public class MessageController 
{
	// Yeah function message lega aur sabko global bej dega. uske liye yeah annotation use karo
	@MessageMapping("/message")  // es url ka message, jitne logo nai niche vala subscribe
	@SendTo("/topic/return-to")  // kiya hoga unka message chala jayega.
	public Message getContent(@RequestBody Message message)
	{
		try
		{
			// Processing
			// eska matlab koi banda message beje 2 sec kai baad jaye.
			Thread.sleep(100); 
		}
		catch(InterruptedException e)
		{
			e.printStackTrace();
		}
		
		return message;
	}
}
