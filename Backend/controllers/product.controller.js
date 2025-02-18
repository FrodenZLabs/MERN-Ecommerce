import { Product } from "../models/products.models.js";
import { errorHandler } from "../utils/errorHandler.js";

export const addProduct = async (request, response, next) => {
  try {
    const { name, description, category, base_price, stock, images } =
      request.body;

    if (!request.user.isAdmin) {
      return next(errorHandler(403, "You are not allowed to create a product"));
    }
    if (!images || images.length !== 5) {
      return next(errorHandler(400, "You must provide exactly 5 images"));
    }

    const newProduct = new Product({
      name,
      description,
      category,
      base_price,
      stock,
      images,
    });

    const savedProduct = await newProduct.save();
    response.status(201).json({
      success: true,
      savedProduct,
      message: "Product added successfully",
    });
  } catch (error) {
    next(errorHandler(500, "Failed to add product", error));
  }
};

export const updateProduct = async (request, response, next) => {
  try {
    const productId = request.params.id;
    const isAdmin = request.user.isAdmin;
    const { name, description, category, base_price, stock, images } =
      request.body;

    // Ensure only admins can update products
    if (!isAdmin) {
      return next(errorHandler(403, "You are not allowed to update a product"));
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      { name, description, category, base_price, stock, images },
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return next(errorHandler(404, "Product not found"));
    }

    response.status(200).json({
      success: true,
      message: "Product updated successfully",
      updatedProduct,
    });
  } catch (error) {
    next(errorHandler(500, "Failed to update product", error));
  }
};

// Delete a product
export const deleteProduct = async (request, response, next) => {
  try {
    const productId = request.params.id;
    const isAdmin = request.user.isAdmin;

    if (!isAdmin) {
      return next(errorHandler(403, "You are not allowed to delete a product"));
    }
    const product = await Product.findById(productId);
    if (!product) {
      return next(errorHandler(404, "Product not found"));
    }

    await Product.findByIdAndDelete(productId);
    response.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    next(errorHandler(500, "Failed to delete product", error));
  }
};

// Get all products for customers
export const getAllProducts = async (request, response, next) => {
  try {
    const products = await Product.find();
    response.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    next(errorHandler(500, "Failed to get all products", error));
  }
};

// Get all products for customers
export const getProductByID = async (request, response, next) => {
  try {
    const productId = request.params.id;
    const products = await Product.findById(productId);
    if (!products) {
      return next(errorHandler(404, "Product not found"));
    }
    response.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    next(errorHandler(500, "Failed to get product", error));
  }
};
