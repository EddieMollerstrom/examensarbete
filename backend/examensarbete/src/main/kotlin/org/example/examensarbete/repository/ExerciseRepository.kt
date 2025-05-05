package org.example.examensarbete.repository

import org.example.examensarbete.models.Exercise
import org.springframework.data.jpa.repository.JpaRepository
import java.util.*

interface ExerciseRepository : JpaRepository<Exercise, UUID> {
    //fun findByCreator(creator: String): List<Exercise>
}