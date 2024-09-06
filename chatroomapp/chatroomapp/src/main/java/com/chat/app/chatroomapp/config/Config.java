package com.chat.app.chatroomapp.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;


@Configuration  // This is used to make class configuration file.
@EnableWebSocketMessageBroker   // Matlab send-recieve vali chej enable hogi
public class Config implements WebSocketMessageBrokerConfigurer
{
	// for server
	@Override
	public void registerStompEndpoints(StompEndpointRegistry registry)
	{
		// yeah batayega ki agar banda connect karna chahe, to kis url pai connectivity hogi.
		registry.addEndpoint("/server1").withSockJS();
	}
	
	// for client
	@Override
	public void configureMessageBroker(MessageBrokerRegistry registry)
	{
		//Es url pai simple broker enable hoga, so yeah topic broadcast hoga.
		registry.enableSimpleBroker("/topic");
		registry.setApplicationDestinationPrefixes("/app");
		
	}
}
