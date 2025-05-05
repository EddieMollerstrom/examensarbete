package org.example.examensarbete.init

import org.example.examensarbete.models.Exercise
import org.example.examensarbete.models.MuscleGroup
import org.example.examensarbete.repository.ExerciseRepository
import org.example.examensarbete.repository.MuscleGroupRepository
import org.springframework.boot.CommandLineRunner
import org.springframework.stereotype.Component


@Component
class DataLoader(
    private val muscleGroupRepository: MuscleGroupRepository,
    private val exerciseRepository: ExerciseRepository
) : CommandLineRunner {

    enum class MuscleGroups {
        CHEST, BACK, BICEPS, TRICEPS, LEGS, SHOULDERS,
    }

    private val exercisesByMuscleGroup = mapOf(
        MuscleGroups.CHEST to listOf("benchpress", "pushups"),
        MuscleGroups.BACK to listOf("pullups", "latpulldown"),
        MuscleGroups.BICEPS to listOf("hammercurls", "bicepcurls"),
        MuscleGroups.TRICEPS to listOf("scullcrushers", "dips"),
        MuscleGroups.LEGS to listOf("squats", "legpress"),
        MuscleGroups.SHOULDERS to listOf("arnoldpress", "dunbbelllateralraise")
    )

    override fun run(vararg args: String?) {
        if (muscleGroupRepository.count() == 0L) {

            exercisesByMuscleGroup.forEach { (muscleGroupEnum, exerciseNames) ->
                val muscleGroup = MuscleGroup(name = muscleGroupEnum.name)
                val savedMuscleGroup = muscleGroupRepository.save(muscleGroup)

                val exercises = exerciseNames.map { exerciseName ->
                    Exercise(name = exerciseName, muscleGroup = savedMuscleGroup)
                }
                exerciseRepository.saveAll(exercises)
            }
        }
    }
}