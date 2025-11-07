import mongoose from "mongoose";
import { CategoryModel } from "../../models/category.js";
import { ApiResponse } from "../../libs/apiResponse.js";

export const CreateCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name) {
      return res
        .status(400)
        .json({ success: false, message: "Name is required" });
    }

    const newCategory = new CategoryModel({ name, description });
    const savedCategory = await newCategory.save();

    return res.status(201).json({
      success: true,
      message: "Category created successfully",
      data: savedCategory,
    });
  } catch (error) {
    console.error(error);
    return ApiResponse.serverError(res);
  }
};
export const GetCategory = async (req, res) => {
  try {
    const categories = await CategoryModel.find();

    if (categories.length == 0) {
      return res.status(404).json({
        success: false,
        message: "No categories found",
      });
    }
    const result = await CategoryModel.aggregate([
      {
        $lookup: {
          from: "menus", // the other collection
          localField: "_id", // category _id
          foreignField: "categoryId", // menus.categoryId
          as: "items", // store joined menus in "items"
        },
      },

      {
        $project: {
          _id: 1,
          name: 1,
          description: 1,
          itemCount: { $size: "$items" }, // number of menus
          createdAt: 1,
          updatedAt: 1,
        },
      },
      {
        $group: {
          _id: null,
          categories: { $push: "$$ROOT" },
          totlaItem: { $sum: "$itemCount" },
          averageItemPerCategory: { $avg: "$itemCount" },
        },
      },
      {
        $project: {
          _id: 0,
          categories: 1,
          totalItem: 1,
          totalCategories: { $size: "$categories" },
          averageItemPerCategory: 1,
        },
      },
    ]);

    return res.status(201).json({
      success: true,
      message: "Categories Fetched successfully",
      data: result[0],
    });
  } catch (error) {
    console.error(error);
    return ApiResponse.serverError(res);
  }
};

export const UpdateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    // Check if ID is provided
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Id is a required field.",
      });
    }

    // Check if category exists
    const existCat = await CategoryModel.findById(id);
    if (!existCat) {
      return res.status(404).json({
        success: false,
        message: "No category found with the provided ID.",
      });
    }

    // Update fields
    existCat.name = name || existCat.name;
    existCat.description = description || existCat.description;

    // Save updated data
    const savedCategory = await existCat.save();

    return res.status(200).json({
      success: true,
      message: "Category updated successfully.",
      data: savedCategory,
    });
  } catch (error) {
    console.error("UpdateCategory Error:", error);
    return ApiResponse.serverError(res);
  }
};
export const DeleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if ID is provided
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Category ID is required.",
      });
    }

    // Check if category exists
    const existCat = await CategoryModel.findById(id);
    if (!existCat) {
      return res.status(404).json({
        success: false,
        message: "No category found with the provided ID.",
      });
    }

    await existCat.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Category deleted successfully.",
    });
  } catch (error) {
    console.error("DeleteCategory Error:", error);
    return ApiResponse.serverError(res);
  }
};
