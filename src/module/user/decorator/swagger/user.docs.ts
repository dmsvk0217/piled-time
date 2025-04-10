import { CrudDocsOptions } from "src/common/docs/crud-docs.decorator";
import { UserCreateRequest, UserResponse, UserUpdateRequest } from "src/module/user/dto";

const entityName = "유저";

export const UserDocs = {
  create: <CrudDocsOptions>{
    entityName: entityName,
    createDto: UserCreateRequest,
    responseDto: UserResponse,
  },

  findAll: <CrudDocsOptions>{
    entityName: entityName,
    responseDto: UserResponse,
  },

  findOne: <CrudDocsOptions>{
    entityName: entityName,
    responseDto: UserResponse,
  },

  update: <CrudDocsOptions>{
    entityName: entityName,
    updateDto: UserUpdateRequest,
    responseDto: UserResponse,
  },

  remove: <CrudDocsOptions>{
    entityName: entityName,
  },
};
