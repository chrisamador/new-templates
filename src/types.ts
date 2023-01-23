export type TemplateConfigType = {
  id: string;
  templateVariables: {
    name: string;
    variableTextInTheTemplate: string;
    helpMessage: string;
    default: string;
  }[];
  templateDefaults?: {
    fileLocation?: string;
  };
};

export type TemplateType = {
  config: TemplateConfigType;
  srcPath: string;
  filePaths: string[];
};
