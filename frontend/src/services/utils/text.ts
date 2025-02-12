import { subTaskProps } from '../../components/kanban/kanban';

export const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const convertSubtaskPhasetoCSS = (phase: subTaskProps['phase']) => {
  switch (phase) {
    case 'to do':
      return 'to-do';
    case 'in progress':
      return 'in-progress';
    case 'done':
      return 'done';
    default:
      return 'to-do';
  }
};
