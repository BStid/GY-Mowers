SELECT * FROM orders o
JOIN products p ON o.product_id = p.product_id
WHERE o.order_number = $1