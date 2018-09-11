UPDATE users SET first_name = $2, last_name = $3, address = $4, zip = $5, state = $6, email = $7, phone = $8, message = $9 WHERE authid = $1; 
SELECT * FROM users WHERE authid = $1;
