package com.simulator.allround

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class SimulatorCoreApplication

fun main(args: Array<String>) {
	runApplication<SimulatorCoreApplication>(*args)
}
