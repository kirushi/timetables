import { ACCESS_RIGHTS } from '../configuration';
import { MANAGE, CREATE, READ, UPDATE, DELETE } from '../configuration';

export function checkUserTypeForAll(sessions, currentUser) {
  return sessions.filter(session => {
    return checkUserType(session, currentUser);
  })
}

export function filterTrainers(trainers, user) {
  if (user.admin) return trainers;
  return trainers.filter(x => x.id === user.type_id);
}

export function checkUserType(session, currentUser) {
  if (!session.is_private) { return true };
  if (currentUser.admin) { return true };
  if (currentUser.type === "Member") {
    return session.members.some(x => x.id === currentUser.type_id);
  }
  if (currentUser.type === "Trainer") {
    return session.trainers.some(x => x.id === currentUser.type_id);
  }
  return true;
}

export function hasAccess(action, resource, userRole, isAdmin) {
  if (isAdmin) {
    userRole = "Admin";
  }
  let roleRules = ACCESS_RIGHTS[userRole];
  let roleHasAccess = false;
  if (roleRules) {
    let resourceRulesForRole = roleRules[resource];
    if (resourceRulesForRole) {
      if (resourceRulesForRole.some(x => (x === MANAGE))) {
        roleHasAccess = true;
      } else if (resourceRulesForRole.some(x => x === action)) {
        roleHasAccess = true;
      } else {
        roleHasAccess = false;
      }
    }
  }
  return roleHasAccess;
}
