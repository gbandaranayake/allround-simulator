package com.simulator.allround.system

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.web.cors.reactive.CorsWebFilter
import org.springframework.web.cors.CorsConfiguration
import org.springframework.web.cors.reactive.UrlBasedCorsConfigurationSource

@Configuration
open class WebFluxCorsFilterConfig() {

    @Bean
    open fun corsWebFilter(): CorsWebFilter {
        val corsConfig = CorsConfiguration().applyPermitDefaultValues()
        corsConfig.allowedOrigins = listOf("*")
        corsConfig.addAllowedMethod("*")
        val source = UrlBasedCorsConfigurationSource()
        source.registerCorsConfiguration("/**", corsConfig)
        return CorsWebFilter(source)
    }
}
