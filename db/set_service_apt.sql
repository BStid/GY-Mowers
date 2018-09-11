INSERT INTO service (service_date, pickup, complete, issue, user_id) VALUES($1, $2, 'no', $3, $4);
SELECT * FROM service WHERE user_id = $4;