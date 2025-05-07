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

    @GetMapping("/users")
    fun getAll(): List<Users> = usersService.getAllUsers()

    @GetMapping("/me")
    fun me(principal: Principal): ResponseEntity<String> {
        return ResponseEntity.ok("Du är inloggad som ${principal.name}")
    }
}