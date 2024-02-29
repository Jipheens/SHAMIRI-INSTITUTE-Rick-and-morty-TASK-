'use client'

// import React from 'react';
// import { useRouter } from 'next/router';
// import ResidentDetails from './[residentId]';

// const ResidentPage = () => {
//   const router = typeof window !== 'undefined' ? useRouter() : null;
//   const residentId = router?.query.residentId || '';

//   console.log('Params Id: ', residentId);

//   return <ResidentDetails residentId={residentId as string} />;
// };

// export default ResidentPage;

//*******************************second implementation************************* */
import React from 'react';
import ResidentDetails from './[residentId]';
import { NextPageContext } from 'next';

interface ResidentPageProps {
  residentId: string;
}

class ResidentPage extends React.Component<ResidentPageProps> {
  static async getServerSideProps({ query }: NextPageContext) {
    const { residentId } = query;
console.log("log at our prop",residentId)
    return {
      residentId: typeof residentId === 'string' ? residentId : '',
    };
  }

  render() {
    const { residentId } = this.props;
    // console.log('Params Id: ', residentId);

    return <ResidentDetails residentId={residentId} />;
  }
}

export default ResidentPage;

//*****************************third implementation*************************** */


