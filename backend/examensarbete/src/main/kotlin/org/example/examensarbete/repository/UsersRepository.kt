package org.example.examensarbete.repository

import org.example.examensarbete.models.UserDto
import org.example.examensarbete.models.Users
import org.springframework.data.jpa.repository.JpaRepository
import java.util.UUID

interface UsersRepository : JpaRepository<Users, UUID> {
    fun findByEmail(email: String): Users
}