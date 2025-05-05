package org.example.examensarbete.service

import org.example.examensarbete.models.UserDto
import org.example.examensarbete.models.Users
import org.example.examensarbete.repository.UsersRepository
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Service

@Service
class UsersService (
    private val usersRepository: UsersRepository,
    private val passwordEncoder: PasswordEncoder
) {
    /*fun getByEmail(email: String): Users? {
        val user = usersRepository.findByEmail(email)

        if (user != null) {
            return user
        }

        return null
    }*/
    fun getAllUsers(): List<Users> = usersRepository.findAll()

    fun createUser(user: Users): UserDto {
        val hashedPassword = passwordEncoder.encode(user.password)
        val userWithHashedPassword = user.copy(password = hashedPassword)

        usersRepository.save(userWithHashedPassword)

        return UserDto(username = userWithHashedPassword.username)
    }
}