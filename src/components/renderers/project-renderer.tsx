import type { HotRendererProps } from '@handsontable/react-wrapper';
import styles from './project-renderer.module.scss';

export function ProjectRenderer({ value }: HotRendererProps) {
  return <span className={styles.projectTag}>{String(value ?? '')}</span>;
}
