package org.example.examensarbete.repository

import org.example.examensarbete.models.Exercise
import org.example.examensarbete.models.MuscleGroup
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param
import java.util.*

interface ExerciseRepository : JpaRepository<Exercise, UUID> {
    @Query("SELECT e FROM Exercise e WHERE e.creator.id = :userId OR e.creator IS NULL AND e.muscleGroup = :muscleGroupId")
    fun findByCreatorOrDefault(@Param("userId") userId: UUID, @Param("muscleGroupId") muscleGroupId: MuscleGroup): List<Exercise>

    @Query("SELECT e FROM Exercise e WHERE e.creator IS NULL AND e.muscleGroup = :muscleGroupId")
    fun findDefaultExercises(@Param("muscleGroupId") muscleGroupId: MuscleGroup): List<Exercise>
}