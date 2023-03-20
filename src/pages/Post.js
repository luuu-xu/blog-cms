import { useParams } from "react-router-dom";
import useToken from "../components/useToken";

export default function Post() {
  const { token } = useToken();
  const { id } = useParams();

  return (
    <div>
      Post id is {id}.
      Post Page, your token is {token}.
    </div>
  );
} 