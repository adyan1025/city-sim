# Stage 1: Build the application (using Maven)
FROM maven:3.8.5-openjdk-17-slim AS builder

WORKDIR /app

COPY pom.xml ./
COPY src/main/java .

RUN mvn clean package

# Stage 2: Package the application
FROM openjdk:17-slim

WORKDIR /app

COPY --from=builder /app/target/*.jar app.jar

EXPOSE 8080

CMD ["java", "-jar", "app.jar"]