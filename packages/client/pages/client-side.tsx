import { gql, useQuery } from "@apollo/client";
import React from "react";
const QUERY = gql`
  query GetHello {
    hello
  }
`;

const NOSSR = () => {
  const { data, loading, error, refetch } = useQuery(QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Hello from client side</h1>
      <pre>Data: {data.hello}</pre>
      <button onClick={() => refetch()}>Refetch</button>
    </div>
  );
};

export default NOSSR;
