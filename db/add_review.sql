INSERT INTO ratings (product_id, comment, user_id)
VALUES($1, $2, $3);
SELECT * FROM ratings WHERE product_id = $1;