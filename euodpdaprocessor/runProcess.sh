#!/bin/bash
#Full path to JSON configuration file.
pathToJSON=[path to JSON configuration file, including file name]
#Path to the directory where the transformed files will be created. Please leave a trailing slash at the end of the path. Must be available to the web server.
pathToCSVFolder=[path to the folder where the transformed files will be created]

#DO NOT touch from this point and beyond.
java -Dlog4j.configuration=log4j2.xml -cp resources:lib/commons-lang3-3.7.jar:lib/jackson-annotations-2.9.0.jar:lib/jackson-core-2.9.4.jar:lib/jackson-databind-2.9.4.jar:lib/log4j-api-2.11.0.jar:lib/log4j-core-2.11.0.jar:lib/openDataPortalProcessor.jar eu.europa.publications.euodp.dataatlas.ProcessorRunner $pathToJSON $pathToCSVFolder
