package com.simulator.allround.repository

import com.simulator.allround.handler.HttpRequest
import org.springframework.data.repository.reactive.ReactiveCrudRepository
import reactor.core.publisher.Flux

interface HttpRequestMongoRepository : ReactiveCrudRepository<HttpRequest, String> {
    fun findByCollectionId(collectionId: String?): Flux<HttpRequest>
}