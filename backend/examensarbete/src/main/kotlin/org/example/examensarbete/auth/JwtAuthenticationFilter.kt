package org.example.examensarbete.auth

import jakarta.servlet.FilterChain
import jakarta.servlet.http.HttpServletRequest
import jakarta.servlet.http.HttpServletResponse
import org.example.examensarbete.repository.UsersRepository
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.stereotype.Component
import org.springframework.web.filter.OncePerRequestFilter

@Component
class JwtAuthenticationFilter(
    private val jwtUtil: JwtUtil,
    private val usersRepository: UsersRepository
) : OncePerRequestFilter() {

    override fun doFilterInternal(
        request: HttpServletRequest,
        response: HttpServletResponse,
        filterChain: FilterChain
    ) {
        val header = request.getHeader("Authorization")
        val token = if (header != null && header.startsWith("Bearer ")) {
            header.substring(7)
        } else null

        val email = token?.let { jwtUtil.validateToken(it) }

        if (email != null && SecurityContextHolder.getContext().authentication == null) {
            val user = usersRepository.findByEmail(email)
            if (user != null) {
                val auth = UsernamePasswordAuthenticationToken(email, null, listOf())
                SecurityContextHolder.getContext().authentication = auth
            }
        }

        filterChain.doFilter(request, response)
    }
}