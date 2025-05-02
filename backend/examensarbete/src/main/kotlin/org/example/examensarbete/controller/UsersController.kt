package org.example.examensarbete.controller

import org.example.examensarbete.models.Users
import org.example.examensarbete.service.UsersService
import org.springframework.web.bind.annotation.*

@RestController
class UsersController (private val usersService: UsersService) {
    @PostMapping("/register")
    fun create(@RequestBody user: Users): Users = usersService.createUser(user)

    @GetMapping("/users")
    fun getAll(): List<Users> = usersService.getAllUsers()
}