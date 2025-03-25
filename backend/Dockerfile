FROM amazoncorretto:11-alpine

# Add app user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

# Set working directory
WORKDIR /app

# Copy the jar file
COPY target/pokemon-api-1.0-SNAPSHOT.jar /app/app.jar

# Expose the port
EXPOSE 8080

# Set the entrypoint
ENTRYPOINT ["java", "-jar", "/app/app.jar"] 