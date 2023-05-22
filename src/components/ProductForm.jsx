import { useForm } from 'react-hook-form';

export default function ProductForm () {
  const { 
    register,
    handleSubmit,
    formState: { errors } } = useForm();

  const onSubmit = (data) => {
    const productData = {
      title: data.title,
      details: data.details,
      price: data.price,
      category: data.category,
    };

    // Send product data to the backend
    fetch('/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productData),
    })
    .then((response) => response.json())
    .then((productResponse) => {
      const sizeData = {
        product_id: productResponse.id,
        sizes: [
          { size: 'S', quantity: data.stocksS },
          { size: 'M', quantity: data.stocksM },
          { size: 'L', quantity: data.stocksL },
          { size: 'XL', quantity: data.stocksXL }
        ]
      };

      // Send size data to the backend
      fetch('/api/sizes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sizeData),
      })
        .then((response) => response.json())
        .then((sizeResponse) => {
          console.log('Product created:', productResponse);
          console.log('Sizes created:', sizeResponse);
        })
        .catch((error) => {
          console.error('Error creating sizes:', error);
        });
    })
    .catch((error) => {
      console.error('Error creating product:', error);
    });
};

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text"
        placeholder="Title"
        {...register("title", { required: true })}
      />
      {errors.title && <span>This field is required</span>}

      <input
        type="text"
        placeholder="Details"
        {...register("details", { required: true })}
      />
      {errors.details && <span>This field if required</span>}

      <input
        type="number"
        step="0.01"
        placeholder="Price"
        {...register("price", { required: true })}
      />
      {errors.price && <span>This field is required</span>}

      <select {...register("category", { required: true })}>
        <option value="">Select Category</option>
        <option value="Top">Top</option>
        <option value="Bottom">Bottom</option>
        <option value="Outerwear">Outerwear</option>
        <option value="Accessories">Accessories</option>
      </select>
      {errors.cateogry && <span>This field is required</span>}

      <input
        type="number"
        placeholder="Stocks - S"
        {...register("stocksS", { required: true })}
      />
      {errors.stocksS && <span>This field is required</span>}

      <input
      type="number"
      placeholder="Stocks - M"
      {...register("stocksM", { required: true })}
      />
      {errors.stocksM && <span>This field is required</span>}

      <input
      type="number"
      placeholder="Stocks - L"
      {...register("stocksL", { required: true })}
      />
      {errors.stocksL && <span>This field is required</span>}

      <input
      type="number"
      placeholder="Stocks - XL"
      {...register("stocksXL", { required: true })}
      />
      {errors.stocksXL && <span>This field is required</span>}

      <button type="submit">Submit</button>
    </form>
  );
};
