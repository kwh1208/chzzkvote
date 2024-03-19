package chat.chzzkchat;

import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.client.HttpServerErrorException;

@ControllerAdvice
public class ChkExceptionHandler {
    @ExceptionHandler(HttpServerErrorException.class)
    public String CookieError() {
        return "cookieError";
    }


    @ExceptionHandler(Exception.class)
    public String Error(){
        return "Error";
    }
}
