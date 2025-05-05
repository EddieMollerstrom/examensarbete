package org.example.examensarbete.models

import jakarta.persistence.*
import java.util.UUID

@Entity
data class Users (
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    val id: UUID? = null,
    val username: String,
    @Column(unique = true)
    val email: String,
    val password: String,
    @OneToMany(mappedBy = "user", cascade = [CascadeType.ALL])
    val lifts: List<Lift>? = null
)

data class UserDto(
    val username: String,
)