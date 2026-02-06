import List from "./list";
import ScholarshipsClient from "./scholarships-client";

export default function ScholarshipsSection() {
  return (
    <ScholarshipsClient>
      <List />
    </ScholarshipsClient>
  );
}
