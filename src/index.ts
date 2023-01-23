import { create } from "mem-fs";
import editor from "mem-fs-editor";
import path from "path";

import { program } from "./cli.js";
import { askQuestions } from "./prompt.js";
import { getTemplates } from "./getTemplates.js";

// Required to add to file so the cli.js is not Tree shaked 
program.version;

// Config the mem-fs
const store = create();
export const fsEditor = editor.create(store);

async function run() {
  // Read templates
  const templates = await getTemplates();

  // Ask which template and variables to use
  const responses = await askQuestions(templates);
  const { setVariables, selectedTemplate, locationFilePath } = responses;

  // Process each file of the template
  selectedTemplate.filePaths.forEach((filePath) => {
    const completeFilePath = path.join(selectedTemplate.srcPath, filePath);
    // Read the file
    let fileStr = fsEditor.read(completeFilePath);
    // Replace all the variables
    selectedTemplate.config.templateVariables.forEach((variable) => {
      const { variableTextInTheTemplate } = variable;
      const replaceWith = setVariables[variable.name] as string | undefined;
      if (!replaceWith) throw new Error("No replaceWith for " + variable.name);

      const reg = new RegExp(variableTextInTheTemplate, "g");
      fileStr = fileStr.replace(reg, replaceWith);
    });

    const newLocation = path.join(locationFilePath, filePath);
    // Save new file
    fsEditor.write(newLocation, fileStr);
  });

  // Commit file changes
  fsEditor.commit(() => {});
}

run();
