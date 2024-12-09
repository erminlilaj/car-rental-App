package it.linksmt.rental.controller;

import it.linksmt.rental.dto.CreateUserRequest;
import it.linksmt.rental.dto.LoginUserRequest;
import it.linksmt.rental.dto.RegisterUserRequest;
import it.linksmt.rental.entity.UserEntity;

import it.linksmt.rental.exception.ServiceException;
import it.linksmt.rental.service.AuthenticationService;
import it.linksmt.rental.service.JwtService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/auth")
@RestController
@CrossOrigin
public class AuthenticationController {

    private final JwtService jwtService;

    private final AuthenticationService authenticationService;
    public AuthenticationController(JwtService jwtService, AuthenticationService authenticationService) {
        this.jwtService = jwtService;
        this.authenticationService = authenticationService;
    }
    @PostMapping("/signup")
    public ResponseEntity<?> register(@RequestBody RegisterUserRequest registerUserRequest) {

            UserEntity registeredUser = authenticationService.signUp(registerUserRequest);
            return ResponseEntity.ok().body(registeredUser);

    }
    @PostMapping("/login")
    public ResponseEntity<?> authenticate(@RequestBody LoginUserRequest loginUserRequest){

           UserEntity user = authenticationService.authenticate(loginUserRequest);
           String token = jwtService.generateToken(user);
//        LoginResponse loginResponse=new LoginResponse();
//        loginResponse.setToken(token);
//        loginResponse.setExpiresIn(jwtService.getExpirationTime());
           return ResponseEntity.ok(token);

    }

}
