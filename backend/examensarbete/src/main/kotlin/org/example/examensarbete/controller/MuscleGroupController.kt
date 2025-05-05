package org.example.examensarbete.controller

import org.example.examensarbete.models.MuscleGroup
import org.example.examensarbete.service.MuscleGroupService
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/muscleGroup")
class MuscleGroupController (val muscleGroupService: MuscleGroupService) {

    @GetMapping
    fun getMuscleGroups() : List<MuscleGroup> = muscleGroupService.getMuscleGroups()
}