SELECT
    to_char(o.order_date, 'Mon dd, yyyy'),
    SUM(p.price)
FROM orders o
INNER JOIN products p
    ON p.product_id = o.product_id
WHERE 
    o.order_date > current_date - INTERVAL  ''$1'DAY'
GROUP BY
    o.order_date
ORDER BY order_date DESC; 