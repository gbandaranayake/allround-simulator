package com.simulator.allround.router

import com.simulator.allround.handler.HttpRequestConf
import com.simulator.allround.handler.HttpRequestConfActionHandler
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.web.reactive.function.server.*


@Configuration
open class HttpRequestConfActionRouter{

    @Bean
    open fun route(actionHandler: HttpRequestConfActionHandler): RouterFunction<ServerResponse> {

        return RouterFunctions
            .route(
                RequestPredicates.POST("/create/http/request"), HandlerFunction<ServerResponse> {
                        actionHandler.create(it.bodyToMono<HttpRequestConf>())
                })
    }
}