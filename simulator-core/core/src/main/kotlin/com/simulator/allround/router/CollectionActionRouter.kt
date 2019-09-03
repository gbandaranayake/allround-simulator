package com.simulator.allround.router

import com.simulator.allround.collection.CollectionActionHandler
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.web.reactive.function.server.*
import org.springframework.web.reactive.function.server.RequestPredicates.*
import org.springframework.web.reactive.function.server.RouterFunctions.nest
import org.springframework.web.reactive.function.server.RouterFunctions.route

@Configuration
open class CollectionActionRouter() {
    @Bean
    open fun routeCreateCollection(actionHandler: CollectionActionHandler): RouterFunction<ServerResponse> {
        return nest(path("/collections"),
                route(POST("/create"), HandlerFunction {
                    actionHandler.create(it.bodyToMono())
                }).andRoute(DELETE("/delete"), HandlerFunction {
                    actionHandler.delete(it.bodyToMono())
                }).andRoute(GET("/all"), HandlerFunction {
                    actionHandler.getAll()
                })
        )
    }
}