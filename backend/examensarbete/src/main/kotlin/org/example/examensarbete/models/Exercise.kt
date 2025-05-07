package org.example.examensarbete.models

import jakarta.persistence.*
import java.util.*

@Entity
data class Exercise(
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    val id: UUID? = null,

    val name: String,

    @ManyToOne
    @JoinColumn(name = "muscle_group_id")
    val muscleGroup: MuscleGroup,

    @ManyToOne(optional = true)
    @JoinColumn(name = "creator_id")
    val creator: Users? = null
)

data class ExerciseDTO(
    val name: String,
    val muscleGroupId: UUID
)