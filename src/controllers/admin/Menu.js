import mongoose from "mongoose";
import { CategoryModel } from "../../models/category.js";
import { ApiResponse } from "../../libs/apiResponse.js";
import { MenuModel } from "../../models/menu.js";
import cloudinary from "../../libs/Cloudinary.js";

export const CreateMenu = async (req, res) => {
  try {
    const { name, price, categoryId, description, isAvailable } = req.body;

    if (!name || !price || !categoryId) {
      return res.status(400).json({
        success: false,
        message: "Name Price & CategoryID is required",
      });
    }
    const existMenu = await MenuModel.findOne({ name });
    if (existMenu) {
      return res.status(409).json({
        success: false,
        message: "A menu item with this name already exists.",
      });
    }
    let imageUrl = "";
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "restaurant_menus",
      });
      imageUrl = result.secure_url;
    }
    const newMenu = new MenuModel({
      name,
      description,
      price,
      image: imageUrl,
      categoryId,
      isAvailable,
    });

    const savedMenu = await newMenu.save();

    return res.status(201).json({
      success: true,
      message: "Menu created successfully",
      data: savedMenu,
    });
  } catch (error) {
    console.error(error);
    return ApiResponse.serverError(res);
  }
};
export const GetMenu = async (req, res) => {
  try {
    const menu = await MenuModel.find();

    if (menu.length == 0) {
      return res.status(404).json({
        success: false,
        message: "No Menu found",
      });
    }

    return res.status(201).json({
      success: true,
      message: "Menu Fetched successfully",
      data: menu,
    });
  } catch (error) {
    console.error(error);
    return ApiResponse.serverError(res);
  }
};
export const UpdateMenu = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, categoryId, description, isAvailable } = req.body;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Menu ID is required.",
      });
    }

    // ✅ Find existing menu
    const existingMenu = await MenuModel.findById(id);
    if (!existingMenu) {
      return res.status(404).json({
        success: false,
        message: "No Menu found with the provided ID.",
      });
    }

    // ✅ Handle image upload if new image provided
    let imageUrl = existingMenu.image;
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "restaurant_menus",
      });
      imageUrl = result.secure_url;
    }

    // ✅ Update fields
    existingMenu.name = name || existingMenu.name;
    existingMenu.description = description || existingMenu.description;
    existingMenu.price = price || existingMenu.price;
    existingMenu.categoryId = categoryId || existingMenu.categoryId;
    existingMenu.isAvailable =
      isAvailable !== undefined ? isAvailable : existingMenu.isAvailable;
    existingMenu.image = imageUrl;

    // ✅ Save updated record
    const updatedMenu = await existingMenu.save();

    return res.status(200).json({
      success: true,
      message: "Menu updated successfully.",
      data: updatedMenu,
    });
  } catch (error) {
    return ApiResponse.serverError(res);
  }
};
export const DeleteMenu = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if ID is provided
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Menu ID is required.",
      });
    }

    // Check if category exists
    const existCat = await MenuModel.findById(id);
    if (!existCat) {
      return res.status(404).json({
        success: false,
        message: "No Menu found with the provided ID.",
      });
    }

    await existCat.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Menu deleted successfully.",
    });
  } catch (error) {
    return ApiResponse.serverError(res);
  }
};
