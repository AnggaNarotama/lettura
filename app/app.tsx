import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import * as routesConfig from './infra/constants/routes';
import { SettingModule } from './view/modules/Settings';
import { ArticleModule } from './view/modules/Articles';
import { ChannelList } from './view/components/ChannelList';
import styles from './app.module.css';

function App() {
  return (
    <div className={styles.container}>
      <Router>
        <div className={styles.channel}>
          <ChannelList />
        </div>

        <div className={styles.main}>
          <div className={styles.mainInner}>
            <Switch>
              <Route exact path={routesConfig.SETTINGS}>
                <SettingModule />
              </Route>
              <Route exact path="/all">
                <ArticleModule />
              </Route>
              <Route exact path="/channels/:name">
                <ArticleModule />
              </Route>
            </Switch>
          </div>
        </div>
      </Router>
    </div>
  );
}

export default App;
