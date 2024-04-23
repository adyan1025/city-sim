# Use a lightweight base image
FROM adoptopenjdk/openjdk16:jre

# Set the working directory in the container
WORKDIR /app

# Copy the compiled JAR file into the container
COPY target/CitySim-0.0.1-SNAPSHOT.jar app.jar

# Expose the port your application runs on
EXPOSE 8080

# Specify the command to run your application
CMD ["java", "-jar", "app.jar"]