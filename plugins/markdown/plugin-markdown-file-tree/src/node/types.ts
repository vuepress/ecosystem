export interface FileTreeNode extends FileTreeNodeProps {
  level: number
  children: FileTreeNode[]
}

export interface FileTreeNodeProps {
  filename: string
  comment?: string
  focus?: boolean
  expanded?: boolean
  type: 'file' | 'folder'
  diff?: 'add' | 'remove'
  level?: number
}
