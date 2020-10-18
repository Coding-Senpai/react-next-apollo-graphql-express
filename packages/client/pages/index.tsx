import React from "react";
import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import { initializeApollo } from "../lib/apolloClient";
import { GetStaticProps } from "next";

const QUERY = gql`
  query GetHello {
    hello
  }
`;

const SSR = () => {
  const { data, loading, error, refetch } = useQuery(QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Hello from server side</h1>
      <pre>Data: {data.hello}</pre>
      <button onClick={() => refetch()}>Refetch</button>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: QUERY,
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
    revalidate: 1,
  };
};

export default SSR;
