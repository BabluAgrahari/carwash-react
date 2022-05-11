export function permission(roles) {
  const userData = JSON.parse(sessionStorage.getItem("userData"));
  let role = userData !== null ? userData.user.role : 0;

  if (roles.indexOf(role) >= 0) {
    return true;
  } else {
    return false;
  }
}
