import React from 'react';
import JobPipelinePage from '../JobPipelinePage/JobPipelinePage';

// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

const InfoPage = () => (
  <div>
    <p>
      Info Page
      </p>
      <JobPipelinePage />
      {}
  </div>
);


export default InfoPage;
