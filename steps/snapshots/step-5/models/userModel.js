let userArray = [];
let nextId = 1;

const getAll = () => {
  return userArray;
};

const addOne = (
  name,
  email,
  password,
  phone_number,
  gender,
  date_of_birth,
  membership_status
) => {
  if (
    !name ||
    !email ||
    !password ||
    !phone_number ||
    !gender ||
    !date_of_birth ||
    !membership_status
  ) {
    return false;
  }

  const newUser = {
    id: nextId++,
    name,
    email,
    password,
    phone_number,
    gender,
    date_of_birth,
    membership_status,
  };

  userArray.push(newUser);
  return newUser;
};

const findById = (id) => {
  const user = userArray.find((u) => u.id === Number(id));
  return user || false;
};

const updateOneById = (id, updatedData) => {
  const user = findById(id);
  if (!user) return false;

  if (updatedData.name) user.name = updatedData.name;
  if (updatedData.email) user.email = updatedData.email;
  if (updatedData.password) user.password = updatedData.password;
  if (updatedData.phone_number) user.phone_number = updatedData.phone_number;
  if (updatedData.gender) user.gender = updatedData.gender;
  if (updatedData.date_of_birth) user.date_of_birth = updatedData.date_of_birth;
  if (updatedData.membership_status)
    user.membership_status = updatedData.membership_status;

  return user;
};

const deleteOneById = (id) => {
  const existing = findById(id);
  if (!existing) return false;

  const initialLength = userArray.length;
  userArray = userArray.filter((u) => u.id !== Number(id));
  return userArray.length < initialLength;
};

module.exports = {
  getAll,
  addOne,
  findById,
  updateOneById,
  deleteOneById,
};
