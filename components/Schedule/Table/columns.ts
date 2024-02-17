import { createColumnHelper } from '@tanstack/react-table'
import { TableCell } from './TableCell'
import { Student } from './types'
import { EditCell } from './EditCell'

const columnHelper = createColumnHelper<Student>()

export const columns = [
  columnHelper.accessor('studentNumber', {
    header: 'ID',
    cell: TableCell,
    meta: {
      type: 'number',
    },
  }),
  columnHelper.accessor('name', {
    header: 'Task name',
    cell: TableCell,
    meta: {
      type: 'text',
      required: true,
      pattern: '^[a-zA-Z ]+$',
    },
  }),
  columnHelper.accessor('dateOfBirth', {
    header: 'Deadline',
    cell: TableCell,
    meta: {
      type: 'date',
      required: true,
      validate: (value: string) => {
        const date = new Date(value);
        const today = new Date();
        return date <= today;
      },
      validationMessage: 'Date cannot be in the future',
    },
  }),
  columnHelper.display({
    id: 'edit',
    cell: EditCell,
  }),
]
