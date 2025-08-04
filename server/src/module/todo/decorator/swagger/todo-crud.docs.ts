import { CrudDocsOptions } from "src/common/docs/crud-docs.decorator";
import {
  TodoCreateRequest,
  TodoResponse,
  TodoUpdateRequest,
} from "src/module/todo/dto";

const entityName = "할 일";

export const TodoDocs = {
  create: <CrudDocsOptions>{
    entityName: entityName,
    createDto: TodoCreateRequest,
    responseDto: TodoResponse,
  },

  findAll: <CrudDocsOptions>{
    entityName: entityName,
    responseDto: TodoResponse,
  },

  findOne: <CrudDocsOptions>{
    entityName: entityName,
    responseDto: TodoResponse,
  },

  update: <CrudDocsOptions>{
    entityName: entityName,
    updateDto: TodoUpdateRequest,
    responseDto: TodoResponse,
  },

  remove: <CrudDocsOptions>{
    entityName: entityName,
  },
};
