import React, { useEffect } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import { Layout } from 'antd';

const { Header, Content, Footer, Sider } = Layout;

export default function AdminScreen() {
  const history = useHistory();

  const path = document.location.pathname;

  useEffect(() => {

  }, []);

  return (
    <div>
      <h1>Admin panel</h1>
        <Layout>
          <Sider>
            
          </Sider>
        </Layout>
        <p>
          <Switch>
            <Route exact path="/admin/rooms">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Quae aperiam optio illum omnis possimus eos molestiae.
              Laborum ratione minima magni omnis pariatur temporibus atque obcaecati nesciunt,
              illo culpa animi ullam?
            </Route>
          </Switch>
        </p>
    </div>
  );
}
