rem path to JSON configuration file.
SET pathToJSON=[path to JSON configuration file, including file name]
rem path where the transformed files will be created. Must be available to the web server.
SET pathToCSVFolder=[path to the folder where the transformed files will be created]

rem DO NOT touch from this point and beyond.
java -Dlog4j.configuration=log4j2.xml -cp resources;lib/commons-lang3-3.7.jar;lib/jackson-annotations-2.9.0.jar;lib/jackson-core-2.9.4.jar;lib/jackson-databind-2.9.4.jar;lib/log4j-api-2.11.0.jar;lib/log4j-core-2.11.0.jar; eu.europa.publications.euodp.dataatlas.ProcessorRunner %pathToJSON% %pathToCSVFolder%