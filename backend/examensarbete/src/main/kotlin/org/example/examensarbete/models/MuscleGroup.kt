package org.example.examensarbete.models

import com.fasterxml.jackson.annotation.JsonIgnore
import jakarta.persistence.*
import java.util.UUID

@Entity
data class MuscleGroup(
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    val id: UUID? = null,

    val name: String,

    @OneToMany(mappedBy = "muscleGroup", cascade = [CascadeType.ALL])
    @JsonIgnore
    val exercises: MutableList<Exercise> = mutableListOf()
)

data class MuscleGroupDto(
    val name: String,
    val exercises: List<ExerciseDto>
)