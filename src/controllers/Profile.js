import { ApiResponse } from "../libs/apiResponse.js";

export const Profile = (req, res) => {
  res.status(200).json({
    success: true,
    message: "Profile fetched successfully.",
    data: req.user, // full account info already available
  });
};
export const UpdateProfile = async (req, res) => {
  try {
    const { email, name, _id } = req.body;
    if (!_id) ApiResponse.error(res, "User Id is Required.");

    const existUser = await UserModel.findById(_id);
    if (!existUser) ApiResponse.notFound(res, "User Not found.");
    existUser.name = name || existUser.name;
    existUser.email = email || existUser.email;
    await existUser.save();
    return ApiResponse.success(res, "User Updated Successfully.", existUser);
  } catch (error) {
    console.error("UpdateProfile Error:", error);
    return ApiResponse.serverError(res);
  }
};
