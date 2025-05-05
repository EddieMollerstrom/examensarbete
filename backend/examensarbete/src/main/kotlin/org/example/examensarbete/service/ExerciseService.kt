package org.example.examensarbete.service

import org.example.examensarbete.models.Exercise
import org.example.examensarbete.repository.ExerciseRepository
import org.springframework.stereotype.Service

@Service
class ExerciseService (val exerciseRepository: ExerciseRepository) {
    fun createExercise(exercise: Exercise): Exercise {
        // TODO: Logik för vem som skapade den
        return exerciseRepository.save(exercise)
    }

    /*fun getExercises(creator: String): List<Exercise> {
        // TODO: Endast hämta original övningarna plus de som user själv har skapat
        val exercises = exerciseRepository.findByCreator(creator = creator)
        return exercises
    }*/
}