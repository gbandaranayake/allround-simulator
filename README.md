# allround-simulator

###. Modules

1. Simulator core
2. Simulator UI

### Pre requisites

01. Java 8+
02. Node 12.x
03. Mongo 4.x
04. Maven 3.6+
05. Kotlin 1.3.50+


### How to build

* Run 'mvn clean install' on the project base directory and both modules should build
* To start the core, move simulator-core/core/target/generated-resources/appassembler/jsw/allround-simulator/bin and 
run 'allround-simulator console/start'
* To start simulator ui run 'npm start'