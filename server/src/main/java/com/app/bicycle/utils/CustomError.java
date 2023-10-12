package com.app.bicycle.utils;

public class CustomError extends RuntimeException {
    private CustomResponse customResponse;

    public CustomError(CustomResponse customResponse) {
        this.customResponse = customResponse;
    }

    public CustomError() {
    }

    public CustomResponse getCustomResponse() {
        return customResponse;
    }

    public void setCustomResponse(CustomResponse customResponse) {
        this.customResponse = customResponse;
    }
}
