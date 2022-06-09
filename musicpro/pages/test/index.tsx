import React from 'react';
import { Tabs, Tab } from '@paljs/ui/Tabs';
import { Card } from '@paljs/ui/Card';

function Icons() {
  return (
    <>
      <h3>Full Width</h3>
      <Card>
        <Tabs fullWidth>
          <Tab icon="home">
            <h1>Content 1</h1>
          </Tab>
          <Tab icon="star-outline">
            <h1>Content 2</h1>
          </Tab>
          <Tab icon="toggle-right-outline">
            <h1>Content 3</h1>
          </Tab>
        </Tabs>
      </Card>
    </>
  );
}

export default Icons;