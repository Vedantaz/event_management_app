import { SetMetadata } from "@nestjs/common";
import { ROLES } from "src/common/enums/enums";

export const ROLES_KEY = "roles";
export const Roles = (...roles: ROLES[]) => SetMetadata("roles", roles);
