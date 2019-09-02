package com.simulator.allround.repository

import org.springframework.data.repository.reactive.ReactiveCrudRepository

interface CollectionMongoRepository: ReactiveCrudRepository<com.simulator.allround.collection.Collection, String> {

}