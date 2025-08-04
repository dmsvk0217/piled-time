import { CrudDocsOptions } from "src/common/docs/crud-docs.decorator";
import {
  FeedbackCreateRequest,
  FeedbackResponse,
  FeedbackUpdateRequest,
} from "src/module/feedback/dto";

const entityName = "피드백";

export const FeedbackDocsOptions = {
  create: <CrudDocsOptions>{
    entityName: entityName,
    createDto: FeedbackCreateRequest,
    responseDto: FeedbackResponse,
  },

  findAll: <CrudDocsOptions>{
    entityName: entityName,
    responseDto: FeedbackResponse,
  },

  findOne: <CrudDocsOptions>{
    entityName: entityName,
    responseDto: FeedbackResponse,
  },

  update: <CrudDocsOptions>{
    entityName: entityName,
    updateDto: FeedbackUpdateRequest,
    responseDto: FeedbackResponse,
  },

  remove: <CrudDocsOptions>{
    entityName: entityName,
  },
};
