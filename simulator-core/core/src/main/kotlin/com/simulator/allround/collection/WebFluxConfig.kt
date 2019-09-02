package com.simulator.allround.collection

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.web.reactive.config.CorsRegistry
import org.springframework.web.reactive.config.WebFluxConfigurer
import org.springframework.web.reactive.config.WebFluxConfigurerComposite


@Configuration
open class WebFluxConfig() {

    @Bean
    open fun corsConfigurer(): WebFluxConfigurer {
        return object : WebFluxConfigurerComposite() {
            override fun addCorsMappings(registry: CorsRegistry) {
                registry!!.addMapping("/**").allowedOrigins("*")
                        .allowedMethods("*")
            }
        }
    }
}
