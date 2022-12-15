package com.codecool.tauschcool.model;

import java.util.Date;

public class UserToken {
    private Long userId;
    private String userName;
    private String token;
    private Date created;

    public UserToken(Long userId, String userName, String token) {
        this.userId = userId;
        this.userName = userName;
        this.token = token;
        this.created = new Date();
    }

    public Long getUserId() {
        return userId;
    }

    public String getUserName() {
        return userName;
    }

    public String getToken() {
        return token;
    }

    public Date getCreated() {
        return created;
    }
}
