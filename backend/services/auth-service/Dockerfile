FROM gradle:8.5.0-jdk21-alpine AS builder

COPY common /backend/common
COPY buildSrc /backend/buildSrc
COPY gradle /backend/gradle
COPY settings.gradle /backend/settings.gradle
COPY services/auth-service/build.gradle /backend/services/auth-service/build.gradle
COPY services/auth-service/src /backend/services/auth-service/src

WORKDIR /backend/services/auth-service/

ENV DOCKER_BUILD=true
RUN gradle build

FROM amazoncorretto:21-alpine3.19 AS runner

WORKDIR /app

COPY --from=builder /backend/services/auth-service/build/libs/auth-service-0.0.1-SNAPSHOT.jar /app/auth-service.jar

ENTRYPOINT ["java", "-jar", "auth-service.jar"]
