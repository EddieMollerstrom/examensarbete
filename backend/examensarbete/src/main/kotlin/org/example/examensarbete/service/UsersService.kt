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
    fun getUserIdByEmail(email: String): String {
        val user = usersRepository.findByEmail(email)
        return user.id.toString()
    }

    fun createUser(user: Users): UserDto {
        val hashedPassword = passwordEncoder.encode(user.password)
        val userWithHashedPassword = user.copy(password = hashedPassword)

        usersRepository.save(userWithHashedPassword)

        return UserDto(username = userWithHashedPassword.username)
    }
}