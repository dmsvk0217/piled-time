import { CrudDocsOptions } from "src/common/docs/crud-docs.decorator";
import {
  PlanCreateRequest,
  PlanResponse,
  PlanUpdateRequest,
} from "src/module/plan/dto";

const entityName = "계획";

export const PlanDocs = {
  create: <CrudDocsOptions>{
    entityName: entityName,
    createDto: PlanCreateRequest,
    responseDto: PlanResponse,
  },

  findAll: <CrudDocsOptions>{
    entityName: entityName,
    responseDto: PlanResponse,
  },

  findOne: <CrudDocsOptions>{
    entityName: entityName,
    responseDto: PlanResponse,
  },

  update: <CrudDocsOptions>{
    entityName: entityName,
    updateDto: PlanUpdateRequest,
    responseDto: PlanResponse,
  },

  remove: <CrudDocsOptions>{
    entityName: entityName,
  },
};
