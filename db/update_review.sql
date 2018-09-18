UPDATE ratings SET comment = $2 WHERE user_id = $3 AND product_id = $1;
SELECT * FROM ratings r JOIN users u ON r.user_id = u.user_id WHERE product_id = $1;