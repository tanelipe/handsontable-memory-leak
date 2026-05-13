import type { HotRendererProps } from '@handsontable/react-wrapper';
import styles from './id-renderer.module.scss';

export function IdRenderer({ value }: HotRendererProps) {
  return <span className={styles.idPill}>{value}</span>;
}
