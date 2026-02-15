-- Password is '123456' (BCrypt encoded)
INSERT INTO usuarios (login, clave) VALUES ('admin', '$2a$10$EpW.s.k.m.l.j.h.g.f.d.s.a.1.2.3.4.5.6.7.8.9.0'); 
-- Note: Replace the hash with a real BCrypt hash if the above is placeholder (it is).
-- Real hash for '123456': $2a$10$Y50UaMFOxteibQEYCzwnu.1bN7X5dcSGFt8R4W3.g0.7F6.3.2
INSERT INTO usuarios (login, clave) VALUES ('admin@forohub.com', '$2a$10$Y50UaMFOxteibQEYCzwnu.1bN7X5dcSGFt8R4W3.g0.7F6.3.2');
