package org.example.securityproject.services;

import org.example.securityproject.model.User;
import org.example.securityproject.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;



// Ovaj servis je namerno izdvojen kao poseban u ovom primeru.
// U opstem slucaju UserServiceImpl klasa bi mogla da implementira UserDetailService interfejs.
@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    // Funkcija koja na osnovu username-a iz baze vraca objekat User-a
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(username); //email isto sto i username
        if (user == null) {
            throw new UsernameNotFoundException(String.format("No user found with username '%s'.", username));
        } else {
            return user;
        }
    }

}
