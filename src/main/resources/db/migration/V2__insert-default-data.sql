-- Insert default admin user (password: 123456)
INSERT INTO usuarios (nombre, email, clave) VALUES ('Admin', 'admin@forohub.com', '$2a$10$Y50UaMFOxteibQEYCzwnu.1bN7X5dcSGFt8R4W3.g0.7F6.3.2');

-- Insert default course
INSERT INTO cursos (nombre, categoria) VALUES ('Spring Boot Entrants', 'Programacion');
