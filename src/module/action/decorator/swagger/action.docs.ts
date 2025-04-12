import { CrudDocsOptions } from "src/common/docs/crud-docs.decorator";
import { ActionCreateRequest, ActionResponse, ActionUpdateRequest } from "src/module/action/dto";

const entityName = "실행";

export const ActionDocs = {
  create: <CrudDocsOptions>{
    entityName: entityName,
    createDto: ActionCreateRequest,
    responseDto: ActionResponse,
  },

  findAll: <CrudDocsOptions>{
    entityName: entityName,
    responseDto: ActionResponse,
  },

  findOne: <CrudDocsOptions>{
    entityName: entityName,
    responseDto: ActionResponse,
  },

  update: <CrudDocsOptions>{
    entityName: entityName,
    updateDto: ActionUpdateRequest,
    responseDto: ActionResponse,
  },

  remove: <CrudDocsOptions>{
    entityName: entityName,
  },
};
