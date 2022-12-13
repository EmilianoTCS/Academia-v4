const SetItemLoginService = (user) => {
  window.localStorage.setItem("loggedUser", JSON.stringify(user));
  const loggedStatus = window.localStorage.getItem("loggedUser");
  if (loggedStatus) {
    const user = JSON.parse(loggedStatus);
    return user;
  }
};
// eslint-disable-next-line import/no-anonymous-default-export
export default { SetItemLoginService };
