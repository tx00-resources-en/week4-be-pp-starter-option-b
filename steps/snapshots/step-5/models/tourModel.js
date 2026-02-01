let tourArray = [];
let nextId = 1;

const getAll = () => {
  return tourArray;
};

const addOne = (name, info, image, price) => {
  if (!name || !info || !image || !price) {
    return false;
  }

  const newTour = {
    id: nextId++,
    name: name,
    info: info,
    image: image,
    price: price,
  };

  tourArray.push(newTour);
  return newTour;
};

const findById = (id) => {
  const tour = tourArray.find((t) => t.id === Number(id));
  return tour || false;
};

const updateOneById = (id, updatedData) => {
  const tour = findById(id);
  if (!tour) return false;

  if (updatedData.name) {
    tour.name = updatedData.name;
  }
  if (updatedData.info) {
    tour.info = updatedData.info;
  }
  if (updatedData.image) {
    tour.image = updatedData.image;
  }
  if (updatedData.price) {
    tour.price = updatedData.price;
  }

  return tour;
};

const deleteOneById = (id) => {
  const tour = findById(id);
  if (!tour) return false;

  const initialLength = tourArray.length;
  tourArray = tourArray.filter((t) => t.id !== Number(id));
  return tourArray.length < initialLength;
};

module.exports = {
  getAll,
  addOne,
  findById,
  updateOneById,
  deleteOneById,
};
