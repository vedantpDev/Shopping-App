const initialState = {
  name: "",
  email: "",
  contact: "",
  gender: "",
  token: "",
};

const userDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case "TOKEN": {
      return {
        ...state,
        name: action.payload.name,
        email: action.payload.email,
        contact: action.payload.contact,
        gender: action.payload.gender,
        token: action.payload.token,
      };
    }

    case "LOGOUT": {
      return {
        name: "",
        email: "",
        conatct: "",
        gender: "",
        token: "",
      };
    }

    default:
      return state;
  }
};

export default userDataReducer;
