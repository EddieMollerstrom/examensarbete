package org.example.examensarbete.service

import org.example.examensarbete.models.Exercise
import org.example.examensarbete.models.ExerciseDTO
import org.example.examensarbete.models.MuscleGroup
import org.example.examensarbete.repository.ExerciseRepository
import org.example.examensarbete.repository.MuscleGroupRepository
import org.example.examensarbete.repository.UsersRepository
import org.springframework.stereotype.Service
import java.util.*

@Service
class ExerciseService (val exerciseRepository: ExerciseRepository, val usersRepository: UsersRepository, val muscleGroupRepository: MuscleGroupRepository) {
    fun createExercise(exerciseDTO: ExerciseDTO, userId: String?): Exercise {
        val muscleGroup = muscleGroupRepository.findById(exerciseDTO.muscleGroupId)
            .orElseThrow { IllegalArgumentException("MuscleGroup med id ${exerciseDTO.muscleGroupId} hittades inte") }

        var exercise = Exercise(
            name = exerciseDTO.name,
            muscleGroup = muscleGroup,
            creator = null
        )

        if (userId != null) {
            val creator = usersRepository.findById(UUID.fromString(userId))
                .orElseThrow { IllegalArgumentException("Användare med id $userId hittades inte") }

            exercise = exercise.copy(creator = creator)
        }

        return exerciseRepository.save(exercise)
    }

    fun getExercises(userId: String?, muscleGroupId: MuscleGroup): List<Exercise> {
        return if (userId != null) {
            try {
                val userUUID = UUID.fromString(userId)
                exerciseRepository.findByCreatorOrDefault(userUUID, muscleGroupId)
            } catch (e: IllegalArgumentException) {
                exerciseRepository.findDefaultExercises(muscleGroupId)
            }
        } else {
            exerciseRepository.findDefaultExercises(muscleGroupId)
        }
    }
}