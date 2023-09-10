import { pkgUp } from "pkg-up";
import glob from "glob";
import path from "path";
import { TemplateConfigType, TemplateType } from "./types.js";
import { fsEditor } from "./index.js";

export async function getTemplates() {
  const packageJsonPath = await pkgUp();
  const projectRoot = packageJsonPath.replace("/package.json", "");
  const templatesFolderPath = path.join(projectRoot, ".templates");

  const templateConfigs = glob.sync("**/config.json", {
    cwd: templatesFolderPath,
  });

  const templates: TemplateType[] = [];

  // Read each folder and create the template details
  templateConfigs.forEach((templateConfigPath) => {
    const templatePath = path.join(
      templatesFolderPath,
      // config path contains the config.json file
      templateConfigPath.replace("/config.json", "")
    );

    const completeTemplateConfigPath = path.join(
      templatesFolderPath,
      templateConfigPath
    );

    const configJSON = fsEditor.readJSON(
      completeTemplateConfigPath
    ) as TemplateConfigType;

    const srcPath = path.join(templatePath, "src");
    // Get files
    const filePaths = glob.sync("**/*.*", {
      cwd: srcPath,
    });

    // Add template details
    templates.push({
      config: configJSON,
      srcPath,
      filePaths,
    });
  });

  if (!templates.length) {
    throw new Error(
      "Please add templates in a .templates folder at the root of your project"
    );
  }

  return templates;
}
