package com.simulator.allround.handler

import com.simulator.allround.repository.HttpRequestConfMongoRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.mapping.Document
import org.springframework.http.MediaType
import org.springframework.stereotype.Component
import org.springframework.web.reactive.function.BodyInserters
import org.springframework.web.reactive.function.server.ServerResponse
import reactor.core.publisher.Mono

@Component
class HttpRequestConfActionHandler(@Autowired val configRepository: HttpRequestConfMongoRepository){

    fun create(requestConf:Mono<HttpRequestConf>): Mono<ServerResponse> {
        return requestConf.flatMap {
            configRepository.save(it)
        }.flatMap {
            ServerResponse.ok().contentType(MediaType.APPLICATION_JSON).body(BodyInserters.fromObject(it))
        }
    }
}

@Document(collection = "http-req")
data class HttpRequestConf(@Id val id:String?, val url:String, val body:String)