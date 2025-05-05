package org.example.examensarbete.service

import org.example.examensarbete.models.Lift
import org.example.examensarbete.repository.LiftRepository
import org.springframework.stereotype.Service

@Service
class LiftService (val liftRepository : LiftRepository) {
    fun createLift(lift : Lift): Lift {
        return liftRepository.save(lift)
    }

    fun getLifts(): List<Lift> {
        // TODO: Logik för att bara hämta användarens lifts
        return liftRepository.findAll()
    }
}