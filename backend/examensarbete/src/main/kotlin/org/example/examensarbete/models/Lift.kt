package org.example.examensarbete.models

import jakarta.persistence.*
import java.util.*

@Entity
data class Lift(
    @Id @GeneratedValue(strategy = GenerationType.AUTO)
    val id: UUID? = null,
    @ManyToOne(cascade = [(CascadeType.ALL)])
    @JoinColumn(name = "user_id")
    val user: Users,
    @OneToOne
    val exercise: Exercise,
    val weight: Double,
    val reps: Int,
    val date: Date
)

data class LiftDto(
    val user: UserDto,
    val exercise: ExerciseDTO,
    val weight: Double,
    val reps: Int,
)