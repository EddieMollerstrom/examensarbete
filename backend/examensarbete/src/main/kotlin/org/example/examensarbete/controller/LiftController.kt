package org.example.examensarbete.controller

import org.example.examensarbete.models.Lift
import org.example.examensarbete.service.LiftService
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/lift")
class LiftController (val liftService: LiftService) {

    @GetMapping
    fun getLifts(): List<Lift> = liftService.getLifts()

    @PostMapping
    fun createLift(@RequestBody lift: Lift) : Lift = liftService.createLift(lift)
}