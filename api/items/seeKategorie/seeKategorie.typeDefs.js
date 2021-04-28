import { gql } from "apollo-server-core";

export default gql`
  type Query {
    seeKategorie(kategorieId: String!): Kategorie
  }
`