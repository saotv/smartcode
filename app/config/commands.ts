export interface Command {
  name: string;
  command: string;
  params?: Array<{
    name: string;
    type: string;
    required: boolean;
  }>;
}

export const commands: Command[] = [
  {
    name: "查看当前路径",
    command: "pwd",
  },
  {
    name: "备份脚本",
    command: "backupScript.sh --folder {{folderName}}",
    params: [
      {
        name: "folderName",
        type: "string",
        required: true,
      },
    ],
  },
];