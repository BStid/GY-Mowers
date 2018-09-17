SELECT * FROM service s
JOIN users u ON s.user_id = u.user_id
WHERE s.service_id = $1