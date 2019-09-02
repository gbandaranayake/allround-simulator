package com.simulator.allround.router

import com.simulator.allround.collection.CollectionActionHandler
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.web.reactive.function.server.*

@Configuration
open class CollectionActionRouter() {
    @Bean
    open fun routeCreateCollection(actionHandler: CollectionActionHandler): RouterFunction<ServerResponse> {
        return RouterFunctions
                .route(
                        RequestPredicates.POST("/collections/create"), HandlerFunction {
                    actionHandler.create(it.bodyToMono())
                })
    }

    @Bean
    open fun routeGetAllCollections(actionHandler: CollectionActionHandler): RouterFunction<ServerResponse> {
        return RouterFunctions
                .route(
                        RequestPredicates.GET("/collections/all"), HandlerFunction { actionHandler.getAll() }
                )
    }
}