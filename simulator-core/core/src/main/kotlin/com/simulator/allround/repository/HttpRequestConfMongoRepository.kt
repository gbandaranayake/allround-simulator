package com.simulator.allround.repository

import com.simulator.allround.handler.HttpRequestConf
import org.springframework.data.repository.reactive.ReactiveCrudRepository

interface HttpRequestConfMongoRepository : ReactiveCrudRepository<HttpRequestConf, String> {

}