package org.example.examensarbete.repository

import org.example.examensarbete.models.Exercise
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param
import java.util.*

interface ExerciseRepository : JpaRepository<Exercise, UUID> {
    @Query("SELECT e FROM Exercise e WHERE e.creator.id = :userId OR e.creator IS NULL")
    fun findByCreatorOrDefault(@Param("userId") userId: UUID): List<Exercise>

    @Query("SELECT e FROM Exercise e WHERE e.creator IS NULL")
    fun findDefaultExercises(): List<Exercise>
}