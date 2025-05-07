package org.example.examensarbete.auth

import io.jsonwebtoken.SignatureAlgorithm
import io.jsonwebtoken.io.Encoders
import io.jsonwebtoken.security.Keys
import jakarta.servlet.http.HttpServletResponse
import org.example.examensarbete.repository.UsersRepository
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseCookie
import org.springframework.http.ResponseEntity
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RestController

@RestController
class AuthController(
    private val usersRepository: UsersRepository,
    private val passwordEncoder: PasswordEncoder,
    private val jwtUtil: JwtUtil
) {

    @PostMapping("/login")
    fun login(
        @RequestBody request: LoginRequest,
        response: HttpServletResponse
    ): ResponseEntity<Any> {
        val user = usersRepository.findByEmail(request.email)
            ?: return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Fel användarnamn eller lösenord")

        if (!passwordEncoder.matches(request.password, user.password)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Fel användarnamn eller lösenord")
        }

        val token = jwtUtil.generateToken(user.email)

        val cookie = ResponseCookie.from("token", token)
            .httpOnly(true)
            .secure(false)
            .sameSite("Lax")
            .path("/")
            .maxAge(10 * 60 * 60) // 10 timmar
            .build()

        response.addHeader("Set-Cookie", cookie.toString())

        return ResponseEntity.ok("Login successful")
    }

    @PostMapping("/logout")
    fun logout(response: HttpServletResponse): ResponseEntity<String> {
        val cookie = ResponseCookie.from("token", "")
            .httpOnly(true)
            .secure(false)
            .sameSite("Lax")
            .path("/")
            .maxAge(0)
            .build()

        response.addHeader("Set-Cookie", cookie.toString())

        return ResponseEntity.ok("Logged out")
    }
}

data class LoginRequest(val email: String, val password: String)