INSERT INTO service (service_date, pickup, complete, issue)
VALUES($1, $2, 'no', $3) RETURNING * FROM service;