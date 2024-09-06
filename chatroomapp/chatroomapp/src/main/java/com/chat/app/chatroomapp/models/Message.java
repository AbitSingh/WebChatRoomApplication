package com.chat.app.chatroomapp.models;


// Entity Class
// Message naam ka class esiliye banaya taaki baad mai es class ka object bana kai message
// ko store kar sakte hai.
public class Message 
{
	private String name;
	private String content;
	private String timestamp;
	
	//Constructor.f
	public Message(String name, String content, String timestamp) {
		super();
		this.name = name;
		this.content = content;
		this.timestamp = timestamp;
	}


	public String getTimestamp() {
		return timestamp;
	}


	public void setTimestamp(String timestamp) {
		this.timestamp = timestamp;
	}


	// Getters and Setters
	public String getName() 
	{
		return name;
	}

	public void setName(String name) 
	{
		this.name = name;
	}

	public String getContent() 
	{
		return content;
	}

	public void setContent(String content) 
	{
		this.content = content;
	}
	
	
}
