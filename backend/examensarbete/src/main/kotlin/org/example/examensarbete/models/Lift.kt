package org.example.examensarbete.models

import com.fasterxml.jackson.annotation.JsonIgnore
import jakarta.persistence.*
import java.util.*

@Entity
data class Lift(
    @Id @GeneratedValue(strategy = GenerationType.AUTO)
    val id: UUID? = null,

    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonIgnore
    val user: Users,

    @ManyToOne
    @JoinColumn(name = "exercise_id")
    @JsonIgnore
    val exercise: Exercise,

    val weight: Double,
    val reps: Int,
    val date: Date
) {
    @Transient
    fun getUserId(): UUID = user.id!!

    @Transient
    fun getExerciseName(): String = exercise.name

    @Transient
    fun getExerciseId(): UUID = exercise.id!!
}

data class LiftDto(
    val weight: Double,
    val reps: Int,
    val exerciseId: UUID
)