import Listing from "../models/listingModel.js";
import { errorHandler } from "../utils/error.js";

export const getReviews = async (req, res, next) => {
  console.log("getReviews");
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return next(errorHandler(404, "Listing not found!"));
    }
    res.status(200).json(listing.reviews);
  } catch (error) {
    next(error);
  }
};
export const createReview = async (req, res, next) => {
  console.log("creteReviews", req.body, req.params);
  const { listingId } = req.body;
  const { review } = req.body;

  try {
    // Find the listing by ID
    const listing = await Listing.findById(listingId);

    // If listing is not found, return an error
    if (!listing) {
      return next(errorHandler(404, "Listing not found!"));
    }

    // Validate the review content
    if (typeof review !== "string" || review.trim() === "") {
      return next(errorHandler(400, "Invalid review!"));
    }

    // Add the new review to the listing's reviews array
    listing.reviews.push(review);

    // Save the updated listing
    await listing.save();

    // Respond with the updated reviews array
    res.status(201).json(listing.reviews);
  } catch (error) {
    // Handle any errors that occur during the process
    next(error);
  }
};
