package org.example.examensarbete.controller

import org.example.examensarbete.models.Exercise
import org.example.examensarbete.service.ExerciseService
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/exercise")
class ExerciseController (val exerciseService: ExerciseService) {
    @PostMapping
    fun createExercise(@RequestBody exercise: Exercise) = exerciseService.createExercise(exercise)

    /*@GetMapping
    fun getExercises(@RequestBody creator: String) : List<Exercise> = exerciseService.getExercises(creator)*/
}