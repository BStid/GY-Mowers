SELECT
    p.title,
    COUNT(o.product_id)
FROM orders o
INNER JOIN products p
    ON p.product_id = o.product_id
WHERE 
    o.order_date >= current_date - INTERVAL ''$1'DAY'
GROUP BY
    p.title
ORDER BY COUNT DESC LIMIT $2; 