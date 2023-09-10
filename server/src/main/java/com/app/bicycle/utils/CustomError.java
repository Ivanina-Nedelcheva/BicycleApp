package com.app.bicycle.utils;

public class CustomError extends Throwable {
    private CustomResponse customResponse;

    public CustomError(CustomResponse customResponse) {
        this.customResponse = customResponse;
    }

    public CustomResponse getCustomResponse() {
        return customResponse;
    }

    public void setCustomResponse(CustomResponse customResponse) {
        this.customResponse = customResponse;
    }
}
