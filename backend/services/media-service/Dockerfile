FROM gradle:8.5.0-jdk21-alpine AS builder

COPY common /backend/common
COPY buildSrc /backend/buildSrc
COPY gradle /backend/gradle
COPY settings.gradle /backend/settings.gradle
COPY services/media-service/build.gradle /backend/services/media-service/build.gradle
COPY services/media-service/src /backend/services/media-service/src

WORKDIR /backend/services/media-service/

ENV DOCKER_BUILD=true
RUN gradle build

FROM amazoncorretto:21-alpine3.19 AS runner

WORKDIR /app

COPY --from=builder /backend/services/media-service/build/libs/media-service-0.0.1-SNAPSHOT.jar /app/media-service.jar

ENTRYPOINT ["java", "-jar", "media-service.jar"]
