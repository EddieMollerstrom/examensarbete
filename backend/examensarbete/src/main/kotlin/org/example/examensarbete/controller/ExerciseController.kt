package org.example.examensarbete.controller

import org.example.examensarbete.models.Exercise
import org.example.examensarbete.models.ExerciseDTO
import org.example.examensarbete.models.MuscleGroup
import org.example.examensarbete.service.ExerciseService
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/exercise")
class ExerciseController (val exerciseService: ExerciseService) {
    @PostMapping
    fun createExercise(
        @RequestBody exerciseDTO: ExerciseDTO,
        @RequestParam(required = false) userId: String?
    ): ResponseEntity<Exercise> {
        val createdExercise = exerciseService.createExercise(exerciseDTO, userId)
        return ResponseEntity(createdExercise, HttpStatus.CREATED)
    }

    @GetMapping
    fun getExercises(@RequestParam(required = false) userId: String?, @RequestParam(required = true) muscleGroupId: MuscleGroup): List<Exercise> =
        exerciseService.getExercises(userId, muscleGroupId)
}