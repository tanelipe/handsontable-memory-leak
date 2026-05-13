import type { HotRendererProps } from '@handsontable/react-wrapper';
import styles from './owner-renderer.module.scss';

export function OwnerRenderer({ value, row }: HotRendererProps) {
  const initials = String(value ?? '')
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className={styles.ownerCell}>
      <span className={styles.ownerBadge}>{initials || row + 1}</span>
      <span>{String(value ?? '')}</span>
    </div>
  );
}
