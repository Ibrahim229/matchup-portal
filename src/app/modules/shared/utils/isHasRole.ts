import { RoleType } from '../../core/enums/role.enum';

export function isHasRole(role: RoleType) {
  const currentRole = JSON.parse(
    localStorage.getItem('currentUser') as string
  ).role;
  return currentRole === role;
}
