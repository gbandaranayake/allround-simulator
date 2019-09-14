package com.simulator.allround.router

import com.simulator.allround.handler.HttpRequestActionHandler
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.web.reactive.function.server.*


@Configuration
open class HttpRequestActionRouter(){

    @Bean
    open fun route(actionHandler: HttpRequestActionHandler): RouterFunction<ServerResponse> {
        return RouterFunctions.nest(RequestPredicates.path("/http/requests"),
                RouterFunctions.route(RequestPredicates.POST("/save"), HandlerFunction {
                    actionHandler.save(it.bodyToMono())
                }).andRoute(RequestPredicates.DELETE("/delete"), HandlerFunction {
                    actionHandler.deleteById(it.queryParam("requestId").orElse(""))
                }).andRoute(RequestPredicates.GET("/all"), HandlerFunction {
                    actionHandler.fetchAllRequestsForCollection(it.queryParam("collectionId").orElse(""))
                }).andRoute(RequestPredicates.POST("/execute"), HandlerFunction {
                    actionHandler.executeRequest(it.bodyToMono())
                })
        )
    }
}