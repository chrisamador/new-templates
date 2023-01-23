# New Templates
Generate boilerplate code from project-based templates.

**Example use case**

Create consistent React Components based on your team's code patterns

---

## Install

Local

`yarn add file../new-templates`

NPM

Coming Soon

---

## Usage

1. Create templates in a root-level folder named `.templates`
2. Run `yarn new` and follow the prompts to generate code based on your project's templates

---

## How to create templates
Create a folder called `.templates` at the root level of your project. In that folder, you can create sub-folders for each template. A template requires two things to work correctly. First is the `config.json` file at the root of the template. Second is the `src` folder which contains all the files and folders that are part of the template. 

All the folders and files inside of `src` will be copied when the template is used. Note: Only the internal contents will be copied, not the `src` folder itself.

**Example folder structure**

```
.templates/
    context-template/
        config.json
        src/
            index.ts
            provider.tsx
            common/
                get-user.ts
package.json
```

**Example use of a template**

Selecting the above template and destination `src/app/contexts/user` will generate the following folder structure.

```
src/
    app/
        contexts/
            user/
                + index.ts
                + provider.tsx
                + common/
                    + get-user.ts
package.json
```

The `index.ts`, `provider.tsx`, `common/get-user.ts` files were copied.

---

## Config.json
The config.json file defines the template configuration used when `yarn new` is ran. 
```
// config.json
{
    id: string;
    templateVariables: {
        name: string;
        variableTextToInTemplate: string;
        helpMessage: string;
        default: string;
    }[];
    templateDefaults?: {
        fileLocation?: string;
    };
}
```
**id:** `string`

The name of the template that will be displayed for selection. Each name needs to be unique.

**templateVariables:** `array<templateVariable>`

A template variable is a string found in the template files that is replaced with another string. They are helpful in making your templates more dynamic. 

**templateVariables.name:** `string`

The display name of the Variable when `yarn new` is ran. 

**templateVariables.variableTextToInTemplate:** `string`

The string in the template is to be replaced with a new string.

**templateVariables.helpMessage:** `string`

Helpful message to explain what the variable is and how it should be replaced

**templateVariables.default:** `string`

The default value of the new string that will replace the variable string


**templateDefaults:** `object`

An optional object that contains defaults

**templateDefaults.fileLocation:** `string`

A default file path location that the template will be generated to. The file path needs to be relative to the package.json file in the project.


**Example Config.json**

```
{
  "id": "context",
  "templateVariables": [
    {
      "name": "Context Name",
      "variableTextInTheTemplate": "Base",
      "helpMessage": "What is the name of the Context?",
      "default": "Context"
    }
  ],
  "templateDefaults": {
    "fileLocation": "src/context/"
  }
}
```

**How the variable replacement works**

The `variableTextInTheTemplate` string is found in each file and replaced with the string entered when running `yarn new,` for example, take the following config.json and file.

```
// .template/example/config.json
{
  ...
  "templateVariables": [
    {
      ...
      "variableTextInTheTemplate": "Base",
                                    ~~~~ <--- string to be searched
      ...
    }
  ]
}
```
```
// .template/example/src/index.tsx
export function BaseComponent(){
                ~~~~ <--- string that will be replace
    return (
        <div/>
    )
}
```

When `yarn new` is ran and the string "Super" is used for the template variable, the following file is generated.

```
// src/new/path/index.tsx
export function SuperComponent(){
                ~~~~~ <--- string that was entered
    return (
        <div/>
    )
}
```