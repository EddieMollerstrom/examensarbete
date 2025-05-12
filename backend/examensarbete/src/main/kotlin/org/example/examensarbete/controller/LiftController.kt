package org.example.examensarbete.controller

import org.example.examensarbete.models.Lift
import org.example.examensarbete.models.LiftDto
import org.example.examensarbete.service.LiftService
import org.springframework.web.bind.annotation.*
import java.util.UUID

@RestController
@RequestMapping("/lift")
class LiftController(private val liftService: LiftService) {

    @GetMapping("/user/{userId}")
    fun getLiftsByUser(@PathVariable userId: UUID): List<Lift> =
        liftService.getLiftsByUser(userId)

    @GetMapping("/user/{userId}/exercise/{exerciseId}")
    fun getLiftsByUserAndExercise(
        @PathVariable userId: UUID,
        @PathVariable exerciseId: UUID
    ): List<Lift> = liftService.getLiftsByUserAndExercise(userId, exerciseId)

    @PostMapping("/{userId}")
    fun createLiftForUser(
        @PathVariable userId: UUID,
        @RequestBody liftDto: LiftDto
    ): Lift = liftService.createLiftForUser(liftDto, userId)
}