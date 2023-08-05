import * as fs from 'fs';
import * as path from 'path';


type Label = "story" | "style" | "test" | "component" | "index";

export function createFileInDirectory({ directoryPath, type, componentName }: any) {
    const labelToExtension: Record<Label, string> = {
        story: `${componentName}.stories.tsx`,
        style: `${componentName}.scss`,
        test: `${componentName}.test.tsx`,
        component: `${componentName}.tsx`,
        index: `index.ts`
    };
    const fileName = labelToExtension[type as Label]
    const filePath = path.join(directoryPath, fileName);

    const temp: any = {
        story: `import { Meta, StoryObj } from '@storybook/react';
import ${componentName}, { ${componentName}Props } from './${componentName}';

const meta: Meta<${componentName}Props> = {
  title: 'components/$componentType/${componentName}',
  component: ${componentName},
};
export default meta;

type Story = StoryObj<${componentName}Props>;

export const Default: Story = {
  args: {},
};
`,
        component: `import { FC } from "react"
import "./${componentName}.scss"

export interface ${componentName}Props {}

const ${componentName}: FC<${componentName}Props> = () => {
    return <></>
}
export default ${componentName}
        `,
        style: "",
        test: "",
        index: `export {default} from "./${componentName}"`,
    }
    fs.writeFile(filePath, temp[type], (err) => {
        if (err) {
            console.error('파일 생성 오류:', err);
            return;
        }
        console.log('파일 생성 완료:', filePath);
    });
}