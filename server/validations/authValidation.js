export const validateRegisterInput = (data) => {
  const errors = {};
  const { name, email, password } = data;

  if (!name || name.trim().length === 0) {
    errors.name = 'Full name is required';
  } else if (name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters long';
  }

  if (!email || email.trim().length === 0) {
    errors.email = 'Email address is required';
  } else {
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(email)) {
      errors.email = 'Please provide a valid email address';
    }
  }

  if (!password) {
    errors.password = 'Password is required';
  } else if (password.length < 6) {
    errors.password = 'Password must be at least 6 characters long';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

export const validateLoginInput = (data) => {
  const errors = {};
  const { email, password } = data;

  if (!email || email.trim().length === 0) {
    errors.email = 'Email address is required';
  }

  if (!password) {
    errors.password = 'Password is required';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
