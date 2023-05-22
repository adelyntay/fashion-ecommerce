const connection = require("../config/database");

const create = (req, res) => {
    const { product_id, sizes } = req.body;
  
    const sizeInsertions = sizes.map((size) => [
      product_id,
      size.size,
      size.quantity,
    ]);
  
    const query = 'INSERT INTO sizes (product_id, size, quantity) VALUES ?';
  
    connection.query(query, [sizeInsertions], (error, results) => {
      if (error) {
        console.error('Failed to create sizes:', error);
        res.status(500).json({ error: 'Failed to create sizes' });
        return;
      }
  
      res.status(201).json({ message: 'Sizes created successfully' });
    });
  };
  
  module.exports = {
    create,
  };