import prompts from "prompts";
import { TemplateType } from "./types.js";

export async function askQuestions(templates: TemplateType[]) {
  const templateSelected = await prompts([
    {
      type: "select",
      name: "templateId",
      message: "Pick a Template. These are generated from .templates",
      choices: templates.map((t) => ({
        title: t.config.id,
        value: t.config.id,
      })),
    },
  ]);

  const templateId = templateSelected.templateId as string;

  const selectedTemplate = templates.find((t) => t.config.id === templateId);

  if (!selectedTemplate) throw new Error("Template Id not found");

  const { templateVariables, templateDefaults } = selectedTemplate.config;

  const locationPath = await prompts({
    type: "text",
    name: "locationFilePath",
    message: "Where will the template be generated",
    initial: templateDefaults.fileLocation,
  });

  const locationFilePath = locationPath.locationFilePath as string;

  const setVariables = await prompts(
    templateVariables.map((v) => ({
      type: "text",
      name: v.name,
      message: v.helpMessage,
      initial: v.default,
    }))
  );

  return { selectedTemplate, setVariables, locationFilePath };
}
