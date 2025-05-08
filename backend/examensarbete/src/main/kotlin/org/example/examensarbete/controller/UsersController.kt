package org.example.examensarbete.controller

import org.example.examensarbete.models.UserDto
import org.example.examensarbete.models.Users
import org.example.examensarbete.service.UsersService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import java.security.Principal

@RestController
class UsersController (private val usersService: UsersService) {
    @PostMapping("/register")
    fun create(@RequestBody user: Users): UserDto = usersService.createUser(user)

    @GetMapping("/me")
    fun me(principal: Principal): ResponseEntity<Map<String, String>> {
        val email = principal.name
        val userId = usersService.getUserIdByEmail(email)

        val response = mapOf(
            "email" to email,
            "userId" to userId
        )

        return ResponseEntity.ok(response)
    }
}