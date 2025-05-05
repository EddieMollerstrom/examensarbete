package org.example.examensarbete.repository

import org.example.examensarbete.models.MuscleGroup
import org.springframework.data.jpa.repository.JpaRepository
import java.util.*

interface MuscleGroupRepository : JpaRepository<MuscleGroup, UUID> {}