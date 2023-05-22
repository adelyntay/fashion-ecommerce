const connection = require("../config/database");

const create = async (req, res) => {
  try {
    const { title, details, price, category } = req.body;

    // Insert product into products table
    const productQuery = 'INSERT INTO products (title, details, price, category) VALUES (?, ?, ?, ?)';
    const productValues = [title, details, price, category];

    connection.query(productQuery, productValues, (productError, productResults) => {
      if (productError) {
        console.error('Failed to create product:', productError);
        res.status(500).json({ error: 'Failed to create product' });
        return;
      }

      const productId = productResults.insertId;

        const createdProduct = {
          id: productId,
          title,
          details,
          price,
          category,
        };

        res.status(201).json(createdProduct);
      });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create product' });
  }
};

module.exports = {
  create,
};

