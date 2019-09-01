package com.simulator.allround

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.data.mongodb.repository.config.EnableReactiveMongoRepositories

@EnableReactiveMongoRepositories
@SpringBootApplication
open class SimulatorCoreApplication

fun main(args: Array<String>) {
	runApplication<SimulatorCoreApplication>(*args)
}
