package com.simulator.allround.handler

import com.simulator.allround.repository.CollectionMongoRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.data.annotation.Id
import org.springframework.http.MediaType
import org.springframework.stereotype.Component
import org.springframework.web.reactive.function.BodyInserters
import org.springframework.web.reactive.function.server.ServerResponse
import reactor.core.publisher.Mono
import java.util.*
import kotlin.collections.ArrayList

@Component
class HttpRequestActionHandler(@Autowired val collectionRepo: CollectionMongoRepository){

    fun create(request:Mono<HttpRequest>): Mono<ServerResponse> {
        return request.flatMap {
            collectionRepo.findById(it.collectionId).flatMap { col ->
                val mutableRequests: MutableList<HttpRequest> = col.httpRequests?.toMutableList() ?: ArrayList()
                mutableRequests.add(it)
                col.httpRequests = mutableRequests
                collectionRepo.save(col)
            }
        }.flatMap {
            ServerResponse.ok().contentType(MediaType.APPLICATION_JSON).body(BodyInserters.fromObject(it.httpRequests ?: Collections.emptyList()))
        }
    }
}

data class HttpRequest(@Id val id: String?, val uri: String, val body:String, val headers: Map<String, String>, val collectionId: String)