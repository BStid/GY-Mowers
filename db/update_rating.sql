UPDATE ratings SET rating = $2 WHERE user_id = $3 AND product_id = $1;
SELECT * FROM ratings WHERE product_id = $1;
