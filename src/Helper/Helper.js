export function permission(roles) {
  const userData = JSON.parse(sessionStorage.getItem("userData"));
  let role = userData.user.role;

  if (roles.indexOf(role) >= 0) {
    return true;
  } else {
    return false;
  }
}
