package org.example.examensarbete.service

import org.example.examensarbete.models.MuscleGroup
import org.example.examensarbete.repository.MuscleGroupRepository
import org.springframework.stereotype.Service

@Service
class MuscleGroupService (val muscleGroupRepository: MuscleGroupRepository) {
    fun getMuscleGroups(): List<MuscleGroup> = muscleGroupRepository.findAll()

}