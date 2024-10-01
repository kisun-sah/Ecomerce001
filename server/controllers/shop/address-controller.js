const Address = require("../../models/Address");

const addAddress = async (req, res) => {
  try {
    const { 
      userId, 
      fullName, 
      phone, 
      addressLine1, 
      addressLine2, 
      city, 
      state, 
      country = "India", // default to India if not provided
      pincode, 
      landmark, 
      addressType, 
      defaultAddress = false, // default to false if not provided
      notes 
    } = req.body;

    // Validation for required fields
    if (!userId || !fullName || !phone || !addressLine1 || !city || !state || !pincode || !addressType) {
      return res.status(400).json({
        success: false,
        message: "Invalid data provided! Some required fields are missing.",
      });
    }

    // If this address is set as default, make sure to update other addresses for the user
    if (defaultAddress) {
      await Address.updateMany({ userId }, { defaultAddress: false });
    }

    const newlyCreatedAddress = new Address({
      userId,
      fullName,
      phone,
      addressLine1,
      addressLine2,
      city,
      state,
      country,
      pincode,
      landmark,
      addressType,
      defaultAddress,
      notes
    });

    await newlyCreatedAddress.save();

    res.status(201).json({
      success: true,
      data: newlyCreatedAddress,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Server Error. Please try again later.",
    });
  }
};
const fetchAllAddress = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User id is required!",
      });
    }

    const addressList = await Address.find({ userId });

    res.status(200).json({
      success: true,
      data: addressList,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error",
    });
  }
};

const editAddress = async (req, res) => {
  try {
    const { userId, addressId } = req.params;
    const formData = req.body;

    if (!userId || !addressId) {
      return res.status(400).json({
        success: false,
        message: "User and address id is required!",
      });
    }

    const address = await Address.findOneAndUpdate(
      {
        _id: addressId,
        userId,
      },
      formData,
      { new: true }
    );

    if (!address) {
      return res.status(404).json({
        success: false,
        message: "Address not found",
      });
    }

    res.status(200).json({
      success: true,
      data: address,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error",
    });
  }
};

const deleteAddress = async (req, res) => {
  try {
    const { userId, addressId } = req.params;
    if (!userId || !addressId) {
      return res.status(400).json({
        success: false,
        message: "User and address id is required!",
      });
    }

    const address = await Address.findOneAndDelete({ _id: addressId, userId });

    if (!address) {
      return res.status(404).json({
        success: false,
        message: "Address not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Address deleted successfully",
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error",
    });
  }
};

module.exports = { addAddress, editAddress, fetchAllAddress, deleteAddress };