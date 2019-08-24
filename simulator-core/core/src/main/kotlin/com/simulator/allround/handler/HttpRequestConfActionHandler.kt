package com.simulator.allround.handler

import org.springframework.http.MediaType
import org.springframework.stereotype.Component
import org.springframework.web.reactive.function.BodyInserters
import org.springframework.web.reactive.function.server.ServerResponse
import reactor.core.publisher.Mono

@Component
class HttpRequestConfActionHandler{

    fun create(requestConf:Mono<HttpRequestConf>): Mono<ServerResponse> {
        return requestConf.flatMap { ServerResponse.ok().contentType(MediaType.APPLICATION_JSON)
            .body(BodyInserters.fromObject(HttpRequestConf("test-id", it.url, it.body)))
        }
    }
}

data class HttpRequestConf(val id:String?, val url:String, val body:String)