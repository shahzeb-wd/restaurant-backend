// utils/ApiResponse.js

export const ApiResponse = {
  success: (res, message = "Success", data = {}, status = 200) => {
    return res.status(status).json({
      success: true,
      message,
      data,
    });
  },

  error: (res, message = "Something went wrong", status = 400) => {
    return res.status(status).json({
      success: false,
      message,
    });
  },

  notFound: (res, message = "Data not found") => {
    return res.status(404).json({
      success: false,
      message,
    });
  },

  unauthorized: (res, message = "Unauthorized") => {
    return res.status(401).json({
      success: false,
      message,
    });
  },

  serverError: (res, message = "Internal server error") => {
    return res.status(500).json({
      success: false,
      message,
    });
  },
};
