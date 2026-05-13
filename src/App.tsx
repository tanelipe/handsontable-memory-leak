import { useState } from 'react';
import { registerAllModules } from 'handsontable/registry';
import {
  HotColumn,
  HotTable,
} from '@handsontable/react-wrapper';
import 'handsontable/styles/handsontable.css';
import 'handsontable/styles/ht-theme-main.css';
import styles from './App.module.scss';
import { CityRenderer } from './components/renderers/city-renderer';
import { IdRenderer } from './components/renderers/id-renderer';
import { OwnerRenderer } from './components/renderers/owner-renderer';
import { ProjectRenderer } from './components/renderers/project-renderer';
import { ScoreRenderer } from './components/renderers/score-renderer';

registerAllModules();

type Tab = 'home' | 'about';

type TableRow = {
  id: number;
  owner: string;
  project: string;
  city: string;
  score: number;
};

const columnHeaders = ['ID', 'Owner', 'Project', 'City', 'Score'];

const createRows = (prefix: string): TableRow[] => {
  const owners = ['Ana', 'Bruno', 'Clara', 'Diego', 'Elisa'];
  const projects = ['Atlas', 'Beacon', 'Comet', 'Drift', 'Echo'];
  const cities = ['Lisbon', 'Porto', 'Madrid', 'Berlin', 'Paris'];

  return Array.from({ length: 400 }, (_, index) => {
    const id = index + 1;

    return {
      id,
      owner: `${prefix} ${owners[index % owners.length]}`,
      project: projects[index % projects.length],
      city: cities[index % cities.length],
      score: 70 + ((id * 7) % 31),
    };
  });
};

const tableData: Record<Tab, TableRow[]> = {
  home: createRows('Home'),
  about: createRows('About'),
};

const tabMeta: Record<Tab, { label: string; description: string }> = {
  home: {
    label: 'Home',
    description: 'Primary dataset with five editable columns.',
  },
  about: {
    label: 'About',
    description: 'Secondary dataset rendered in its own table instance.',
  },
};

const visibleRowCount = 10;
const rowHeight = 32;
const tableHeight = visibleRowCount * rowHeight + 40;

export function App() {
  const [currentView, setCurrentView] = useState<Tab>('home');
  const activeTab = tabMeta[currentView];

  return (
    <main className={styles.shell}>
      <header className={styles.hero}>
        <p className={styles.eyebrow}>Handsontable Example</p>
        <h1>Two tabs, one table per view</h1>
        <p className={styles.lede}>
          Switch between tabs to render a simple Handsontable grid with five columns.
        </p>
      </header>

      <div className={styles.tabs} role="tablist" aria-label="Dataset views">
        {(Object.keys(tabMeta) as Tab[]).map((tab) => {
          const isActive = tab === currentView;

          return (
            <button
              key={tab}
              type="button"
              role="tab"
              aria-selected={isActive}
              className={isActive ? styles.tabActive : styles.tab}
              onClick={() => setCurrentView(tab)}
            >
              {tabMeta[tab].label}
            </button>
          );
        })}
      </div>

      <section className={styles.panel} role="tabpanel" aria-label={activeTab.label}>
        <div className={styles.panelHeader}>
          <div>
            <h2>{activeTab.label} table</h2>
            <p>{activeTab.description}</p>
          </div>
        </div>

        <div className={styles.tableFrame}>
          <HotTable
            key={currentView}
            data={tableData[currentView]}
            colHeaders={columnHeaders}
            rowHeaders={true}
            width="100%"
            height={tableHeight}
            rowHeights={rowHeight}
            stretchH="all"
            autoWrapRow={true}
            autoWrapCol={true}
            autoColumnSize={false}
            autoRowSize={false}
            licenseKey="non-commercial-and-evaluation"
          >
            <HotColumn data="id" type="numeric" renderer={IdRenderer} />
            <HotColumn data="owner" renderer={OwnerRenderer} />
            <HotColumn data="project" renderer={ProjectRenderer} />
            <HotColumn data="city" renderer={CityRenderer} />
            <HotColumn data="score" type="numeric" renderer={ScoreRenderer} />
          </HotTable>
        </div>
      </section>
    </main>
  );
}

export default App;
