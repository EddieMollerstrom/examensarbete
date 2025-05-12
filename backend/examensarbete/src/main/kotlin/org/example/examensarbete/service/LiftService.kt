package org.example.examensarbete.service

import jakarta.transaction.Transactional
import org.example.examensarbete.models.Lift
import org.example.examensarbete.models.LiftDto

import org.example.examensarbete.repository.LiftRepository
import org.example.examensarbete.repository.ExerciseRepository
import org.example.examensarbete.repository.UsersRepository
import org.springframework.stereotype.Service
import java.util.*

@Service
class LiftService(
    private val liftRepository: LiftRepository,
    private val userRepository: UsersRepository,
    private val exerciseRepository: ExerciseRepository
) {
    @Transactional
    fun createLiftForUser(liftDto: LiftDto, userId: UUID): Lift {
        val user = userRepository.findById(userId)
            .orElseThrow { RuntimeException("Användare inte hittad") }

        val exercise = exerciseRepository.findById(liftDto.exerciseId)
            .orElseThrow { RuntimeException("Övning inte hittad") }

        val lift = Lift(
            id = null,
            user = user,
            exercise = exercise,
            weight = liftDto.weight,
            reps = liftDto.reps,
            date = Date()
        )
        
        return liftRepository.save(lift)
    }

    fun getLiftsByUser(userId: UUID): List<Lift> {
        return liftRepository.findByUserId(userId)
    }

    fun getLiftsByUserAndExercise(userId: UUID, exerciseId: UUID): List<Lift> {
        return liftRepository.findByUserIdAndExerciseId(userId, exerciseId)
    }
}