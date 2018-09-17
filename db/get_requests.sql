SELECT * FROM service s
JOIN users u ON s.user_id = u.user_id
WHERE s.complete = $1