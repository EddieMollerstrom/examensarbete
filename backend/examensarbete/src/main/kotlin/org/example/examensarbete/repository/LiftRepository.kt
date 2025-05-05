package org.example.examensarbete.repository

import org.example.examensarbete.models.Lift
import org.springframework.data.jpa.repository.JpaRepository
import java.util.UUID

interface LiftRepository : JpaRepository<Lift, UUID> {}