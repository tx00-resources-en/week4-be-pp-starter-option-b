const Tour = require("../models/tourModel");

const getAllTours = (req, res) => {
  res.json(Tour.getAll());
};

const createTour = (req, res) => {
  const { name, info, image, price } = req.body;

  const newTour = Tour.addOne(name, info, image, price);
  if (!newTour) {
    return res.status(500).json({ message: "Fail to create tour" });
  }

  return res.status(201).json(newTour);
};

const getTourById = (req, res) => {
  const { tourId } = req.params;
  const tour = Tour.findById(tourId);

  if (!tour) {
    return res.status(404).json({ message: "Tour not found" });
  }

  res.json(tour);
};

const updateTour = (req, res) => {
  const { tourId } = req.params;
  const updatedTour = Tour.updateOneById(tourId, req.body);

  if (!updatedTour) {
    return res.status(404).json({ message: "Tour not found" });
  }

  res.json(updatedTour);
};

const deleteTour = (req, res) => {
  const { tourId } = req.params;
  const isDeleted = Tour.deleteOneById(tourId);

  if (!isDeleted) {
    return res.status(404).json({ message: "Tour not found" });
  }

  return res.status(204).send();
};

module.exports = {
  getAllTours,
  getTourById,
  createTour,
  updateTour,
  deleteTour,
};
